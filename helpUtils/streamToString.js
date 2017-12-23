const EventEmitter = require('events').EventEmitter

/**
 * 将流写入到字符串
 */
/**
 * Event:'end'
 * @param str 写好的字符串
 */
class StreamToString extends EventEmitter {
    constructor(writableStream, endCallBack) {
        super()
        let _self = this
        let text = ''
        writableStream.on('data', function (data) {
            text += data;
        })
        writableStream.on('end', function () {
            _self.emit('end', text)
        })
    }
}

module.exports = StreamToString