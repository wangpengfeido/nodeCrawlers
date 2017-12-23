const path = require('path')
const http = require('http')
const url = require('url')

const StreamToBuffer = require('./helpUtils/streamToBuffer')
const PdfKitHelp = require('./helpUtils/pdfKitHelp')

let pdfDoc = new PdfKitHelp('test', path.join('./test.pdf')).getDoc()
let requestOption = url.parse('http://images.dmzj.com/webpic/1/onepunchmanfengmianl.jpg')
requestOption.headers = {'Referer': 'http://manhua.dmzj.com/yiquanchaoren'}
http.get(requestOption, function (res) {
    let pic
    new StreamToBuffer(res).on('end', function (buf) {
        // console.log(bu   nf.toString('base64'))
        pdfDoc.image(buf)
        pdfDoc.end()
    })
})


