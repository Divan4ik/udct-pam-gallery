const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Welcome!'));
app.get('/update', (req, res) => {

    exec('./../update.sh',
    function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
        if (error !== null) {
         console.log('exec error: ' + error);
        }
    })
    res.send('updating');
});
app.listen(8000, () => console.log('listening on port 8000'));