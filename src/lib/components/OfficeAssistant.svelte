<script>
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Animator, { WAITING } from '$lib/assistants/animator.js';
	import { ASSISTANTS, assistantById } from '$lib/assistants/roster.js';
	import { assistant } from '$lib/assistants/state.svelte.js';
	import { GREETINGS, NUDGES, pick, tipsFor } from '$lib/assistants/tips.js';

	const SPEAK_MS_PER_WORD = 190;
	const MIN_BALLOON_MS = 3800;

	let host = $state(null);
	let sprite = $state(null);
	let animator = null;

	let ready = $state(false);
	let visible = $state(false);
	let size = $state([124, 93]);
	let pos = $state({ x: 0, y: 0 });
	let balloon = $state('');
	let balloonWords = $state(0);
	let menuOpen = $state(false);
	let submenuOpen = $state(false);
	let lastLine = '';
	let greeted = false;

	let timers = [];
	let speakLoop = null;

	function later(fn, ms) {
		const t = setTimeout(fn, ms);
		timers.push(t);
		return t;
	}

	function clearTimers() {
		timers.forEach(clearTimeout);
		timers = [];
		clearInterval(speakLoop);
		speakLoop = null;
	}

	function rand(min, max) {
		return min + Math.random() * (max - min);
	}

	function play(...names) {
		if (!animator) return;
		const name = animator.firstAvailable(names);
		if (!name) return;
		animator.show(name, (_, state) => {
			if (state === WAITING) animator.exitAnimation();
		});
	}

	function idle() {
		if (!animator) return;
		const name = animator.randomIdle();
		if (name) play(name);
	}

	function say(text, animate = true) {
		if (!text) return;
		lastLine = text;
		balloon = text;
		balloonWords = 0;
		const words = text.split(/\s+/).length;

		clearInterval(speakLoop);
		speakLoop = setInterval(() => {
			balloonWords += 1;
			if (balloonWords >= words) {
				clearInterval(speakLoop);
				speakLoop = null;
			}
		}, SPEAK_MS_PER_WORD);

		if (animate) play('Explain', 'GestureRight', 'Congratulate', 'Wave', 'Greeting');

		const hold = Math.max(MIN_BALLOON_MS, words * SPEAK_MS_PER_WORD + 2600);
		later(() => {
			if (balloon === text) balloon = '';
		}, hold);
	}

	function currentTips() {
		const path = $page.url?.pathname ?? '';
		const title = $page.data?.doc?.title ?? $page.data?.title ?? '';
		return tipsFor(path, title);
	}

	function speakTip() {
		say(pick(currentTips(), lastLine));
	}

	function scheduleNextTip() {
		later(() => {
			if (!visible || menuOpen) {
				scheduleNextTip();
				return;
			}
			speakTip();
			scheduleNextTip();
		}, rand(55_000, 110_000));
	}

	function scheduleIdle() {
		later(() => {
			if (visible && !balloon) idle();
			scheduleIdle();
		}, rand(9_000, 18_000));
	}

	function defaultPosition(w, h) {
		return {
			x: Math.max(12, window.innerWidth - w - 40),
			y: Math.max(12, window.innerHeight - h - 40)
		};
	}

	async function load(id) {
		teardown();
		let data;
		try {
			const res = await fetch(`${base}/assistants/${id}.json`);
			if (!res.ok) return;
			data = await res.json();
		} catch {
			return;
		}
		if (!sprite) return;

		sprite.innerHTML = '';
		animator = new Animator(sprite, `${base}/assistants/${id}.png`, data);
		size = animator.size;
		pos = defaultPosition(size[0], size[1]);
		ready = true;

		// Turn up out of nowhere, the way they used to.
		later(() => {
			visible = true;
			play('Show', 'Greeting', 'Wave', 'RestPose');
			later(() => {
				say(greeted ? pick(currentTips(), lastLine) : pick(GREETINGS, lastLine), false);
				greeted = true;
			}, 1400);
			scheduleIdle();
			scheduleNextTip();
		}, rand(6_000, 14_000));
	}

	function teardown() {
		clearTimers();
		animator?.dispose();
		animator = null;
		ready = false;
		visible = false;
		balloon = '';
		menuOpen = false;
		submenuOpen = false;
	}

	function hide() {
		play('Hide', 'GoodBye');
		balloon = '';
		menuOpen = false;
		later(() => assistant.setEnabled(false), 700);
	}

	function onSpriteClick() {
		if (menuOpen) {
			menuOpen = false;
			return;
		}
		if (balloon) {
			say(pick(NUDGES, lastLine));
		} else {
			speakTip();
		}
	}

	function onContextMenu(event) {
		event.preventDefault();
		menuOpen = !menuOpen;
		submenuOpen = false;
	}

	// --- dragging -----------------------------------------------------------
	let drag = null;

	function onPointerDown(event) {
		if (event.button !== 0) return;
		drag = { dx: event.clientX - pos.x, dy: event.clientY - pos.y, moved: false };
		host?.setPointerCapture?.(event.pointerId);
	}

	function onPointerMove(event) {
		if (!drag) return;
		const x = event.clientX - drag.dx;
		const y = event.clientY - drag.dy;
		if (Math.abs(x - pos.x) > 2 || Math.abs(y - pos.y) > 2) drag.moved = true;
		pos = {
			x: Math.min(Math.max(0, x), window.innerWidth - size[0]),
			y: Math.min(Math.max(0, y), window.innerHeight - size[1])
		};
	}

	function onPointerUp(event) {
		const moved = drag?.moved;
		drag = null;
		host?.releasePointerCapture?.(event.pointerId);
		if (!moved) onSpriteClick();
	}

	// --- lifecycle ----------------------------------------------------------
	$effect(() => {
		const id = assistant.id;
		const on = assistant.enabled;
		if (!browser) return;
		if (!on) {
			teardown();
			return;
		}
		if (!sprite) return;
		load(id);
		return teardown;
	});

	// A fresh page is a fresh excuse to say something.
	$effect(() => {
		const path = $page.url?.pathname;
		if (!browser || !visible || !path) return;
		later(() => {
			if (visible && !balloon && Math.random() < 0.55) speakTip();
		}, rand(4_000, 9_000));
	});

	const balloonText = $derived.by(() => {
		if (!balloon) return '';
		const words = balloon.split(/\s+/);
		return words.slice(0, Math.max(1, balloonWords)).join(' ');
	});

	const current = $derived(assistantById(assistant.id));
