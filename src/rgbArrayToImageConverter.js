const Jimp = require('jimp');

const rgbArrayToImageConverter = function(data) {

	let width = data[0].length,
			height = data.length,
			scaleNum = 20,
			imageWidth = scaleNum*width,
			imageHeight = scaleNum*height;


	let rawHexPixlesMatrix = data.map(function(array){
		return array.map(function(arr) {
			return parseInt('0x'+  arr.map(function(n) {
				return n.toString(16)  == 0 ? "00":n.toString(16).toUpperCase() ;
			}).join(''));
		})

	});

	let imageData = scale(rawHexPixlesMatrix, scaleNum);

	return new Jimp(imageWidth, imageHeight, function (err, image) {
		if (err) throw err;

		imageData.forEach((row, y) => {
			row.forEach((color, x) => {
				image.setPixelColor(color, x, y);
			});
		});
	});

}

const scale = function (arr, mag) {
	var res = [];
	if(!arr.length)
		return arr;
	for (var i = 0; i < arr.length; i++) {
		var temp = scale(arr[i], mag);
		for (var k = 0; k < mag; k++) {
			res.push(temp.slice ? temp.slice(0) : temp);
		}
	}
	return res;
}

module.exports = rgbArrayToImageConverter;