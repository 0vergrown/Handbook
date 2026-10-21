<script>
	let shown = $state(false);
	let last = 0;

	function onscroll() {
		const top = window.scrollY;
		shown = top >= 300 && top < last;
		last = top;
	}
</script>

<svelte:window {onscroll} />

<button
	type="button"
	aria-label="Scroll back to top"
	class={['clean-btn', 'back-to-top', shown && 'back-to-top--show']}
	onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
></button>
