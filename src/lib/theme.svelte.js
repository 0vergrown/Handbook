const KEY = 'handbook:theme';
const NEXT = { system: 'light', light: 'dark', dark: 'system' };
const LABELS = { system: 'system mode', light: 'light mode', dark: 'dark mode' };

class ThemeChoice {
	choice = $state('system');
	#media = null;

	get label() {
		return LABELS[this.choice];
	}

	connect() {
		const stored = document.documentElement.getAttribute('data-theme-choice');
		this.choice = stored in NEXT ? stored : 'system';
		if (this.#media) return;
		this.#media = window.matchMedia('(prefers-color-scheme: dark)');
		this.#media.addEventListener('change', () => this.#apply());
	}

	cycle() {
		this.choice = NEXT[this.choice];
		try {
			if (this.choice === 'system') localStorage.removeItem(KEY);
			else localStorage.setItem(KEY, this.choice);
		} catch {}
		this.#apply();
	}

	#apply() {
		const dark =
			this.choice === 'dark' ||
			(this.choice === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
		document.documentElement.setAttribute('data-theme-choice', this.choice);
	}
}

export const theme = new ThemeChoice();
