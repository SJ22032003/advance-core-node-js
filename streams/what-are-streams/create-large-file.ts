import * as fs from "node:fs/promises";

async function run() {
	try {

		const fileHandler = await fs.open("large-file.txt", "w");

		const writeStream = fileHandler.createWriteStream();

		let startFrom = 1;
		const writeManyToFile = () => {
			while(startFrom < 1e6) {
				if(startFrom === 1e6-1) {
					writeStream.end(startFrom + "\n");
					break;
				}
				if(!writeStream.write(startFrom + "\n")) {
					break;
				}
			 startFrom++;
			}
		}

		writeManyToFile();

		writeStream.on("drain", () => {
			writeManyToFile();
		})

		writeStream.on("finish", () => {
			writeStream.close();
			fileHandler.close();
		})

	} catch(err) {
		console.error(err);
		process.exit(1);
	}
}

run();