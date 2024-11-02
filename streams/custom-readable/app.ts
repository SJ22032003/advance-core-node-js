import { Readable } from "node:stream";
import { open, read, close } from "node:fs";

class MyReader extends Readable {

    fileName: string = '';
    fd: null | number = null;

    constructor({ highWaterMark = 16 * 1024, fileName }: { highWaterMark ? : number, fileName: string }) {
        super({ highWaterMark })
        this.fileName = fileName;
    }

    _construct(callback: (error ? : Error | null) => void): void {
        open(this.fileName, (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback()
            }
        })
    }

    _read(size: number): void {
        const buffer = Buffer.alloc(size);
        read(this.fd, buffer, 0, size, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                if (bytesRead > 0) {
                    this.push(buffer.subarray(0, bytesRead));
                } else {
                    this.push(null);
                }
            }
        })
    }

    _destroy(error: Error | null, callback: (error ? : Error | null) => void): void {
        if (this.fd) {
            close(this.fd, (err ? : Error) => {
                if (error) {
                    callback(err || error);
                } else {
                    callback();
                }
            })
        } else {
            callback(error);
        }
    }

}

const myReader = new MyReader({ fileName: "test.txt" });

myReader.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"))
})

myReader.on("end", () => {
    console.log("End");
})