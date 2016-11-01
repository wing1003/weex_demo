require('webpack')
require('weex-loader')

var path = require('path')
var fs =require('fs');

var entry = {};
var outpath = '../../My_Space/resources_v2.0/static/h5/view/detail';

(function walk(dir){
  dir = dir || '.'
  var directory = path.join(__dirname, 'src', dir);

  // 定制读取文件
  var files = [
    'joinProgram'
    //'moreCustomDetail'
  ];
  console.log(files);
  fs.readdirSync(directory)
    .forEach(function(file){
      var fullpath = path.join(directory, file);
      var stat = fs.statSync(fullpath);
      var extname = path.extname(fullpath);
      var filename = path.basename(fullpath, extname);
      if(stat.isFile() && extname === '.we' && filename.indexOf(files)!==-1){
        var name = path.join(dir, path.basename(file, extname));
        entry[name] = fullpath + '?entry=true';
      }else if (stat.isDirectory() && file !== 'dist' && file !== 'include'){
        var subdir = path.join(dir, file);
        walk(subdir);
      }
    })
})()
// console.log(entry);

module.exports = {
  entry: entry,
  output: {
    path: outpath,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.we(\?[^?]+)?$/,
        loader: 'weex'
      }
    ]
  }
}


/*
//获取当前ip地址
function getIPAddress(){
  var os = require('os');
  var ips = os.networkInterfaces();
  var address ;
  for(var item in ips){
    for(var data in ips[item]){
      var ip = ips[item][data];
      if(ip.address.indexOf('192')==0){
          address = ip.address;
          return address;
      }
    }
  }
}


//生成原生调试二维码
var qrcode = require('qrcode-terminal');
qrcode.generate("http://"+getIPAddress()+":8880/dist/main.js");

console.log("\r\n按住ctrl点击右侧地址打开应用--->http://localhost:8880\r\n");*/
