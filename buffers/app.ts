import { Buffer } from "node:buffer";

// buffers allocate 8bits or 1 bytes in each elements
const memoryContainer = Buffer.alloc(4) // 4 bytes = 32 bits ( 1byte = 8bits) // buffer will initialize with zero

// can access buffer "like" array | bufferes are not array

memoryContainer[0] = 0xF4; // storing hexadecimal values upto 8bits from 0 -> 255

// memoryContainer[1] = -22; // stores negative values as bitflip of 2's compliment
// correct way for storing negative values are
memoryContainer.writeInt8(-22, 1); // will write negative values
// reading negative value
console.log(memoryContainer.readInt8(1)) // will correctly show -22


memoryContainer[2] = 0xFF;
memoryContainer[3] = 0x0A; 

console.log(memoryContainer)

console.log(memoryContainer.toString("hex")) // will convert all the values in hex join them
// [244,234,255,10] = 244 -> f4 | 234 -> ea | 255 -> ff | 10 -> 0a ==> f4eaff0a