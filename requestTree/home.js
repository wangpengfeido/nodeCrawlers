const path = require('path')
const http = require('http')
const url = require('url')
const cheerio = require('cheerio')

const PdfKitHelp = require('../helpUtils/pdfKitHelp')
const StreamToBuffer = require('../helpUtils/streamToBuffer')
const StreamToString = require('../helpUtils/streamToString')
const Chapter = require('./chapter/chapter')

const config = require('../config')

class Home {
    static run() {
        let doc = PdfKitHelp.getDocInstance(config.docName)
        let homeInformation
        new Promise(function (resolve, reject) {
            //读取首页
            let requestOption = url.parse(config.rootUrl)
            requestOption.headers = config.requestHeaders
            http.get(requestOption, function (res) {
                new StreamToString(res).on('end', function (str) {
                    homeInformation = Home._analysisHtml(str)
                    resolve()
                })
            }).on('error', function (error) {
                reject(error)
            })
        }).then(function () {
            return new Promise(function (resolve, reject) {
                //读取并写封面
                let requestOption = url.parse(homeInformation.homePicUrl)
                requestOption.headers = config.requestHeaders
                http.get(requestOption, function (res) {
                    new StreamToBuffer(res).on('end', function (buf) {
                        doc.writeFullPageText('一拳超人', 80)
                            .addPage()
                            .writeFullPageImage(buf)
                            .addPage()
                    })
                    resolve()
                }).on('error', function (error) {
                    reject(error)
                })
            })
        }).then(function () {
            return new Promise(function (resolve, reject) {
                //读取每一篇
                function loadOneChapter(url) {
                    console.log('正在读取：', homeInformation.catalog[0].title)
                    doc.writeFullPageText(homeInformation.catalog[0].title)
                        .addPage()
                    new Chapter(url)
                }

                loadOneChapter(config.webSite + homeInformation.catalog[0].url)
            })
        }).catch(function (error) {
            console.error('失败', error)
        })
        //TODO:end

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

