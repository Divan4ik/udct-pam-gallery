const uuidv4 = require('uuid/v4');


const imageSaver = function(rawImage, path) {

	let filename = uuidv4() + '.jpg';

	rawImage.write(path+filename, (err) => {
		if (err) throw err;
	});

	return filename;	
}


module.exports = imageSaver;