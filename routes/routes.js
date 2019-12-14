const express = require('express');
var dateFormat = require('dateformat');

const router = express.Router();

const { check, validationResult } = require('express-validator');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

const es = require('elasticsearch');
const esClient = new es.Client({
    host: 'localhost:9200',
    log: 'trace'
});

router.get('/', (req, res) => {

    // esClient.indices.create({
    //     index: 'melano_questionnaires'
    // }, function(err, resp, status) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("create", resp);
    //         console.log("Creating Mapping index");
    //         esClient.indices.putMapping({
    //             index: 'melano_questionnaires',
    //             type: '_doc',
    //             includeTypeName: 'true',
    //             body: {
    //                 properties: {
    //                     subject: { type: 'text' },
    //                     codeCountry: { type: 'keyword' },
    //                     codeCenter: { type: 'keyword' },
    //                     codeType: { type: 'keyword' },
    //                     codeNumber: { type: 'integer' },
    //                     surveyDate: { type: 'date', format: 'dd-MMM-yyyy' },
    //                     updatedInDate: { type: 'date', format: 'dd-MMM-yyyy' },
    //                     melanoma_type: { type: 'text' },
    //                     other_melanoma_type: { type: 'text' },
    //                     gender: { type: 'keyword' },
    //                     birthdate: { type: 'date', format: 'dd-MMM-yyyy' },
    //                     weight: { type: 'integer' },
    //                     height: { type: 'integer' },
    //                     ethnicity: { type: 'text' },
    //                     other_ethnicity: { type: 'text' },
    //                     residency: { type: 'text' },
    //                     education: { type: 'text' },
    //                     occupational_status: { type: 'keyword' },
    //                     occupational_history: { type: 'text' },
    //                     skin_response: { type: 'text' },
    //                     skin_tan: { type: 'text' },
    //                     eye_color: { type: 'text' },
    //                     hair_color: { type: 'keyword' },
    //                     freckles: { type: 'keyword' },
    //                     nevi: { type: 'keyword' },
    //                     occupational_sun_exposure: { type: 'keyword' },
    //                     sun_exposure_occupation: { type: 'text' },
    //                     sun_hour_day: { type: 'integer' },
    //                     sun_hour_month: { type: 'integer' },
    //                     sun_hour_year: { type: 'integer' },
    //                     sun_num_years: { type: 'integer' },
    //                     recreational_exposure: { type: 'keyword' },
    //                     recreational_exposure_occupation: { type: 'text' },
    //                     recreational_exposure_hour_day: { type: 'integer' },
    //                     recreational_exposure_hour_month: { type: 'integer' },
    //                     recreational_exposure_hour_year: { type: 'integer' },
    //                     recreational_exposure_num_years: { type: 'integer' },
    //                     exposure_childhood_period: { type: 'integer' },
    //                     exposure_childhood_time: { type: 'integer' },
    //                     exposure_adolescence_period: { type: 'integer' },
    //                     exposure_adolescence_time: { type: 'integer' },
    //                     exposure_adulthood_period: { type: 'integer' },
    //                     exposure_adulthood_time: { type: 'integer' },
    //                     exposure_10_years_before_period: { type: 'integer' },
    //                     exposure_10_years_before_time: { type: 'integer' },
    //                     most_recent_sunburn: { type: 'date', format: 'dd-MMM-yyyy' },
    //                     sunburn_before_18: { type: 'keyword' },
    //                     number_sunburns_before_18: { type: 'integer' },
    //                     sunburn_after_18: { type: 'keyword' },
    //                     number_sunburns_after_18: { type: 'integer' },
    //                     sunburn_melanoma_site: { type: 'keyword' },
    //                     sunburn_last5: { type: 'keyword' },
    //                     number_sunburns_last5: { type: 'integer' },
    //                     childhood_sunscreen_frequency: { type: 'text' },
    //                     childhood_sunscreen_type: { type: 'text' },
    //                     adolescence_sunscreen_frequency: { type: 'text' },
    //                     adolescence_sunscreen_type: { type: 'text' },
    //                     adulthood_sunscreen_frequency: { type: 'text' },
    //                     adulthood_sunscreen_type: { type: 'text' },
    //                     last10_sunscreen_frequency: { type: 'text' },
    //                     last10_sunscreen_type: { type: 'text' },
    //                     hat_frequency: { type: 'text' },
    //                     clothing_frequency: { type: 'text' },
    //                     UVR_frequency: { type: 'text' },
    //                     sunlamp: { type: 'keyword' },
    //                     number_sunlamp: { type: 'integer' },
    //                     first_sunlamp: { type: 'integer' },
    //                     last_sunlamp: { type: 'integer' },
    //                     phototherapy: { type: 'keyword' },
    //                     smoking: { type: 'text' },
    //                     first_smoking: { type: 'integer' },
    //                     smoking_period: { type: 'integer' },
    //                     smoke_frequency: { type: 'text' },
    //                     vitamin_last_year: { type: 'keyword' },
    //                     vitamin_quantity_last_year: { type: 'keyword' },
    //                     betacarotene_frequency: { type: 'keyword' },
    //                     vitamin_A_frequency: { type: 'keyword' },
    //                     vitamin_C_frequency: { type: 'keyword' },
    //                     vitamin_D_frequency: { type: 'keyword' },
    //                     vitamin_E_frequency: { type: 'keyword' },
    //                     multivitamins_frequency: { type: 'keyword' },
    //                     betacarotene_period: { type: 'keyword' },
    //                     vitamin_A_period: { type: 'keyword' },
    //                     vitamin_C_period: { type: 'keyword' },
    //                     vitamin_D_period: { type: 'keyword' },
    //                     vitamin_E_period: { type: 'keyword' },
    //                     multivitamins_period: { type: 'keyword' },
    //                     solar_lentigines_frequency: { type: 'keyword' },
    //                     solar_lentigines_at_melanoma: { type: 'keyword' },
    //                     nevi_count_left_scalp: { type: 'integer' },
    //                     nevi_count_right_scalp: { type: 'integer' },
    //                     nevi_count_left_face: { type: 'integer' },
    //                     nevi_count_right_face: { type: 'integer' },
    //                     nevi_count_left_neck: { type: 'integer' },
    //                     nevi_count_right_neck: { type: 'integer' },
    //                     nevi_count_left_thorax_abdomen: { type: 'integer' },
    //                     nevi_count_right_thorax_abdomen: { type: 'integer' },
    //                     nevi_count_left_back: { type: 'integer' },
    //                     nevi_count_right_back: { type: 'integer' },
    //                     nevi_count_left_deltoid: { type: 'integer' },
    //                     nevi_count_right_deltoid: { type: 'integer' },
    //                     nevi_count_left_gluteus: { type: 'integer' },
    //                     nevi_count_right_gluteus: { type: 'integer' },
    //                     nevi_count_left_palms: { type: 'integer' },
    //                     nevi_count_right_palms: { type: 'integer' },
    //                     nevi_count_left_soles: { type: 'integer' },
    //                     nevi_count_right_soles: { type: 'integer' },
    //                     nevi_2mm_count: { type: 'keyword' },
    //                     atypical_nevi_number: { type: 'integer' }
    //                 }
    //             }
    //         }, (err, resp, status) => {
    //             if (err) {
    //                 console.error(err, status);
    //             } else {
    //                 console.log('Successfully Created Index', status, resp);
    //             }
    //         });
    //     }
    // });


    if (req.session.userid != null) {
        // MongoClient.connect(url, {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true
        //     },
        //     function(err, db) {
        //         var dbo = db.db("MelanoQ");
        //         dbo.collection('nurses').findOne({ username: sess.username }, function(err, user) {

        //             res.render('home', { profileData: user });
        //         });
        //     });
        res.render('multi-step-form');
    } else {
        res.render('login');
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });

    esClient.indices.create({
        index: 'melanoq_nurses'
    }, function(err, resp, status) {});
});

