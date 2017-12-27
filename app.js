const path = require('path')

const PdfKitHelp = require('./helpUtils/pdfKitHelp')
const Home = require('./requestTree/home')
const config = require('./config')

let doc = new PdfKitHelp(config.docName, path.join(__dirname, config.outputPath))
doc.setDefaultFont(path.join(__dirname,'./fonts/fzstk.ttf'))
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


