const path = require('path')
const http = require('http')
const url = require('url')

global.absolutePrefix = path.join(__dirname, './')

const StreamToBuffer = require('./helpUtils/streamToBuffer')
const PdfKitHelp = require('./helpUtils/pdfKitHelp')
const Home = require('./requestTree/home')
const config = require('./config')

new PdfKitHelp(config.docName, path.join(__dirname, config.outputPath))
Home.run()




// let pdfDocHelp = new PdfKitHelp('test', path.join(__dirname,'./test.pdf'))
// let requestOption = url.parse('http://images.dmzj.com/webpic/1/onepunchmanfengmianl.jpg')
// requestOption.headers = {'Referer': 'http://manhua.dmzj.com/yiquanchaoren'}
// http.get(requestOption, function (res) {
//     let pic
//     new StreamToBuffer(res).on('end', function (buf) {
//         pdfDocHelp.writeFullPageImage(buf).end()
//     })
// })


