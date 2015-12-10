var voHttp = require('http');
var voExpress = require('express');
var voFS = require('fs');
var voURL = require('url');
var voPath = require('path');
var voApp = voExpress();
var vsRootPath = __dirname;

voApp.set('port', 8124);
voApp.use(voExpress.static(voPath.join(__dirname, 'public')));

voApp.get('/ret', function (req, res) {
    res.redirect('http://www.naver.com');
});

voHttp.createServer(voApp).listen(voApp.get('port'), function () {
    console.log('Express server listening on port ' + voApp.get('port'));
});
