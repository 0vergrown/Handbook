<script>
	// A skill-tree-style diagram of how the mods stack up:
	// Apoli (the engine) is the root; Origins and other addons branch off it;
	// your own content grows from there. Nods to Apoli's built-in skill trees.
	import Icon from '$lib/components/Icon.svelte';

	// nodes positioned in a 0–100 coordinate space (matches the SVG viewBox)
	const nodes = [
		{ id: 'apoli', x: 50, y: 12, kind: 'root', title: 'Apoli', sub: 'The engine — powers, actions, conditions', icon: 'zap' },
		{ id: 'origins', x: 20, y: 50, kind: 'addon', title: 'Origins', sub: 'Addon · choose an origin', icon: 'book' },
		{ id: 'youraddon', x: 50, y: 50, kind: 'addon', title: 'Your addon', sub: 'New types in Java', icon: 'zap' },
		{ id: 'more', x: 80, y: 50, kind: 'addon', title: 'More addons', sub: 'Anything on the engine', icon: 'book' },
		{ id: 'content', x: 20, y: 88, kind: 'leaf', title: 'Your data packs', sub: 'Origins & powers you make', icon: 'book' }
	];

	// connectors: [from, to] by node id
	const links = [
		['apoli', 'origins'],
		['apoli', 'youraddon'],
		['apoli', 'more'],
		['origins', 'content']
	];
	const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
</script>

<div class="tree" role="img" aria-label="Apoli is the engine; Origins and other addons build on it; your data packs build on those.">
	<svg class="wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
		{#each links as [from, to]}
			<line
				x1={byId[from].x}
				y1={byId[from].y}
				x2={byId[to].x}
				y2={byId[to].y}
				vector-effect="non-scaling-stroke"
			/>
		{/each}
	</svg>

	{#each nodes as n}
		<div
			class="node {n.kind}"
			style="left:{n.x}%; top:{n.y}%"
			data-id={n.id}
		>
			<span class="dot"><Icon name={n.icon} size={16} /></span>
			<span class="label">
				<strong>{n.title}</strong>
				<small>{n.sub}</small>
			</span>
		</div>
	{/each}
</div>

<!-- stacked fallback for narrow screens -->
<ol class="tree-fallback">
	<li class="root"><strong>Apoli</strong> — the engine: powers, actions, conditions.</li>
	<li class="addon"><strong>Origins</strong> &amp; other addons — build on Apoli.</li>
	<li class="leaf"><strong>Your data packs</strong> — build on those.</li>
</ol>

<style>
	.tree {
		position: relative;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		aspect-ratio: 3 / 2;
	}

	.wires {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.wires line {
		stroke: var(--sk-border);
		stroke-width: 2;
	}

	.node {
		position: absolute;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		gap: 0.9rem;
		padding: 0.9rem 1.4rem 0.9rem 0.9rem;
		background: var(--sk-bg-1);
		border: 1px solid var(--sk-border);
		border-radius: 100px;
		white-space: nowrap;
		box-shadow: var(--sk-shadow);
	}
	.node .dot {
		display: grid;
		place-content: center;
		width: 3.2rem;
		height: 3.2rem;
		border-radius: 50%;
		background: var(--sk-bg-4);
		color: var(--sk-fg-3);
		flex-shrink: 0;
	}
	.label {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
	}
	.label strong {
		font-family: var(--sk-font-family-heading);
		font-weight: 500;
		font-size: 1.7rem;
		color: var(--sk-fg-1);
	}
	.label small {
		font: var(--sk-font-ui-small);
		color: var(--sk-fg-4);
	}

	/* the root: Apoli, highlighted like an unlocked skill node */
	.node.root {
		border-color: var(--sk-fg-accent);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--sk-fg-accent) 18%, transparent),
			var(--sk-shadow);
	}
	.node.root .dot {
		background: var(--sk-fg-accent);
		color: white;
	}
	.node.root .label strong {
		font-size: 2rem;
	}

	.node.addon[data-id='origins'] .dot {
		background: hsl(204, 70%, 46%);
		color: white;
	}

	/* the leaf: yours to build — dashed, like a locked node */
	.node.leaf {
		border-style: dashed;
		background: var(--sk-bg-2);
	}

	.tree-fallback {
		display: none;
	}

	/* Narrow screens: the diagram gets cramped, so show a clean stack instead. */
	@media (max-width: 640px) {
		.tree {
			display: none;
		}
		.tree-fallback {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			max-width: 40rem;
			margin: 0 auto;
			list-style: none;
			counter-reset: step;
		}
		.tree-fallback li {
			position: relative;
			padding: 1.4rem 1.6rem;
			border: 1px solid var(--sk-border);
			border-radius: var(--sk-border-radius);
			background: var(--sk-bg-2);
			font-size: 1.6rem;
			color: var(--sk-fg-2);
		}
		.tree-fallback li strong {
			color: var(--sk-fg-1);
			font-weight: 600;
		}
		.tree-fallback li.root {
			border-color: var(--sk-fg-accent);
		}
		.tree-fallback li.leaf {
			border-style: dashed;
		}
	}
</style>
