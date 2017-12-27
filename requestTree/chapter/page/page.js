const EventEmitter = require('events').EventEmitter
const http=require('http')

class Page extends EventEmitter {
    constructor(url){
        super()

    }
}

module.exports = Page
