import { appendFileSync, writeFileSync, appendFile, writeFile, open, writeSync } from "node:fs";

// IT TAKES AROUND 8sec TO RUN
// TAKES 100% USAGE IN ONE CORE CPU
function run() {
	console.time("writemany")
	writeFileSync("file_large_data.txt", "");

	for(let i = 0; i < 10e5; i++) {
		appendFileSync("file_large_data.txt", `${i+1}\n`);
	}

	console.timeEnd("writemany");

	process.exit(0);

}


// USING CALL BACK FS CAN BE FASTER THAN PROMISES
// EXE TIME 1.8sec
function runCB() {
	console.time("writemany")
	
	open("file_large_data.txt", "w", (err, fd) => {
		if(err) process.exit(1);
		console.log(fd)
		for(let i = 0; i < 10e5; i++) {
			writeSync(fd, i + "\n")
		}
		console.timeEnd("writemany");
		process.exit(0);
	})
}

runCB();