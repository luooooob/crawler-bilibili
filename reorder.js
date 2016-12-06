var fs  = require('fs');
var cmp = require('./cmp');


var topHowMany = 10;

var saveList = function(list) {
	for(var i = 0;i < topHowMany;i++) {
		var text = JSON.stringify(list[i])
			.replace(/{"aid":/g,"av")
			.replace(/,"click":/g,"\t点击数: ")
			.replace(/,"favourites":/g,"\t收藏: ")
			.replace(/,"coins":/g,"\t硬币: ")
			.replace(/}/g,"\n");
		fs.appendFile(list.listName+'.txt',text,'utf-8',function(err){
			if(err) {
				console.log(err);
				console.log("printList ERROR !");
			} else {
				console.log("榜单写入完毕!");
			}
		})
	}
}

var reorder = function(aidList) {
	var coinsList           = aidList.sort(cmp.orderByCoins);
	coinsList.listName      = "coinsList";
	saveList(coinsList);
	var clickList           = aidList.sort(cmp.orderByClick);
	clickList.listName      = "clickList";
	saveList(clickList);
	var favouritesList      = aidList.sort(cmp.orderByFavourites);
	favouritesList.listName = "favouritesList";
	saveList(favouritesList);
}
 
var load = function() {
	fs.readFile("result.txt","utf8",function (err,data){
		if(err){
			console.log("readFile ERROR");
			console.log(err);
		} else {
			data = data.replace(/av/g, "{\"aid\":")
			.replace(/\t点击数: /g, ", \"click\":")
			.replace(/\t收藏: /g, ", \"favourites\":")
			.replace(/\t硬币: /g, ", \"coins\":")
			.replace(/\n/g, "}\n")
			.split("\n");
			data.pop();
			var aidList = new Array();
			data.forEach(function(item) {
				aidList .push(JSON.parse(item));
			})
			reorder(aidList)
		}
	});
}
load();
