import EventTarget from "node:events";

const target  = new EventTarget();

target.addListener("foo", (event: string) => {
	console.log("event", event)
})

target.emit("foo", "hello");