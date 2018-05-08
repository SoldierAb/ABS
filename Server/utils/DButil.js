var mysql = require('mysql');
var db={};


db.connect=function (){
    var connection = mysql.createConnection({                                         //数据库连接
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'xuecheng',
    });
    connection.connect(function (err){
       if(err){
           console.log(err);
           return;
       } 
    })
    return connection;
}

db.close = function(connection){
    //关闭连接
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('关闭连接');
        }
    });
}

module.exports = db;