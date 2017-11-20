const express = require('express');
const app = express();
const path = require('path');
let publicDir = __dirname + '/templates/';

app.get('/', (req, res) =>  {
	res.sendFile( path.join(publicDir+'index.html') )
});

app.listen(8000, () => console.log('listening on port 8000'));