import EventEmitter from "events";
import CustomEventEmitter from "./custom-event-emitter";

class Emitter extends EventEmitter {}

const customMyE = new CustomEventEmitter();

customMyE.on("cus-foo", (name: string) => {
	console.log("custom event emitter", name)
})

customMyE.on("cus-foo", (name: string) => {
	console.log("custom event emitter 2", name)
})

customMyE.emit("cus-foo", "this is custom created");

const myE = new Emitter();

myE.on("foo", () => {
	console.log("Event Occoured")
})

myE.emit("foo");

// run event only one time
myE.once("bar", async () => {
	setTimeout(() => {
		console.log("async bar once")
	}, 2000)
})

myE.emit("bar");
myE.emit("bar"); // will not run again
 