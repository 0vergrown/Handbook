<script>
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import TOCItems from './TOCItems.svelte';

	let { headings = [] } = $props();

	let active = $state('');

	const slugs = $derived(headings.flatMap((heading) => [heading.slug, ...heading.children.map((child) => child.slug)]));

	function update() {
		const anchors = slugs.map((slug) => document.getElementById(slug)).filter(Boolean);
		if (!anchors.length) {
			active = '';
			return;
		}
		const offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 3.75;
		const next = anchors.find((anchor) => anchor.getBoundingClientRect().top >= offset);
		let found;
		if (next) {
			const bounds = next.getBoundingClientRect();
			found =
				bounds.top > 0 && bounds.bottom < window.innerHeight / 2
					? next
					: anchors[anchors.indexOf(next) - 1];
		} else {
			found = anchors[anchors.length - 1];
		}
		active = found?.id ?? '';
	}

	onMount(update);
	afterNavigate(() => tick().then(update));
</script>

<svelte:window onscroll={update} onresize={update} />

<div class="table-of-contents-wrap thin-scrollbar">
	<TOCItems {headings} {active} className="table-of-contents table-of-contents__left-border" />
</div>
