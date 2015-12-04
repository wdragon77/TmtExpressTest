var voHttp      = require('http');
var voExpress   = require('express');
var voFS        = require('fs');
var voURL       = require('url');
var voPath      = require('path');
var voApp       = voExpress();
var vsRootPath  = __dirname;

voApp.set('port', 8124);
voApp.use(voExpress.static(voPath.join(__dirname, 'public')));

voApp.get('/ret', function (req, res) {
    res.redirect('http://www.naver.com');
});

voApp.get('/sample', function (req, res) {
    var voReqURL = voURL.parse(req.url);
    var vsURL = voReqURL.query;
    var vsFilePath = vsRootPath + '\\templet\\sample.html';
        
    voFS.exists(vsFilePath, function (exists) {
        
        if (!exists) {
            res.send('Bad request 404\n');
        } else {
            voFS.open(vsFilePath, "r", function (error, fd) {
                voFS.stat(vsFilePath, function (error, stats) {
                    var buffer = new Buffer(stats.size);
                    
                    voFS.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
                        var data = buffer.toString("utf8", 0, buffer.length);
                        
                        console.log(data);
                        
                        res.send(data);
                        
                        voFS.close(fd);
                    });
                });
            });

        }
    });


});

voHttp.createServer(voApp).listen(voApp.get('port'), function () {
    console.log('Express server listening on port ' + voApp.get('port'));
});