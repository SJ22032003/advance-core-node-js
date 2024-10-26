import { readFileSync } from "node:fs";
import { join } from "node:path";

const file = readFileSync(join(__dirname, 'text.txt'));

console.log(file.toString("utf8"));

// WHAT IS A FILE?
// ITS JUST A COLLECTION OF 1s N 0s SET IN MEMORY 
// AND CAN HAVE DIFFERENT DECODING TYPES LIKE 
// VIDEOS | IMAGES | TXT