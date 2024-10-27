import * as fs from "node:fs/promises";

async function run() {
	try {

		const fileHandler = await fs.open("answer.txt", "r");
		const outputFileHandler = await fs.open("output.txt", "w");

		const writeStream = outputFileHandler.createWriteStream();

// HIGHWATERMARK IS THRESHOLD OF WHAT AMOUNT DATA CAN BE PLACED IN BUFFER (DEFAULT IS 16kB)
// THIS CAN BE CHANGED
console.log(writeStream.writableHighWaterMark)

		const readFile = fileHandler.createReadStream();

		readFile.on('data', (chuck) => {
			const ok = writeStream.write(chuck, (err) => {
				if(err) {
					readFile.emit("error", err)					
				}
			})
			// MEANS THAT write stream BUFFER IS FULL CAN CANNOT TAKE MORE DATA FROM read stream
			if(!ok) readFile.pause();
		})

		// WHEN write stream IS EMPTY AND CAN READ DATA FROM read stream;
		writeStream.on("drain", () => {
			readFile.resume();
		})

		readFile.on("error", (err: Error | undefined) => {
			if(err) {
				console.error(err);
				readFile.destroy();
				writeStream.destroy();
			}
		})

		// Close file descriptors on end of stream
		readFile.on("end", () => {
			writeStream.end(); // Ensure any remaining data is flushed | after end --> finish event will emit
			console.log("Stream ended successfully.");
		});

		// CLOSE FILE WHEN THE STREAM IS DONE
		writeStream.on("finish", async () => {
			await fileHandler.close();
			await outputFileHandler.close();
			console.log("File handlers closed.");
		});

	} catch (err) {
		console.error(err)
	}
}

run();