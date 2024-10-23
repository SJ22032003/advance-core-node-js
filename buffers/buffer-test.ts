import { Buffer } from "node:buffer";

const myBuffer = Buffer.alloc(3);

myBuffer[2] = 0x21;
myBuffer[1] = 0x69;
myBuffer[0] = 0x48;

console.log(myBuffer.toString("utf-8"));

const buff = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff) // usually will show the values in decimal or base 10 
console.log(buff.toString("utf8"))

// we can also use "from" to allocate memory for different values
const buff2 = Buffer.from("486921", "hex"); // means same as above but now we are putting the hex values
console.log(buff2.toString("utf8")); // this will result in same thing as above

// another example
const buff3 = Buffer.from("Hi!", "utf8");
console.log(buff3, "buffer - 3");

// another example
const buff4 = Buffer.from("E0A49B", "hex") // E0A49B -> छ
console.log(buff4.toString("utf8"));