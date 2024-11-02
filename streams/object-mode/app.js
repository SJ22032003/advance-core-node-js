const { chain } = require("stream-chain");
const { parser } = require("stream-json");
const { streamValues } = require("stream-json/streamers/StreamValues");
const { pick } = require("stream-json/filters/Pick");
const { open } = require("fs/promises");

async function run() {
    try {

        const readFileHandler = await open("mock-data.json", "r");
        const writeFileHanlder = await open("copy-data.json", "w");

        const reader = readFileHandler.createReadStream();
        const writer = writeFileHanlder.createWriteStream();

        const pipeline = chain([
            reader,
            parser(),
            // pick({ filter: 'data' }),
            // streamValues(),
            data => {
                console.log(data);
            }
        ]);


        pipeline.on("data", (chunck) => {
            console.log(chunck);
        })

        pipeline.on("end", () => console.log("end"));

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

run();