</script>

<svelte:window
	onresize={() => {
		if (ready) pos = defaultPosition(size[0], size[1]);
	}}
/>

{#if browser && assistant.enabled}
	<div class="assistant-layer" class:shown={visible} aria-hidden="true">
		{#if balloonText}
			<div class="balloon" style="left:{pos.x + size[0] / 2}px; top:{pos.y}px;">
				<p>{balloonText}</p>
				<span class="tail"></span>
			</div>
		{/if}

		<div
			class="agent"
			role="presentation"
			bind:this={host}
			style="left:{pos.x}px; top:{pos.y}px; width:{size[0]}px; height:{size[1]}px;"
			onpointerdown={onPointerDown}
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			oncontextmenu={onContextMenu}
			title="{current.name} — click for a tip, right-click for options"
		>
			<div class="sprite" bind:this={sprite}></div>
		</div>

		{#if menuOpen}
			<div class="menu" style="left:{pos.x + size[0] - 8}px; top:{pos.y + size[1] - 8}px;">
				<button
					type="button"
					class="item has-sub"
					onclick={() => (submenuOpen = !submenuOpen)}
				>
					Choose Assistant… <span class="arrow">▸</span>
				</button>
				{#if submenuOpen}
					<div class="submenu">
						<button
							type="button"
							class="item"
							class:checked={!assistant.pinned}
							onclick={() => {
								assistant.choose(null);
								menuOpen = false;
							}}
						>
							Surprise me each visit
						</button>
						<hr />
						{#each ASSISTANTS as a (a.id)}
							<button
								type="button"
								class="item"
								class:checked={assistant.pinned && assistant.id === a.id}
								onclick={() => {
									assistant.choose(a.id);
									menuOpen = false;
								}}
								title={a.blurb}
							>
								{a.name}
							</button>
						{/each}
					</div>
				{/if}
				<button
					type="button"
					class="item"
					onclick={() => {
						menuOpen = false;
						speakTip();
					}}
				>
					Tell me something
				</button>
				<hr />
				<button type="button" class="item" onclick={hide}>Hide</button>
			</div>
		{/if}
	</div>
{/if}

<style>
	.assistant-layer {
		position: fixed;
		inset: 0;
		z-index: 400;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.35s ease;
	}
	.assistant-layer.shown {
		opacity: 1;
	}
	.assistant-layer:not(.shown) {
		visibility: hidden;
	}

	.agent {
		position: fixed;
		pointer-events: auto;
		cursor: grab;
		touch-action: none;
		filter: drop-shadow(0 6px 10px rgb(0 0 0 / 0.28));
	}
	.agent:active {
		cursor: grabbing;
	}

	.sprite {
		image-rendering: auto;
	}

	.balloon {
		position: fixed;
		transform: translate(-50%, -100%) translateY(-18px);
		max-width: 260px;
		min-width: 150px;
		padding: 9px 11px;
		background: #ffffcc;
		color: #000;
		border: 1px solid #000;
		border-radius: 5px;
		box-shadow: 2px 3px 0 rgb(0 0 0 / 0.2);
		font-family: 'Microsoft Sans Serif', 'Segoe UI', Tahoma, sans-serif;
		font-size: 0.82rem;
		line-height: 1.35;
		pointer-events: none;
	}
	.balloon p {
		margin: 0;
		white-space: pre-wrap;
		overflow-wrap: break-word;
	}
	.balloon .tail {
		position: absolute;
		left: 50%;
		bottom: -11px;
		margin-left: -8px;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 11px solid #ffffcc;
		filter: drop-shadow(0 1px 0 #000);
	}

	.menu {
		position: fixed;
		pointer-events: auto;
		min-width: 190px;
		padding: 2px;
		background: #f0f0f0;
		color: #000;
		border: 1px solid #808080;
		box-shadow: 2px 2px 0 rgb(0 0 0 / 0.25);
		font-family: 'Microsoft Sans Serif', 'Segoe UI', Tahoma, sans-serif;
		font-size: 0.78rem;
	}
	.menu hr {
		margin: 3px 1px;
		border: 0;
		border-top: 1px solid #c0c0c0;
	}
	.item {
		display: block;
		width: 100%;
		padding: 4px 10px 4px 22px;
		border: 0;
		background: none;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
		position: relative;
	}
	.item:hover {
		background: #0a246a;
		color: #fff;
	}
	.item.checked::before {
		content: '✔';
		position: absolute;
		left: 7px;
	}
	.item .arrow {
		float: right;
	}
	.submenu {
		margin: 2px 0 2px 8px;
		border-left: 1px solid #c0c0c0;
		max-height: 15rem;
		overflow-y: auto;
	}

	@media (max-width: 720px) {
		.assistant-layer {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.assistant-layer {
			transition: none;
		}
	}
</style>
