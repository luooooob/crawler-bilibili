var request   = require('request');
var cheerio   = require('cheerio');
var async     = require('async');
var fs        = require('fs');

var start_av  = 99585;
var end_av    = 7350000;
var min_click = 1000000;

var avUrls    = new Array();

for(var i = start_av; i <= end_av; i++) {
	avUrls.push("http://interface.bilibili.com/player?id=cid:12039653&aid="+i);
}
var saveFile = function(aid,click,favourites,coins) {
	fs.appendFile('result.txt', 
		'av'+aid+'\t'+
		'点击数: '+click+'\t'+
		'收藏: '+favourites+'\t'+
		'硬币: '+coins+'\n'
		, 'utf-8', function (err) {
	    if (err) {
	        console.log(err);
	        console.log("fs ERROR !");
	    } else {
	    	console.log("av"+aid+'------已写入');
	    }
	});
} 
var requestAndWrite = function(url,callback){
	request(url, function(err,result){
		if(err){
			console.log(err);
			console.log("request ERROR !");
		} else {
			var body       = result.body;
			var $          = cheerio.load(body);
			var aid        = $('aid').text();
			var click      = $('click').text();
			var favourites = $('favourites').text();
			var coins      = $('coins').text();
			console.log('正在抓取------av'+aid)
			if(aid != ""&&click > min_click) {
				saveFile(aid,click,favourites,coins);
			}
			callback(null,"successful !");
		}
	})
}

async.mapLimit(avUrls,5,function(url,callback){
    requestAndWrite(url,callback);
},function(err,result){
	if(err) {
		console.log(err);
		console.log("并发 ERROR !");
	} else {
		console.log("全部抓取完毕！");
	}
})