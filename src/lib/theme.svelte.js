import { browser } from '$app/environment';

/**
 * Global light/dark theme. The actual <html> class is set before first paint by
 * the inline script in app.html; this store keeps the reactive UI (toggle icon)
 * in sync and persists the user's choice.
 */
function createTheme() {
	let current = $state('light');

	if (browser) {
		const stored = localStorage.getItem('handbook:theme');
		if (stored === 'dark' || stored === 'light') {
			current = stored;
		} else {
			current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
		}
	}

	function apply(value) {
		current = value;
		if (browser) {
			localStorage.setItem('handbook:theme', value);
			document.documentElement.classList.remove('light', 'dark');
			document.documentElement.classList.add(value);
		}
	}

	return {
		get current() {
			return current;
		},
		set current(value) {
			apply(value);
		},
		toggle() {
			apply(current === 'dark' ? 'light' : 'dark');
		}
	};
}

export const theme = createTheme();
