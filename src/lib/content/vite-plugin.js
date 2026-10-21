import fs from 'node:fs';
import path from 'node:path';
import { buildCatalog } from './catalog.js';

const ID = 'virtual:handbook/nav';
const RESOLVED = '\0' + ID;

function readMarkdown(root, dir, out) {
	if (!fs.existsSync(dir)) return out;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) readMarkdown(root, full, out);
		else if (entry.name.endsWith('.md')) {
			const key = '/' + path.relative(root, full).split(path.sep).join('/');
			out[key] = fs.readFileSync(full, 'utf8');
		}
	}
	return out;
}

export function handbookContent() {
	let root = process.cwd();
	return {
		name: 'handbook-content',
		configResolved(config) {
			root = config.root;
		},
		resolveId(id) {
			return id === ID ? RESOLVED : null;
		},
		load(id) {
			if (id !== RESOLVED) return null;
			const catalog = buildCatalog(readMarkdown(root, path.join(root, 'src/content/docs'), {}));
			const first = {};
			for (const topic of Object.keys(catalog.nav)) first[topic] = catalog.firstPage(topic);
			return `export default ${JSON.stringify({ topics: catalog.nav, first })};`;
		},
		configureServer(server) {
			const docs = path.join(root, 'src/content/docs');
			const refresh = (file) => {
				if (!file.startsWith(docs)) return;
				const module = server.moduleGraph.getModuleById(RESOLVED);
				if (module) server.moduleGraph.invalidateModule(module);
				server.ws.send({ type: 'full-reload' });
			};
			server.watcher.on('add', refresh);
			server.watcher.on('unlink', refresh);
			server.watcher.on('change', refresh);
		}
	};
}
