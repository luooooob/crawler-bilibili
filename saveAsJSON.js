var fs  = require('fs');
 
var saveJSON = function(data) {
	fs.writeFile('result.json', data, "utf8", function(err) {
		if(err) {
			console.log("writeFile ERROR !");
			console.log(err);
		}
	})
}
var loadResult = function() {
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
			data = "[" + data + "]";
			saveJSON(data);
		}
	});
}
loadResult();

/*var reorder = function(aidList) {
	var coinsList           = aidList.sort(cmp.orderByCoins);
	coinsList.listName      = "coinsList";
	saveList(coinsList);
	var clickList           = aidList.sort(cmp.orderByClick);
	clickList.listName      = "clickList";
	saveList(clickList);
	var favouritesList      = aidList.sort(cmp.orderByFavourites);
	favouritesList.listName = "favouritesList";
	saveList(favouritesList);
}*/
