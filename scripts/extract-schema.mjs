// Schema extractor for Apoli / Origins — a docs maintenance aid.
//
// Parses the mod source's registration files + config codecs and emits a
// manifest of every registered power / action / condition and its fields
// (name, type, default). Use it to check the Handbook's fields tables against
// the current source, or to find newly-added types that need a page.
//
//   node scripts/extract-schema.mjs
//     -> scripts/schema.json  (structured)
//     -> scripts/schema.txt   (readable, grouped by category)
//
// Adjust ROOTS below if the mod repos move.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOTS = {
	apoli: '/home/default/Documents/GitHub/Apoli/Apoli-Fabric-1.21.1/src/main/java/dev/overgrown/apoli',
	origins: '/home/default/Documents/GitHub/Origins/Origins-Fabric-1.21.1/src/main/java/dev/overgrown/origins'
};

// index every .java file by class basename
function indexClasses(root) {
	const map = new Map();
	if (!fs.existsSync(root)) return map;
	const walk = (dir) => {
		for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
			const p = path.join(dir, e.name);
			if (e.isDirectory()) walk(p);
			else if (e.name.endsWith('.java')) map.set(e.name.replace(/\.java$/, ''), p);
		}
	};
	walk(root);
	return map;
}

// friendly type names from the codec expression preceding .fieldOf
const TYPE_MAP = [
	[/^Codec\.INT|IntProvider|intRange/, 'integer'],
	[/^Codec\.(DOUBLE|FLOAT)|doubleRange|floatRange/, 'number'],
	[/^Codec\.BOOL/, 'boolean'],
	[/^Codec\.STRING|ExtraCodecs\.NON_EMPTY_STRING/, 'string'],
	[/ResourceLocation\.CODEC|Identifier\.CODEC/, 'identifier'],
	[/TagKey|TagEntry/, 'tag'],
	[/BiEntityAction\.CODEC/, 'bientity action'],
	[/EntityAction\.CODEC/, 'entity action'],
	[/BlockAction\.CODEC/, 'block action'],
	[/ItemAction\.CODEC/, 'item action'],
	[/BiEntityCondition\.CODEC/, 'bientity condition'],
	[/EntityCondition\.CODEC/, 'entity condition'],
	[/BlockCondition\.CODEC/, 'block condition'],
	[/ItemCondition\.CODEC/, 'item condition'],
	[/DamageCondition\.CODEC/, 'damage condition'],
	[/FluidCondition\.CODEC/, 'fluid condition'],
	[/BiomeCondition\.CODEC/, 'biome condition'],
	[/AttributeModifier/, 'attribute modifier'],
	[/AttributedEntityAttributeModifier/, 'attribute modifier'],
	[/HudRender/, 'HUD render'],
	[/TextComponent\.CODEC|Component\.CODEC|ComponentSerialization/, 'text component'],
	[/Comparison\.CODEC/, 'comparison'],
	[/EffectSpec|MobEffectInstance|StatusEffectInstance/, 'status effect'],
	[/ItemStack|SerializableItemStack|ItemStackData/, 'item stack'],
	[/ParticleEffect|ParticleType|ParticleTypes/, 'particle'],
	[/SoundEvent/, 'sound'],
	[/Vec3|Vector|Space/, 'vector / space'],
	[/Shape\b/, 'shape'],
	[/EntityType/, 'entity type'],
	[/Holder|RegistryFixedCodec|RegistryEntry/, 'registry entry'],
	[/Expression|ExpressionCodec/, 'expression'],
	[/SkillInfo|SkillTree/, 'skill info']
];

function friendlyType(expr) {
	if (!expr) return '?';
	const listMatch = /(\w+)\.(LIST_OR_SINGLE|LIST_CODEC)/.exec(expr) || /Codec\.list|\.listOf\(\)/.exec(expr);
	let base = expr;
	for (const [re, name] of TYPE_MAP) if (re.test(expr)) { base = name; break; }
	if (base === expr) {
		// clean a raw expression to something readable
		base = expr.replace(/\.CODEC.*$/, '').replace(/^.*\b(\w+)$/, '$1');
	}
	if (listMatch) return `list of ${base}`;
	return base;
}

