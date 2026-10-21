const DATE = new Intl.DateTimeFormat('en-US', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC'
});

export function formatDate(value) {
	const date = new Date(`${value}T00:00:00Z`);
	return Number.isNaN(date.getTime()) ? value : DATE.format(date);
}

export function readingLabel(minutes) {
	return minutes === 1 ? 'One min read' : `${minutes} min read`;
}
