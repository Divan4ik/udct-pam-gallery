const express = require('express');
const app = express();
const path = require('path');
const rootDir = __dirname + '/../';
const templates = rootDir+'templates/';

app.get('/', (req, res) =>  {
	res.sendFile( path.join(templates+'index.html') )
});

app.listen(8000, () => console.log('listening on port 8000'));