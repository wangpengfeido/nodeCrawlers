let fs = require('fs')
let PdfKit = require('pdfkit')
let lodash = require('lodash')

class PdfKitHelp {
    /**
     * @param instanceName {String} 实例名称
     * @param outputFile {String} 输出文件url
     */
    constructor(instanceName, outputFile) {
        this.doc = new PdfKit()
        PdfKitHelp.instances[instanceName] = this
        this.doc.pipe(fs.createWriteStream(outputFile))
    }

    /**
     * 获取pdfkit实例
     * @return {PdfKit|PDFDocument}
     */
    getDoc() {
        return this.doc
    }

    /**
     * 写一张满页的图片(A4)
     * @param img {Buffer|String|URL}
     */
    writeFullPageImage(img) {
        let _doc = this.doc
        if (_doc) {
            _doc.image(img, 0, 0, {fit: [595, 842]})
            return this
        } else {
            return null
        }
    }

    /**
     * 写满页的文字
     * @param text {String}
     * @param size {Number}
     * @return {*}
     */
    writeFullPageText(text,size){
        let _doc = this.doc
        if (_doc) {
            _doc.image(text, 0, 0, {fit: [595, 842]})
            return this
        } else {
            return null
        }
    }

    /**
     * 结束
     */
    end() {
        let _doc = this.doc
        if (_doc) {
            _doc.end()
            return this
        } else {
            return null
        }
    }

    /**
     * 写一张满页的图片
     * @param doc {String|PdfKit}
     * @param img {Buffer|String|URL}
     */
    static writeFullPageImage(doc, img) {
        let _doc
        if (lodash.isString(doc)) {
            _doc = PdfKitHelp.instances[doc]
        } else {
            _doc = doc
        }
        if (_doc) {
            _doc.image(img, undefined, undefined, [100, 100])
            return _doc
        } else {
            return null
        }
    }

    /**
     * 获取pdfkit实例
     * @param instanceName {String}
     * @returns {PdfKit|PDFDocument}
     */
    static getDocInstance(instanceName) {
        return PdfKitHelp.instances[instanceName]
    }
}

PdfKitHelp.instances = {}

module.exports = PdfKitHelp
