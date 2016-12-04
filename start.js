var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');




var option = {
	url: "http://music.163.com/weapi/v1/resource/comments/R_SO_4_407761576/?csrf_token="
}
request.post('http://music.163.com/weapi/v1/resource/comments/R_SO_4_407761576/?csrf_token=', function(err,result){
	if(err) {
		console.log("抓取失败");
		console.log(err);
	} else {
		console.log(result._readableState.highWaterMark);
	}
})