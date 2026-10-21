<script>
	import '$lib/styles/index.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';

	let { children } = $props();

	function onclick(event) {
		const button = event.target instanceof Element ? event.target.closest('.copy-button') : null;
		if (!button) return;
		const code = button.closest('.code-block')?.querySelector('pre code');
		if (!code || !navigator.clipboard) return;
		navigator.clipboard.writeText(code.textContent ?? '').then(() => {
			button.classList.add('copy-button--copied');
			button.setAttribute('aria-label', 'Copied');
			setTimeout(() => {
				button.classList.remove('copy-button--copied');
				button.setAttribute('aria-label', 'Copy code to clipboard');
			}, 1000);
		});
	}
</script>

<svelte:document {onclick} />

<a class="skip-to-content" href="#main">Skip to main content</a>
<Navbar />
<div class="main-wrapper">
	{@render children()}
</div>
<Footer />
<SearchModal />
