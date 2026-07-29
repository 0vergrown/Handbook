/**
 * The Office Assistant roster. Sprite sheets and animation data live in
 * static/assistants/<id>.{png,json} and are fetched on demand — only the
 * assistant actually shown is ever downloaded.
 */
export const ASSISTANTS = [
	{ id: 'clippy', name: 'Clippit', blurb: 'The paperclip. You knew this one.' },
	{ id: 'links', name: 'Links', blurb: 'A cat with opinions about your JSON.' },
	{ id: 'rover', name: 'Rover', blurb: 'A dog who fetches things. Mostly tips.' },
	{ id: 'merlin', name: 'Merlin', blurb: 'A wizard. Naturally drawn to power types.' },
	{ id: 'genie', name: 'The Genie', blurb: 'Grants wishes. Only documentation-shaped ones.' },
	{ id: 'genius', name: 'The Genius', blurb: 'Chalkboard energy.' },
	{ id: 'peedy', name: 'Peedy', blurb: 'A parrot. Repeats things, which is on-brand for docs.' },
	{ id: 'f1', name: 'F1', blurb: 'A robot named after the help key.' },
	{ id: 'rocky', name: 'Rocky', blurb: 'Another dog. Sunglasses.' },
	{ id: 'bonzi', name: 'BonziBUDDY', blurb: 'A purple gorilla with a troubled past.' }
];

export const ASSISTANT_IDS = ASSISTANTS.map((a) => a.id);

export function assistantById(id) {
	return ASSISTANTS.find((a) => a.id === id) ?? ASSISTANTS[0];
}

/** Pick a random assistant so every one of them gets a turn. */
export function randomAssistantId(exclude) {
	const pool = ASSISTANT_IDS.filter((id) => id !== exclude);
	const from = pool.length ? pool : ASSISTANT_IDS;
	return from[Math.floor(Math.random() * from.length)];
}
