var fs  = require('fs');
var cmp = require('./cmp');


var topHow = 10;

var saveList = function(list) {
	console.log(list.listName);
	for(var i = 0;i < topHow;i++) {
		console.log(list[i]);
	}
}

var reorder = function(aidList) {
	var clickList      = aidList.sort(cmp.orderByClick);
	clickList.listName = "clickList";
	saveList(clickList);
	var favouritesList = aidList.sort(cmp.orderByFavourites);
	favouritesList.listName = "favouritesList";
	saveList(favouritesList);
	var coinsList      = aidList.sort(cmp.orderByCoins);
	saveList(coinsList);
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
