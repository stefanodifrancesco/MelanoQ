const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/', (req, res) => {
    sess = req.session;
    if (sess.username != null) {
        MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            function(err, db) {
                var dbo = db.db("MelanoQ");
                dbo.collection('nurses').findOne({ username: sess.username }, function(err, user) {

                    res.render('home', { profileData: user });
                });
            });
    } else {
        res.render('login');
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login',
    (req, res) => {

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            function(err, db) {
                if (err) throw err;
                var dbo = db.db("MelanoQ");

                dbo.collection('nurses').findOne({ username: req.body.username }, function(err, user) {

                    if (user === null) {
                        res.render('login', req.body);
                    } else if (user.username === req.body.username && user.password === req.body.password) {
                        sess = req.session;
                        sess.username = req.body.username;
                        console.log(user);
                        res.render('home', { profileData: user });
                    } else {
                        res.render('login', { message: "Username or password wrong!" });
                    }
                });

            });
    }
);

router.get('/home', (req, res) => {
    sess = req.session;
    if (sess.username != null) {
        MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            function(err, db) {
                var dbo = db.db("MelanoQ");
                dbo.collection('nurses').findOne({ username: sess.username }, function(err, user) {

                    res.render('home', { profileData: user });
                });
            });
    } else {
        res.render('login');
    }

});

router.get('/stepform', (req, res) => {
    sess = req.session;
    if (sess.username != null) {
        res.render('multi-step-form');
    } else {
        res.render('login');
    }
});

router.post("/stepform", (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    console.log("Ricevuto una richiesta POST");
    // contenuto della richiesta
    console.log(req.body);

    MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        function(err, db) {
            if (err) throw err;
            var dbo = db.db("MelanoQ");
            var myobj = req.body;
            dbo.collection("users").insertOne(myobj, function(err, records) {
                if (err) throw err;

            });
            _id = myobj._id;
            console.log("Record added as " + _id);
            timestamp = _id.toString().substring(0, 8)
            date = new Date(parseInt(timestamp, 16) * 1000)
            console.log("date " + date);

            sess = req.session;

            dbo.collection('nurses').updateOne({ "username": sess.username }, // query matching , refId should be "ObjectId" type
                { $push: { "questionnaires": { "code_number": myobj.codeNumber, "insert_date": date } } } //single object will be pushed to attachemnts
            );

            db.close();
        });
});

router.post('/find', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("MelanoQ");
        var query = { codeNumber: req.body.codeNumber };

        dbo.collection("users").find(query).toArray(function(err, result) {
            if (err) throw err;

            console.log(result);
            db.close();
            res.render('summary', { result: result[0] });
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});

module.exports = router;