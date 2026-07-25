import { getTopicNav } from '$lib/content/index.js';
import { TOPICS } from '$lib/content/topics.js';

export function load({ params }) {
	const topic = params.path.split('/')[0];
	return {
		topic,
		topicTitle: TOPICS[topic]?.title ?? 'Docs',
		nav: getTopicNav(topic)
	};
}
