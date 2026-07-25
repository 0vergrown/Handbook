<script>
	import { theme } from '$lib/theme.svelte.js';
	import Icon from './Icon.svelte';
</script>

<button
	class="raised"
	type="button"
	aria-pressed={theme.current === 'dark'}
	aria-label="Toggle dark mode"
	title="Toggle dark mode"
	onclick={() => theme.toggle()}
>
	{#if theme.current === 'dark'}
		<Icon name="sun" size={18} />
	{:else}
		<Icon name="moon" size={18} />
	{/if}
</button>
