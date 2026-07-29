import { browser } from '$app/environment';
import { ASSISTANT_IDS, randomAssistantId } from './roster.js';

const KEY_ENABLED = 'handbook:assistant:enabled';
const KEY_ID = 'handbook:assistant:id';
const KEY_PINNED = 'handbook:assistant:pinned';

/**
 * Which Office Assistant is on duty, and whether they are on duty at all.
 *
 * By default nobody is pinned, so a random assistant turns up each session —
 * everyone gets a turn in the spotlight. Pinning one keeps it across visits.
 */
function createAssistantState() {
	let enabled = $state(true);
	let pinned = $state(false);
	let id = $state(ASSISTANT_IDS[0]);

	if (browser) {
		enabled = localStorage.getItem(KEY_ENABLED) !== 'false';
		pinned = localStorage.getItem(KEY_PINNED) === 'true';
		const stored = localStorage.getItem(KEY_ID);
		if (pinned && stored && ASSISTANT_IDS.includes(stored)) {
			id = stored;
		} else {
			id = randomAssistantId(stored ?? undefined);
			localStorage.setItem(KEY_ID, id);
		}
	}

	return {
		get enabled() {
			return enabled;
		},
		get pinned() {
			return pinned;
		},
		get id() {
			return id;
		},
		setEnabled(value) {
			enabled = value;
			if (browser) localStorage.setItem(KEY_ENABLED, String(value));
		},
		/** Pin a specific assistant, or pass null to go back to random rotation. */
		choose(next) {
			if (next === null) {
				pinned = false;
				id = randomAssistantId(id);
			} else {
				pinned = true;
				id = next;
			}
			if (browser) {
				localStorage.setItem(KEY_PINNED, String(pinned));
				localStorage.setItem(KEY_ID, id);
			}
		},
		shuffle() {
			id = randomAssistantId(id);
			if (browser) localStorage.setItem(KEY_ID, id);
		}
	};
}

export const assistant = createAssistantState();
