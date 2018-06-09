const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
const MongoClient = require('mongodb').MongoClient;


var db; 

//to connect to the mongo db
MongoClient.connect('mongodb://Tim:mLabdbuser1@ds255767.mlab.com:55767/fsjs-db1', (err, client) => {
    if (err) return console.log(err)
    db = client.db('fsjs-db1')

    app.listen(3000, () => {
        console.log('listening on port 3000')
    })
})

app.use(bodyParser.urlencoded({extended: true}))




app.get('/', (req, res) => {
    db.collection('quotes').find().toArray(function(err, results){
        console.log(results);
    });
    
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
    //this will create the quotes collection in the fsjs-db1 database and save the post data
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})