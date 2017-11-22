const express = require('express');
const app = express();

const port = 8000;
const path = require('path');
const rootDir = __dirname + '/../';
const hostname = req.protocol + '://' + req.get('host');
const templates = rootDir+'templates/';
const ImageDir = '/images/';
const imageServeDir = rootDir + ImageDir;
const converter  = require('./rgbArrayToImageConverter.js');
const saveImage  = require('./imageSaver.js');

app.get('/', (req, res) =>  {
	res.sendFile( path.join(templates+'index.html') )
});

app.post('/', (req, res) =>  {

	let data = [
		[[0, 0, 0,255], [255,255,255,255],[255,255,255,255],[0,0,0,255]],
		[[0, 0, 0,255], [0, 0, 0,255],[255,255,255,255],[0,0,0,255]],
		[[0, 0, 0,255], [255,255,255,255],[0, 0, 0,255],[0,0,0,255]],
		[[0, 0, 0,255], [255,255,255,255],[255,255,255,255],[0,0,0,255]]
	]

	let image = converter(data);
	let filename = saveImage(image, imageServeDir);
	let responseData = {
		'url' => hostname + imageServeDir + '/' + filename
	}
	res.json( responseData );
	
});

app.listen(port, () => console.log('listening on port ' + port));