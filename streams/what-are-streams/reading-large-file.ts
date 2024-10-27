import * as fs from "node:fs/promises";

async function run() {
	try {

		const fileHandler = await fs.open("large-file.txt", "r");
		const writeFileHandler = await fs.open("even-large-file.txt", "w");

		const readingFile = fileHandler.createReadStream({ highWaterMark: 16 * 1024 });
		const writingFile = writeFileHandler.createWriteStream({ highWaterMark: 16 * 1024 });

		let split = "";

		readingFile.on("data", (chunk) => {
			const numberArr = chunk.toString("utf8").split("\n");
			if(parseInt(numberArr[0]) + 1 !== parseInt(numberArr[1])) {
				numberArr[0] = split + numberArr[0];
			}
			if(parseInt(numberArr[numberArr.length - 2]) + 1 !== parseInt(numberArr[numberArr.length - 1])) {
				split = numberArr.pop();
			}
			numberArr.forEach(num => {
				if(parseInt(num) % 2 === 0) {
					const ok = writingFile.write(num + "\n");
					if(!ok) readingFile.pause();
				}
			})
		})

		writingFile.on("drain", () => {
			readingFile.resume();
		})

		readingFile.on("end", () => {
			console.log("READING FILE DONE");
			writingFile.end();
		})

		writingFile.on("finish", () => {
			console.log("FINISHED");
			fileHandler.close();
			writeFileHandler.close();
		})


	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

run();