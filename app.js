const path = require('path')
const http = require('http')

const rootUrl = 'http://manhua.dmzj.com/yiquanchaoren'

http.get(rootUrl,function (res) {

}).on('error',function () {
   console.log('首页请求失败');
});

