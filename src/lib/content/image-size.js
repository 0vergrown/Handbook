function png(buffer) {
	if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return null;
	return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function gif(buffer) {
	if (buffer.length < 10 || buffer.toString('ascii', 0, 3) !== 'GIF') return null;
	return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
}

function jpeg(buffer) {
	if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
	let offset = 2;
	while (offset + 9 < buffer.length) {
		if (buffer[offset] !== 0xff) return null;
		const marker = buffer[offset + 1];
		const length = buffer.readUInt16BE(offset + 2);
		if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
			return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
		}
		offset += 2 + length;
	}
	return null;
}

function webp(buffer) {
	if (buffer.length < 30 || buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
		return null;
	}
	const chunk = buffer.toString('ascii', 12, 16);
	if (chunk === 'VP8X') {
		return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
	}
	if (chunk === 'VP8 ') {
		return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
	}
	if (chunk === 'VP8L') {
		const bits = buffer.readUInt32LE(21);
		return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
	}
	return null;
}

function svg(buffer) {
	const text = buffer.toString('utf8', 0, Math.min(buffer.length, 2048));
	const tag = /<svg\b[^>]*>/i.exec(text)?.[0];
	if (!tag) return null;
	const width = /\swidth=["']([\d.]+)(px)?["']/.exec(tag)?.[1];
	const height = /\sheight=["']([\d.]+)(px)?["']/.exec(tag)?.[1];
	if (width && height) return { width: Math.round(+width), height: Math.round(+height) };
	const box = /viewBox=["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*["']/.exec(tag);
	return box ? { width: Math.round(+box[1]), height: Math.round(+box[2]) } : null;
}

export function imageSize(buffer) {
	return png(buffer) ?? gif(buffer) ?? jpeg(buffer) ?? webp(buffer) ?? svg(buffer);
}
