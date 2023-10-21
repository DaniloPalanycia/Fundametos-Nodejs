import {Readable, Writable, Transform} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read () {
        const i = this.indexx++

        setTimeout(() => {
            if (i>100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            }
        }, 5)
    }
}

class InverseNumberStream extends Transform {
_transform(chunk, enconding, callback) {
const transformed = Number(chunk.toString()) * -1

callback(null, Buffer.from(String(tronsfomed)))
}
}

class MultiplyByTenStream extends Writable {
    _write(chunk, enconding, callabck) {
        console.log(Number(chunck.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
.pipe(new InverseNumberStream ())
.pipe(new MultiplyByTenStream ())