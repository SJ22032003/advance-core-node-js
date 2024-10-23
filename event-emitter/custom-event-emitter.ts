class CustomEventEmitter {
	listeners: Record<string, Array<Function>> = {}
	constructor() {}

	on(event: string, fn: Function): void {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(fn);
	}

	emit(event: string, ...args: any[]): boolean {
		if(!this.listeners[event]) return false;
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].forEach(fn => {
			fn(...args);
		})
		return true;
	}

}

module.exports = CustomEventEmitter;	