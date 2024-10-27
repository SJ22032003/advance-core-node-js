import { open } from "node:fs/promises";
import { join } from "node:path";

// VERY FAST
// DO NOT DO THIS WAY
// TAKES A LOT OF MEMORY
// exec time 275ms
async function run() {
	const fileHandle = await open(join("test.txt"), "w")

	const stream = fileHandle.createWriteStream();

	console.time("writeMany");

	for(let i = 0; i < 10e5; i++) {
		const buff = Buffer.from(i+1 + "\n", "utf8");
		stream.write(buff);
	}

	console.timeEnd("writeMany");

}

run();