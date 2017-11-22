const converter  = require('./rgbArrayToImageConverter');
const saveImage  = require('./imageSaver');

const path = require('path');
const rootDir = __dirname + '/../';
const templates = rootDir+'templates/';
const imageDir = rootDir + 'public/images/';
const webDir = '/images/';


module.exports = function (app, pool) {

    app.get('/test-script', (req, res) => {
        res.sendFile( path.join(templates+'test.html') );
    });

    app.get('/', (req, res) =>  {
        res.sendFile( path.join(templates+'index.html') )
    });

    app.get('/widget', (req, res) => {
        res.sendFile( path.join(templates+'widget.html') );
    });

    app.post('/test', function (req, res) {
        let hostname = req.protocol + '://' + req.get('host');
        let data = req.body;

        // pool.getConnection(function(err, connection) {
        //
        // });

        let image = converter(data);
        let filename = saveImage(image, imageDir);
        let responseData = {
           'url': hostname + webDir + filename
        };
        res.json(responseData);
    });



    app.use(function(req, res, next) {
			res.status(404).sendFile( path.join(templates+'404.html') );
    });

};