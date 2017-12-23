let fs = require('fs')
let PdfKit = require('pdfkit')

class PdfKitHelp {
    /**
     * @param instanceName {String} 实例名称
     * @param outputFile {String} 输出文件url
     */
    constructor(instanceName, outputFile) {
        this.doc = new PdfKit()
        PdfKitHelp.instances[instanceName] = this.doc
        this.doc.pipe(fs.createWriteStream(outputFile))
    }

    getDoc() {
        return this.doc;
    }

    /**
     * 获取pdfkit实例
     * @param instanceName {String}
     * @returns {PdfKit|PDFDocument}
     */
    static getDocInstance(instanceName) {
        return PdfKitHelp.instances[instanceName];
    }
}

PdfKitHelp.instances = {}

module.exports = PdfKitHelp
