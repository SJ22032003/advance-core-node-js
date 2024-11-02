import * as fs from "node:fs/promises";
import { pipeline } from "node:stream";

// will take 13.6ms
async function run() {
    try {

        console.time("copy");

        const src = await fs.open("even-large-file.txt", "r");
        const dest = await fs.open("copy-file.txt", "w");

        const reading = src.createReadStream();
        const writing = dest.createWriteStream();

        // PIPE WILL ONLY WORK FROM read strem AND chain WITH read stream
        // PIPE JUST AUTOMATICALLY HANDLE OVERFLOW OF DATA THAT WE DID MANUALLY LIKE PAUSE ON READ STREAM
        // BELOW CODE IS JUST COPY PASTING THE FILE INTO THE DESTINATION
        // reading.pipe(writing);

        // reading.on("end", () => {
        // 	console.timeEnd("copy");
        // 	src.close();
        // 	dest.close();
        // })

        // USING pipeline IS BETTER SINCE IT WILL HANDLE THE ERRORS AND AUTOMATICALLY DESTORY STREAMS WHEN ERROR OCCURS
        pipeline(reading, writing, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("FINISHED")
        })

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();