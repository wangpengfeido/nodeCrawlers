const EventEmitter = require('events').EventEmitter

/**
 * 将流写入到buffer
 */
/**
 * Event:'end'
 * @param buf {Buffer} 写好的buffer
 */
class StreamToBuffer extends EventEmitter {
    constructor(writableStream) {
        super()
        let _self = this
        let buf = Buffer.alloc(0)
        writableStream.on('data', function (data) {
            buf = Buffer.concat([buf, Buffer.from(data)])
        })
        writableStream.on('end', function () {
            _self.emit('end', buf)
        })
        writableStream.on('error', function () {
            console.error('将流写入到buffer失败')
        })
    }
}

module.exports = StreamToBuffer