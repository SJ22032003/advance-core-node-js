import { Buffer, constants } from "node:buffer";

// console.log(constants.MAX_LENGTH);
// console.log(constants.MAX_STRING_LENGTH);

// this operation takes time
// const buffer = Buffer.alloc(1e9, 0); // assign 10000 bytes and fill with 0;

// for (let i = 0; i < buffer.length; i++) {
// 	buffer[i] = 0xFF;
// }

/* faster way but unsafe
 in allocUnsafe, buffer can also assign memory which already have some data present
 if some hacker can get its hand on unsafeBuffer then it can potentially get some sensitive info
 present in the buffer.
*/
const unsafeBuffer = Buffer.allocUnsafe(1000);
console.log(Buffer.poolSize, "poolSize")
// fastest way is to allowUnsafe(Buffer.poolSize >>> 1); | that means to take poolSize and divide by 2 + floor it


// for(let i = 0; i < unsafeBuffer.length; i++) {
// 	// in buffer value stored in decimal
// 	// 0 as value means nothing is assigned in this memory
// 	// else means something is present which may or may not be sensitive information
// 	if(unsafeBuffer[i] !== 0) {
// 		console.log(`SOMETHING PRESET AT POSITION ${i} = ${unsafeBuffer[i].toString(2)}`) // base 2 means binary
// 	}
// }

process.exit(0);