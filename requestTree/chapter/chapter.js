const EventEmitter = require('events').EventEmitter
const http = require('http')
const url = require('url')
const cheerio = require('cheerio')

const StreamToString = require('../../helpUtils/streamToString')
const Page = require('./page/page')

const config = require('../../config')

class Chapter extends EventEmitter {
    constructor(chapterUrl) {
        super()

        let information
        new Promise(function (resolve, reject) {
            let requestOption = url.parse(chapterUrl + '#@page=1')
            requestOption.headers = config.requestHeaders
            http.get(requestOption, function (res) {
                new StreamToString(res).on('end', function (html) {
                    console.log('...', html)
                    information = Chapter._analysisHtml(html)
                    console.log(information)
                })
            })
        })
    }

    /**
     * 解析html
     * @param html
     * @return {{
                    pages:[
                        {
                            id:'',
                            title:'',
                            picUrl:'',
                        }
                    ]
                }}
     * @private
     */
    static _analysisHtml(html) {
        const $ = cheerio.load(html)

        let pageSelectOptions = $('#page_select>option')
        let pages = []
        pageSelectOptions.each(function () {
            let dom = $(this)
            pages.push({
                id: dom.index(pageSelectOptions),
                title: dom.text(),
                picUrl: dom.val(),
            })
        })

        return {
            pages,
        }
    }
}

module.exports = Chapter

