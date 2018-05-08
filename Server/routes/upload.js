var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');

router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../files');    //文件存储路径
    form.keepExtensions = true;                          //保存扩展名
    form.parse(req, function (err, fileds, files) {
        var oldPath = path.normalize(files.img.path);
        var index = oldPath.indexOf('upload');
        var img_path = oldPath.substr(index);
        if (err) {
            console.log(err.message);
            res.send({ status: 202, data: '', msg: 'fail' });
            return;
        };
        res.send({ status: 200, data: { "img_path": img_path }, msg: 'success' });
    })
})

module.exports = router;