// balanced-arg parse of a .fieldOf(...) / .optionalFieldOf(...) call at index i
function readCall(src, openParen) {
	let depth = 0, i = openParen, inStr = null, args = [], cur = '';
	for (; i < src.length; i++) {
		const c = src[i];
		if (inStr) {
			cur += c;
			if (c === inStr && src[i - 1] !== '\\') inStr = null;
			continue;
		}
		if (c === '"' || c === "'") { inStr = c; cur += c; continue; }
		if (c === '(') { depth++; if (depth === 1) continue; }
		if (c === ')') { depth--; if (depth === 0) { args.push(cur.trim()); return { args, end: i }; } }
		if (c === ',' && depth === 1) { args.push(cur.trim()); cur = ''; continue; }
		cur += c;
	}
	return { args, end: i };
}

function extractFields(src) {
	const fields = [];
	const re = /\.(optionalFieldOf|fieldOf)\(/g;
	let m;
	while ((m = re.exec(src))) {
		const kind = m[1];
		const openParen = m.index + m[0].length - 1;
		const { args, end } = readCall(src, openParen);
		if (!args.length) continue;
		const nameRaw = args[0];
		const nm = /^["']([^"']+)["']$/.exec(nameRaw);
		if (!nm) continue; // dynamic field name, skip
		// codec expr: look back from m.index to a boundary
		const before = src.slice(Math.max(0, m.index - 120), m.index);
		const exprMatch = /([A-Za-z_][\w.]*(?:\([^()]*\))?(?:\.[A-Za-z_]\w*)*)\s*$/.exec(before);
		const expr = exprMatch ? exprMatch[1] : '';
		fields.push({
			name: nm[1],
			required: kind === 'fieldOf',
			default: kind === 'optionalFieldOf' && args[1] ? args[1].replace(/\s+/g, ' ') : undefined,
			type: friendlyType(expr),
			rawType: expr
		});
		re.lastIndex = end;
	}
	// de-dupe by name (codecs sometimes list a field twice via aliases)
	const seen = new Set();
	return fields.filter((f) => (seen.has(f.name) ? false : seen.add(f.name)));
}

// parse a registration file: returns [{id, cls, aliases[]}]
function parseRegistrations(file, callRe, dedupe = false) {
	const src = fs.readFileSync(file, 'utf8');
	// map ResourceLocation constants -> id string
	const constMap = new Map();
	for (const cm of src.matchAll(/(?:ResourceLocation|Identifier)\s+([A-Z_][A-Z0-9_]*)\s*=\s*\w+\.id\(\s*["']([^"']+)["']/g)) {
		constMap.set(cm[1], cm[2]);
	}
	const out = [];
	const byId = new Map();
	let m;
	while ((m = callRe.exec(src))) {
		const openParen = m.index + m[0].length - 1;
		const { args, end } = readCall(src, openParen);
		callRe.lastIndex = end;
		if (args.length < 2) continue;
		let id = null;
		const idm = /\bid\(\s*["']([^"']+)["']\s*\)/.exec(args[0]);
		if (idm) id = idm[1];
		else if (constMap.has(args[0].trim())) id = constMap.get(args[0].trim());
		if (!id) continue;
		const clsm = /new\s+([A-Za-z_]\w*)/.exec(args[1]);
		const aliases = [...(args[2] || '').matchAll(/addTypeAlias\([^)]*["']([^"']+)["']/g)].map((a) => a[1]);
		if (dedupe && byId.has(id)) {
			for (const a of aliases) if (!byId.get(id).aliases.includes(a)) byId.get(id).aliases.push(a);
			continue;
		}
		const rec = { id, cls: clsm ? clsm[1] : null, aliases };
		byId.set(id, rec);
		out.push(rec);
	}
	return out;
}

function build(root, categories) {
	const classes = indexClasses(root);
	const result = {};
	for (const [cat, spec] of Object.entries(categories)) {
		const file = path.join(root, spec.file);
		if (!fs.existsSync(file)) continue;
		const regs = parseRegistrations(file, new RegExp(spec.call, 'g'), spec.dedupe);
		result[cat] = regs.map((r) => {
			let fields = [];
			if (r.cls && classes.has(r.cls)) {
				try {
					fields = extractFields(fs.readFileSync(classes.get(r.cls), 'utf8'));
				} catch {}
			}
			return { ...r, fields };
		});
	}
	return result;
}

const apoli = build(ROOTS.apoli, {
	powers: { file: 'power/PowerTypes.java', call: 'PowerTypeRegistry\\.register\\(' },
	'entity actions': { file: 'action/builtin/entity/EntityActions.java', call: 'ActionTypes\\.ENTITY\\.register\\(' },
	'bientity actions': { file: 'action/builtin/bientity/BiEntityActions.java', call: 'ActionTypes\\.BI_ENTITY\\.register\\(' },
	'block actions': { file: 'action/builtin/block/BlockActions.java', call: 'ActionTypes\\.BLOCK\\.register\\(' },
	'item actions': { file: 'action/builtin/item/ItemActions.java', call: 'ActionTypes\\.ITEM\\.register\\(' },
	'meta actions': { file: 'action/builtin/meta/MetaActions.java', call: 'reg\\.register\\(', dedupe: true },
	'entity conditions': { file: 'condition/builtin/entity/EntityConditions.java', call: 'ConditionTypes\\.ENTITY\\.register\\(' },
	'bientity conditions': { file: 'condition/builtin/bientity/BiEntityConditions.java', call: 'ConditionTypes\\.BI_ENTITY\\.register\\(' },
	'block conditions': { file: 'condition/builtin/block/BlockConditions.java', call: 'ConditionTypes\\.BLOCK\\.register\\(' },
	'item conditions': { file: 'condition/builtin/item/ItemConditions.java', call: 'ConditionTypes\\.ITEM\\.register\\(' },
	'damage conditions': { file: 'condition/builtin/damage/DamageConditions.java', call: 'ConditionTypes\\.DAMAGE\\.register\\(' },
	'biome conditions': { file: 'condition/builtin/biome/BiomeConditions.java', call: 'ConditionTypes\\.BIOME\\.register\\(' },
	'fluid conditions': { file: 'condition/builtin/fluid/FluidConditions.java', call: 'ConditionTypes\\.FLUID\\.register\\(' },
	'meta conditions': { file: 'condition/builtin/meta/MetaConditions.java', call: 'reg\\.register\\(', dedupe: true }
});

const outDir = path.dirname(fileURLToPath(import.meta.url));
fs.writeFileSync(path.join(outDir, 'schema.json'), JSON.stringify({ apoli }, null, 2));

// readable summary
let out = '';
let totals = {};
for (const [cat, list] of Object.entries(apoli)) {
	totals[cat] = list.length;
	out += `\n\n### ${cat.toUpperCase()} (${list.length})\n`;
	for (const t of list) {
		const al = t.aliases.length ? `  [aliases: ${t.aliases.join(', ')}]` : '';
		out += `\n- apoli:${t.id}  (${t.cls})${al}\n`;
		if (!t.fields.length) { out += `    (no fields)\n`; continue; }
		for (const f of t.fields) {
			const def = f.required ? 'REQUIRED' : `default ${f.default ?? '?'}`;
			out += `    · ${f.name} : ${f.type} — ${def}\n`;
		}
	}
}
out = `TOTALS: ${JSON.stringify(totals)}\nGRAND TOTAL: ${Object.values(totals).reduce((a, b) => a + b, 0)}\n` + out;
fs.writeFileSync(path.join(outDir, 'schema.txt'), out);
console.log('TOTALS:', totals);
console.log('grand total:', Object.values(totals).reduce((a, b) => a + b, 0));
