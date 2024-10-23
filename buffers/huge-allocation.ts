import { Buffer } from "node:buffer";

// assign huge memory to buffer will result in unexpected crashes or delayed performance
// in the system or server
// not to be used like this

const memoryToAssign = 1e9; // 1,000,000,000 bytes (1 GB);
const hugeBuffer = Buffer.alloc(memoryToAssign); // 1GB memory will be reserved for this buffer

hugeBuffer.fill(0xFF); // filling with random hexadecimal values


// CAUTION DO NOT RUN THIS!