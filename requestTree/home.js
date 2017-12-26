const path = require('path')
const http = require('http')
const url = require('url')
const cheerio = require('cheerio')
const StreamToBuffer = require(path.join(global.absolutePrefix, '/helpUtils/streamToBuffer'))
const StreamToString = require(path.join(global.absolutePrefix, '/helpUtils/streamToString'))
const config = require(path.join(global.absolutePrefix, '/config'))
const doc = require(path.join(global.absolutePrefix, '/helpUtils/pdfKitHelp')).getDocInstance(config.docName)

class Home {
    static run() {
        let requestOption = url.parse(config.rootUrl)
        requestOption.headers = config.requestHeaders
        http.get(requestOption, function (res) {
            new StreamToString(res).on('end', function (str) {
                console.log(JSON.stringify(Home._analysisHtml(str)))
            })
        })
    }

    /**
     * 解析html
     * @param html
     * @return {{
            homePicUrl,
            catalog:[
                {
                    title,
                    url,
                }
            ]}}
     * @private
     */
    static _analysisHtml(html) {
        const $ = cheerio.load(html)

        let homePicUrl = $('.anim_intro_ptext>a>img').attr('src')

        let catalog = []
        let pageOne = $('.cartoon_online_border').eq(0).add($('.cartoon_online_border').eq(1))
        pageOne.find('li>a').each(function () {
            catalog.push({
                title: $(this).text(),
                url: $(this).attr('href'),
            })
        })

        return {
            homePicUrl,
            catalog,
        }
    }
}


module.exports = Home

