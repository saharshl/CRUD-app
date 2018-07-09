let express = require('express');
let app = express();
let bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb://saha:saharsh1@ds241059.mlab.com:41059/application-start', (err, client) => {
    if (err) return console.log(err);

    db = client.db('application-start');
    app.listen(3001);

});

app.get('/', function (req, res) {
    db.collection('quotes').find().toArray(function(err, result) {
        if(err) return console.log(err);

        res.render('indexed.ejs' , {quotes:result});
});
});

app.post('/application', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log("err");

        console.log('Saved to database');
        res.redirect('/');
    });
});

