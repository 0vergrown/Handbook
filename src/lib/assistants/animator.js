/**
 * Sprite-sheet animator for the Office Assistants.
 *
 * Each animation is a list of frames, a frame names one sprite-sheet offset per overlay layer, and frames may branch (weighted random) or carry an exit branch used to break out of a loop.
 *
 * Sound is deliberately not implemented, a documentation site that makes noise at you is a documentation site people close.
 */

export const WAITING = 1;
export const EXITED = 0;

export default class Animator {
	/**
	 * @param {HTMLElement} el   the element to animate
	 * @param {string} mapUrl    sprite sheet URL
	 * @param {object} data      agent definition (framesize, overlayCount, animations)
	 */
	constructor(el, mapUrl, data) {
		this.el = el;
		this.data = data;
		this.mapUrl = mapUrl;
		this.frameIndex = 0;
		this.frame = undefined;
		this.exiting = false;
		this.animation = undefined;
		this.animationName = undefined;
		this.endCallback = undefined;
		this.started = false;
		this.loop = undefined;

		this.overlays = [this.setupElement(el)];
		let curr = el;
		for (let i = 1; i < (data.overlayCount || 1); i++) {
			const inner = this.setupElement(document.createElement('div'));
			curr.appendChild(inner);
			this.overlays.push(inner);
			curr = inner;
		}
	}

	setupElement(el) {
		const [w, h] = this.data.framesize;
		el.style.display = 'none';
		el.style.width = `${w}px`;
		el.style.height = `${h}px`;
		el.style.background = `url('${this.mapUrl}') no-repeat`;
		return el;
	}

	get size() {
		return this.data.framesize;
	}

	animations() {
		return Object.keys(this.data.animations);
	}

	hasAnimation(name) {
		return !!this.data.animations[name];
	}

	/** Pick a real animation name from a list of candidates. */
	firstAvailable(...names) {
		for (const name of names.flat()) {
			if (name && this.hasAnimation(name)) return name;
		}
		return undefined;
	}

	randomIdle() {
		const idles = this.animations().filter((n) => n.startsWith('Idle'));
		if (!idles.length) return undefined;
		return idles[Math.floor(Math.random() * idles.length)];
	}

	exitAnimation() {
		this.exiting = true;
	}

	show(name, onStateChange) {
		this.exiting = false;
		if (!this.hasAnimation(name)) return false;

		this.animation = this.data.animations[name];
		this.animationName = name;
		this.frameIndex = 0;
		this.frame = undefined;
		this.endCallback = onStateChange;

		if (!this.started) {
			this.started = true;
			this.step();
		}
		return true;
	}

	draw() {
		const images = this.frame?.images ?? [];
		for (let i = 0; i < this.overlays.length; i++) {
			if (i < images.length) {
				const [x, y] = images[i];
				this.overlays[i].style.backgroundPosition = `${-x}px ${-y}px`;
				this.overlays[i].style.display = 'block';
			} else {
				this.overlays[i].style.display = 'none';
			}
		}
	}

	nextFrameIndex() {
		if (!this.animation) return undefined;
		if (!this.frame) return 0;

		if (this.exiting && this.frame.exitBranch !== undefined) return this.frame.exitBranch;

		const branching = this.frame.branching;
		if (branching) {
			let rnd = Math.random() * 100;
			for (const branch of branching.branches) {
				if (rnd <= branch.weight) return branch.frameIndex;
				rnd -= branch.weight;
			}
		}
		return this.frameIndex + 1;
	}

	atLastFrame() {
		return this.frameIndex >= this.animation.frames.length - 1;
	}

	step() {
		if (!this.animation) return;

		const next = Math.min(this.nextFrameIndex(), this.animation.frames.length - 1);
		const changed = !this.frame || this.frameIndex !== next;
		this.frameIndex = next;

		if (!(this.atLastFrame() && this.animation.useExitBranching)) {
			this.frame = this.animation.frames[this.frameIndex];
		}

		this.draw();
		this.loop = setTimeout(() => this.step(), this.frame?.duration ?? 100);

		if (this.endCallback && changed && this.atLastFrame()) {
			const waiting = this.animation.useExitBranching && !this.exiting;
			this.endCallback(this.animationName, waiting ? WAITING : EXITED);
		}
	}

	pause() {
		clearTimeout(this.loop);
	}

	dispose() {
		clearTimeout(this.loop);
		this.animation = undefined;
		this.frame = undefined;
		this.endCallback = undefined;
		this.started = false;
	}
}
