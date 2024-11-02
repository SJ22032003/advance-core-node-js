import { Duplex } from "node:stream";
import { open, close, read, write } from "node:fs";

type TDuplex = {
    readableHighWaterMark ? : number;
    writableHighWaterMark ? : number;
    readFileName: string;
    writeFileName: string;
}

class MyDuplex extends Duplex {
    readFileName: string = '';
    writeFileName: string = '';
    readFd: null | number = null;
    writeFd: null | number = null;
    chuncks: Array < Buffer > = [];
    chunckSize: number = 0;

    constructor({ readableHighWaterMark = 16 * 1024, writableHighWaterMark = 16 * 1024, readFileName, writeFileName }: TDuplex) {
        super({ readableHighWaterMark, writableHighWaterMark });
        this.readFileName = readFileName;
        this.writeFileName = writeFileName;
    }

    _construct(callback: (error ? : Error | null) => void): void {
        open(this.readFileName, "r", (err, r_fd) => {
            if (err) return callback(err);
            this.readFd = r_fd;
            open(this.writeFileName, "w", (err, w_fd) => {
                if (err) return callback(err);
                this.writeFd = w_fd;
                callback();
            })
        })
    }

    _write(chunk: any, encoding: BufferEncoding, callback: (error ? : Error | null) => void): void {
        this.chuncks.push(chunk);
        this.chunckSize += chunk.length;
        if (this.chunckSize > this.writableHighWaterMark) {
            write(this.writeFd, Buffer.concat(this.chuncks), (err) => {
                if (err) {
                    callback(err);
                }
                this.chuncks = [];
                this.chunckSize = 0;
            })
        } else {
            callback();
        }
    }

    _read(size: number): void {
        const buffer = Buffer.alloc(size);
        read(this.readFd, buffer, 0, size, null, (err, bytesRead) => {
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

    _final(callback: (error ? : Error | null) => void): void {
        write(this.writeFd, Buffer.concat(this.chuncks), (err) => {
            if (err) return callback(err);
            this.chuncks = [];
            this.chunckSize = 0;
            callback();
        })
    }

    _destroy(error: Error | null, callback: (error ? : Error | null) => void): void {
        callback(error);
    }

}

const duplex = new MyDuplex({
    readFileName: "read.txt",
    writeFileName: "write.txt",
    readableHighWaterMark: 22, // 22 byte
    writableHighWaterMark: 22
})

duplex.on("data", (chunk) => {
    duplex.write(chunk, "utf8", (err) => {
        if (err) {
            console.log(err);
            duplex.emit("error");
        }
    })
})

duplex.on("error", (err) => {
    duplex.destroy(err);
})

duplex.on("finish", () => {
    console.log("finish");
})