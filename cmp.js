function orderByClick(a,b) {
	return a.click >= b.click ? -1:1;
}
function orderByFavourites(a,b) {
	return a.favourites >= b.favourites ? -1:1;
}
function orderByCoins(a,b) {
	return a.coins >= b.coins ? -1:1;
}

exports.orderByClick      = orderByClick;
exports.orderByFavourites = orderByFavourites;
exports.orderByCoins      = orderByCoins;