router.post('/login',
    (req, res) => {

        esClient.search({
            index: 'melanoq_nurses',
            size: 1,
            body: {
                query: {
                    term: {
                        username: req.body.username
                    }
                }
            }
        }, function(error, user, status) {
            if (error) {
                console.log('search error: ' + error)
            } else {

                if (user.hits.hits.length == 0) {
                    res.render('login', { message: "Wrong username" });
                } else if (user.hits.hits[0]._source.password === req.body.password) {

                    req.session.userid = user.hits.hits[0]._id;

                    // Collecting complete list of questionnaires
                    esClient.search({
                        index: 'melano_questionnaires'
                    }, function(error, response, status) {

                        questionnaires = response.hits.hits;

                        // Adding creation timestamp to every json
                        questionnaires.forEach(quest => {
                            timestamp = quest._source.timestamp
                            date = new Date(timestamp)
                            var insert_date = dateFormat(date, 'dd mmmm yyyy "at" HH:MM:ss');
                            quest["insert_date"] = insert_date;
                        });

                        res.render('home', { profileData: user.hits.hits[0]._source, result: questionnaires });
                    });
                } else {
                    res.render('login', { message: "Password wrong!" });
                }
            }
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

                // Collecting user info
                dbo.collection('nurses').findOne({ username: sess.username }, function(err, user) {

                    // Collecting complete list of questionnaires
                    dbo.collection('questionnaires').find({}, { projection: { codeNumber: 1, surveyDate: 1, _id: 1 } }).toArray(function(err, result) {

                        // Adding creation timestamp to every json
                        result.forEach(quest => {
                            timestamp = quest._id.toString().substring(0, 8)
                            date = new Date(parseInt(timestamp, 16) * 1000)
                            var insert_date = dateFormat(date, 'dd mmmm yyyy "at" HH:MM:ss');
                            quest["insert_date"] = insert_date;
                        });

                        res.render('home', { profileData: user, result: result });
                    });
                });


            });
    } else {
        res.render('login');
    }

});

