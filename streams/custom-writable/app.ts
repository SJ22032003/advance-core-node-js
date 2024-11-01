import { Writable } from "node:stream";
import { open, write, close } from "node:fs";

class MyWritable extends Writable {
	fileName: string = ""; 
	fd: null | number = null;
	chunks: Array<Buffer> = [];
	chunkSize: number = 0;
	numberOfWrites = 0;

	constructor({ highWaterMark = 16 * 1024, fileName }: { highWaterMark?: number, fileName: string }) {
		super({ highWaterMark })
		this.fileName = fileName;
	}

// THIS WILL RUN AFTER THE CONSTRUCTOR, AND IT WILL PAUSE ALL THE METHODS UTIL ITS COMPLETLY RUN AND callback IS RUN
// callback WITH NO ARGS MEANS NO ERRORS WERE FOUND ELSE WE HAVE AN ERROR AND WE SHOULD NOT PROCCED
	_construct(callback: (error?: Error | null) => void): void {
	    open("test.txt", "w", (err, fd) => {
	    	if(err) {
	    		callback(err);
	    	} else {
	    		this.fd = fd;
	    		callback();
	    	}
	    })
	}

	_write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
	    this.chunks.push(chunk);
	    this.chunkSize += chunk.length;

	    console.log(chunk.length);

	    if(this.chunkSize > this.writableHighWaterMark) {
	    	write(this.fd, Buffer.concat(this.chunks), (err) => {
	    		if(err) {
	    			return callback(err)
	    		}
	    		this.chunks = [];
	    		this.chunkSize = 0;
	    		++this.numberOfWrites;
	    		callback();
	    	})
	    } else {
	    	callback();
	    }

	}

	_final(callback: (error?: Error | null) => void): void {
		write(this.fd, Buffer.concat(this.chunks), (err) => {
			if(err) {
				callback(err);
			}
			this.chunks = [];
			callback();
		})
	}

	_destroy(error: Error | null, callback: (error?: Error | null) => void): void {
		if(this.fd) {
			close(this.fd, (err) => {
				callback(err || error);
			})
		} else {
			callback(error);
		}
	}

}

const myWriteStream = new MyWritable({ fileName: "test.txt" });

myWriteStream.write(Buffer.from("THIS IS EXAMPLE Buffer"));