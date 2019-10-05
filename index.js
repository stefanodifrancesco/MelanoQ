var express = require("express");
var app = express();
var path = require('path');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/views/MelanoQ.html'));
});
app.post("/", function(req,res){
    console.log("Ricevuto una richiesta POST");
    // contenuto della richiesta
    console.log(req.body);

    MongoClient.connect(url, { useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("quest");
        var myobj = req.body;
        dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
});
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});