router.get('/stepform', (req, res) => {

    sess = req.session;
    if (sess.userid != null) {
        res.render('multi-step-form');
    } else {
        res.render('login');
    }
});

router.post("/stepform", (req, res) => {


    console.log("Ricevuto una richiesta POST");

    esClient.index({
        index: 'melano_questionnaires',
        type: '_doc',
        pipeline: 'timestamp',
        body: req.body
    }, function(err, resp, status) {

        _id = resp._id;
        console.log("Record added as " + _id);

        var current_timestamp = dateFormat(new Date(), 'dd mmmm yyyy "at" HH:MM:ss');

        esClient.update({
            index: 'melanoq_nurses',
            type: "_doc",
            id: req.session.userid,
            body: {
                script: {
                    inline: "ctx._source.questionnaires.add(params.quest)",
                    params: {
                        quest: {
                            code_number: req.body.codeCountry + ", " + req.body.codeCenter + ", " + req.body.codeType + " - " + req.body.codeNumber,
                            insert_date: current_timestamp
                        }
                    }
                }
            }
        }, function(error, response, status) {
            if (error) {
                console.log('search error: ' + error)
            }
        });

        esClient.search({
            index: 'melano_questionnaires',
            size: 1,
            body: {
                query: {
                    bool: {
                        must: [{
                                term: {
                                    codeCountry: req.body.codeCountry
                                }
                            },
                            {
                                term: {
                                    codeCenter: req.body.codeCenter
                                }
                            },
                            {
                                term: {
                                    codeType: req.body.codeType
                                }
                            },
                            {
                                term: {
                                    codeNumber: req.body.codeNumber
                                }
                            }
                        ]
                    }
                }
            }
        }, function(error, questionnaire, status) {
            res.render('summary', { result: questionnaire.hits.hits[0]._source });
        });
    });

    // MongoClient.connect(url, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     },
    //     function(err, db) {
    //         if (err) throw err;
    //         var dbo = db.db("MelanoQ");
    //         var myobj = req.body;
    //         dbo.collection("questionnaires").insertOne(myobj, function(err, records) {
    //             if (err) throw err;

    //         });
    //         _id = myobj._id;
    //         console.log("Record added as " + _id);
    //         timestamp = _id.toString().substring(0, 8)
    //         date = new Date(parseInt(timestamp, 16) * 1000)
    //         var insert_date = dateFormat(date, 'dd mmmm yyyy "at" HH:MM:ss');
    //         console.log("date " + insert_date);

    //         sess = req.session;

    //         dbo.collection('nurses').updateOne({ "username": sess.username }, // query matching , refId should be "ObjectId" type
    //             { $push: { "questionnaires": { "code_number": myobj.codeNumber, "insert_date": insert_date } } } //single object will be pushed to attachemnts
    //         );

    //         var query = { codeNumber: myobj.codeNumber };

    //         dbo.collection("questionnaires").find(query).toArray(function(err, result) {
    //             if (err) throw err;

    //             db.close();
    //             res.render('summary', { result: result[0] });
    //         });

    //         db.close();
    //     });
});

router.post('/find', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("MelanoQ");
        console.log(req.body.codeNumber);
        var query = { codeNumber: req.body.codeNumber };

        dbo.collection("questionnaires").find(query).toArray(function(err, result) {
            if (err) throw err;

            console.log(result);
            db.close();
            res.render('summary', { result: result[0] });
        });
    });
});

router.get('/statistics', (req, res) => {
    res.render('statistics', { title: 'Statistics' });
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