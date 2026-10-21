import { base } from '$app/paths';

function prepare(blocks) {
	return blocks.map((block) => ({
		block,
		title: block.title.toLowerCase(),
		crumb: block.crumb.toLowerCase(),
		content: block.content.toLowerCase(),
		keywords: block.keywords.map((keyword) => keyword.toLowerCase()),
		heading: block.href.includes('#')
	}));
}

function startsWord(text, term) {
	let at = text.indexOf(term);
	while (at > 0) {
		if (!/[a-z0-9]/.test(text[at - 1])) return true;
		at = text.indexOf(term, at + 1);
	}
	return at === 0;
}

function score(entry, terms) {
	let total = entry.heading ? -3 : 0;
	let own = false;
	for (const term of terms) {
		let best;
		if (entry.title === term) best = 120;
		else if (entry.keywords.includes(term)) best = 110;
		else if (entry.title.startsWith(term)) best = 60;
		else if (entry.keywords.some((keyword) => keyword.startsWith(term))) best = 50;
		else if (startsWord(entry.title, term)) best = 45;
		else if (entry.title.includes(term)) best = 30;
		else if (entry.keywords.some((keyword) => keyword.includes(term))) best = 20;
		else if (entry.crumb.includes(term)) {
			total += 10;
			continue;
		} else if (entry.content.includes(term)) {
			total += 6;
			continue;
		} else return -1;
		own = true;
		total += best;
	}
	return entry.heading && !own ? -1 : total;
}

class Search {
	open = $state(false);
	index = $state.raw(null);
	failed = $state(false);
	#pending = null;

	load() {
		if (this.index) return Promise.resolve();
		if (this.#pending) return this.#pending;
		this.failed = false;
		this.#pending = fetch(`${base}/search.json`)
			.then((response) => {
				if (!response.ok) throw new Error(String(response.status));
				return response.json();
			})
			.then((blocks) => {
				this.index = prepare(blocks);
			})
			.catch(() => {
				this.failed = true;
			})
			.finally(() => {
				this.#pending = null;
			});
		return this.#pending;
	}

	query(text, limit = 20) {
		const terms = text.toLowerCase().trim().split(/\s+/).filter(Boolean);
		if (!terms.length || !this.index) return [];
		const scored = [];
		for (const entry of this.index) {
			const value = score(entry, terms);
			if (value > 0) scored.push({ block: entry.block, value });
		}
		scored.sort((a, b) => b.value - a.value);
		return scored.slice(0, limit).map((hit) => hit.block);
	}
}

export const search = new Search();
