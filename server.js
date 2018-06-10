const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs')


var db;

//to connect to the mongo db
MongoClient.connect('mongodb://Tim:mLabdbuser1@ds255767.mlab.com:55767/fsjs-db1', (err, client) => {
    if (err) return console.log(err)
    db = client.db('fsjs-db1')

    app.listen(3000, () => {
        console.log('listening on port 3000')
    })
})

app.use(bodyParser.urlencoded({
    extended: true
}))




app.get('/', (req, res) => {
    //this gets the quotes collection from mLab
    //.find() returns a mongo object (curser) which contains all quotes from the db
    //The toArray method takes in a callback function that allows us to do stuff with quotes we retrieved from mLab
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {
            quotes: result
        })
    })
})

app.post('/quotes', (req, res) => {
    //this will create the quotes collection in the fsjs-db1 database and save the post data
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})