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
    //                 "properties": {
    //                     "subject": {
    //                         "type": "keyword"
    //                     },
    //                     "code_country": {
    //                         "type": "keyword"
    //                     },
    //                     "code_center": {
    //                         "type": "keyword"
    //                     },
    //                     "code_type": {
    //                         "type": "keyword"
    //                     },
    //                     "code_number": {
    //                         "type": "keyword"
    //                     },          
    //                     "survey_date": {
    //                         "type": 'date', 
    //                         format: 'dd-MMM-yyyy'
    //                     },
    //                     "last_update": {
    //                         "type": 'date', 
    //                         format: 'dd-MMM-yyyy'
    //                     },
    //                     "melanoma_type": {
    //                         "type": "keyword"
    //                     },
    //                     "other_melanoma_type": {
    //                         "type": "text"
    //                     },
    //                     "gender": {
    //                         "type": "keyword"
    //                     },
    //                     "birthdate": {
    //                         "type": 'date', 
    //                         format: 'dd-MMM-yyyy'
    //                     },
    //                     "weight": {
    //                         "type": "integer"
    //                     },
    //                     "height": {
    //                         "type": "integer",
    //                     },
    //                     "ethnicity": {
    //                         "type": "keyword"
    //                     },
    //                     "other_ethnicity": {
    //                         "type": "text"
    //                     },
    //                     "residency": {
    //                         "type": "text"
    //                     },
    //                     "education": {
    //                         "type": "keyword"
    //                     },
    //                     "occupational_status": {
    //                         "type": "keyword"
    //                     },
    //                     "skin_response": {
    //                         "type": "keyword"
    //                     },
    //                     "skin_tan": {
    //                         "type": "keyword"
    //                     },
    //                     "eye_color": {
    //                         "type": "keyword"
    //                     },
    //                     "hair_color": {
    //                         "type": "keyword"
    //                     },
    //                     "freckles": {
    //                         "type": "keyword"
    //                     },
    //                     "nevi": {
    //                         "type": "keyword"
    //                     },
    //                     "ultraviolet": {
    //                         "properties": {
    //                             "occupational_sun_exposure": {
    //                                 "properties": {
    //                                     "presence": {
    //                                         "type": "keyword"
    //                                     },
    //                                     "occupation_name": {
    //                                         "type": "text"
    //                                     },
    //                                     "hours_day": {
    //                                         "type": "integer"
    //                                     },
    //                                     "hours_month": {
    //                                         "type": "integer"
    //                                     },
    //                                     "hours_year": {
    //                                         "type": "integer"
    //                                     },
    //                                     "number_of_years": {
    //                                         "type": "integer"
    //                                     }
    //                                 }
    //                             },
    //                             "recreational_sun_exposure": {
    //                                 "properties": {
    //                                     "presence": {
    //                                         "type": "keyword"
    //                                     },
    //                                     "occupation_name": {
    //                                         "type": "text"
    //                                     },
    //                                     "hours_day": {
    //                                         "type": "integer"
    //                                     },
    //                                     "hours_month": {
    //                                         "type": "integer"
    //                                     },
    //                                     "hours_year": {
    //                                         "type": "integer"
    //                                     },
    //                                     "number_of_years": {
    //                                         "type": "integer"
    //                                     }
    //                                 }
    //                             },
    //                             "exposure_childhood": {
    //                                 "properties": {
    //                                     "period": {
    //                                         "type": "text"
    //                                     },
    //                                     "time": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "exposure_adolescence": {
    //                                 "properties": {
    //                                     "period": {
    //                                         "type": "text"
    //                                     },
    //                                     "time": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "exposure_adulthood": {
    //                                 "properties": {
    //                                     "period": {
    //                                         "type": "text"
    //                                     },
    //                                     "time": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "exposure_previous_10_years": {
    //                                 "properties": {
    //                                     "period": {
    //                                         "type": "text"
    //                                     },
    //                                     "time": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "most_recent_sunburn": {
    //                                 "type": 'date', 
    //                                 "format": 'dd-MMM-yyyy'
    //                             },
    //                             "sunburn_before_18": {
    //                                 "properties": {
    //                                     "number": {
    //                                         "type": "text"
    //                                     },
    //                                     "presence": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "sunburn_after_18": {
    //                                 "properties": {
    //                                     "number": {
    //                                         "type": "text"
    //                                     },
    //                                     "presence": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "sunburn_at_melanoma_site": {
    //                                 "type": "text"
    //                             },
    //                             "sunburn_last_5_years": {
    //                                 "properties": {
    //                                     "number": {
    //                                         "type": "text"
    //                                     },
    //                                     "presence": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "childhood_sunscreen": {
    //                                 "properties": {
    //                                     "frequency": {
    //                                         "type": "text"
    //                                     },
    //                                     "type": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "adolescence_sunscreen": {
    //                                 "properties": {
    //                                     "frequency": {
    //                                         "type": "text"
    //                                     },
    //                                     "type": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "adulthood_sunscreen": {
    //                                 "properties": {
    //                                     "frequency": {
    //                                         "type": "text"
    //                                     },
    //                                     "type": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "last_10_years_sunscreen": {
    //                                 "properties": {
    //                                     "frequency": {
    //                                         "type": "text"
    //                                     },
    //                                     "type": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "hat_frequency": {
    //                                 "type": "text"
    //                             },
    //                             "clothing": {
    //                                 "type": "text"
    //                             },
    //                             "peak_UVR_hours": {
    //                                 "type": "text"
    //                             },
    //                             "sunlamp": {
    //                                 "properties": {
    //                                     "presence": {
    //                                         "type": "text"
    //                                     },
    //                                     "number_of_sessions": {
    //                                         "type": "text"
    //                                     },
    //                                     "age_of_first_sunlamp": {
    //                                         "type": "text"
    //                                     },
    //                                     "age_of_last_sunlamp": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "phototherapy": {
    //                                 "type": "text"
    //                             }  
    //                         }
    //                     },
    //                     "lifestyle": {
    //                         "properties": {
    //                             "smoking": {
    //                                 "properties": {
    //                                     "age_of_first_smoking": {
    //                                         "type": "integer"
    //                                     },
    //                                     "smoke_quantity": {
    //                                         "type": "text"
    //                                     },
    //                                     "smoking_period": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "vitamins_last_year": {
    //                                 "properties": {
    //                                     "presence": {
    //                                         "type": "keyword"
    //                                     },
    //                                     "quantity": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "betacarotene_frequency": {
    //                                 "type": "keyword"
    //                             },
    //                             "betacarotene_period": {
    //                                 "type": "keyword"
    //                             },
    //                             "multivitamins_frequency": {
    //                                 "type": "keyword"
    //                             },
    //                             "multivitamins_period": {
    //                                 "type": "keyword"
    //                             },                                
    //                             "vitamin_A_frequency": {
    //                                 "type": "keyword"
    //                             },
    //                             "vitamin_A_period": {
    //                                 "type": "keyword"
    //                             },
    //                             "vitamin_C_frequency": {
    //                                 "type": "keyword"
    //                             },
    //                             "vitamin_C_period": {
    //                                 "type": "keyword"
    //                             },
    //                             "vitamin_D_frequency": {
    //                                 "type": "keyword"
    //                             },
    //                             "vitamin_D_period": {
    //                                 "type": "keyword"
    //                             },
    //                             "vitamin_E_frequency": {
    //                                 "type": "keyword"
    //                             },
    //                             "vitamin_E_period": {
    //                                 "type": "keyword"
    //                             }
    //                         }
    //                     },
    //                     "clinical_examination": {
    //                         "properties": {
    //                             "solar_lentigines_frequency": {
    //                                 "type": "keyword"
    //                             },
    //                             "solar_lentigines_at_melanoma": {
    //                                 "type": "keyword"
    //                             },
    //                             "nevi_count": {
    //                                 "properties": {
    //                                     "left_back": {
    //                                         "type": "integer"
    //                                     },
    //                                     "left_deltoid": {
    //                                         "type": "integer"
    //                                     },
    //                                     "left_face": {
    //                                         "type": "integer"
    //                                     },
    //                                     "left_gluteus": {
    //                                         "type": "integer"
    //                                     },
    //                                     "left_neck": {
    //                                         "type": "integer"
    //                                     },
    //                                     "left_palms": {
    //                                         "type": "integer"
    //                                     },
    //                                     "left_scalp": {
    //                                         "type": "integer"
    //                                     },
    //                                     "left_soles": {
    //                                         "type": "integer"
    //                                     },
    //                                     "left_thorax_abdomen": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_back": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_deltoid": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_face": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_gluteus": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_neck": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_palms": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_scalp": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_soles": {
    //                                         "type": "integer"
    //                                     },
    //                                     "right_thorax_abdomen": {
    //                                         "type": "integer"
    //                                     }
    //                                 }
    //                             },
    //                             "nevi_2mm_count": {
    //                                 "type": "integer"
    //                             },
    //                             "atypical_nevi_count": {
    //                                 "type": "integer"
    //                             },
    //                             "atypical_nevi_at_melanoma": {
    //                                 "type": "integer"
    //                             },
    //                             "congenital_nevi": {
    //                                 "properties": {
    //                                     "giant_sized": {
    //                                         "properties": {
    //                                             "sites": {
    //                                                 "type": "text"
    //                                             },
    //                                             "presence": {
    //                                                 "type": "keyword"
    //                                             }
    //                                         }
    //                                     },
    //                                     "large_sized": {
    //                                         "properties": {
    //                                             "sites": {
    //                                                 "type": "text"
    //                                             },
    //                                             "presence": {
    //                                                 "type": "keyword"
    //                                             }
    //                                         }
    //                                     },
    //                                     "medium_sized": {
    //                                         "properties": {
    //                                             "sites": {
    //                                                 "type": "text"
    //                                             },
    //                                             "presence": {
    //                                                 "type": "keyword"
    //                                             }
    //                                         }
    //                                     }
    //                                 }
    //                             },
    //                             "blue_nevi": {
    //                                 "properties": {
    //                                     "medium_sized": {
    //                                         "properties": {
    //                                             "presence": {
    //                                                 "type": "keyword"
    //                                             },
    //                                             "count": {
    //                                                 "type": "integer"
    //                                             }
    //                                         }
    //                                     }
    //                                 }
    //                             },
    //                             "actinic_keratoses": {
    //                                 "properties": {                                        
    //                                     "presence": {
    //                                         "type": "keyword"
    //                                     },
    //                                     "distribution": {
    //                                         "type": "keyword"
    //                                     },
    //                                     "site": {
    //                                         "type": "keyword"
    //                                     },
    //                                 }
    //                             },
    //                             "BCC": {
    //                                 "properties": {
    //                                     "count": {
    //                                         "type": "text"
    //                                     },
    //                                     "sites": {
    //                                         "type": "text"
    //                                     },
    //                                     "presence": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "invasive_SCC": {
    //                                 "properties": {
    //                                     "count": {
    //                                         "type": "text"
    //                                     },
    //                                     "sites": {
    //                                         "type": "text"
    //                                     },
    //                                     "presence": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             },
    //                             "insitu_SCC": {
    //                                 "properties": {
    //                                     "count": {
    //                                         "type": "text"
    //                                     },
    //                                     "sites": {
    //                                         "type": "text"
    //                                     },
    //                                     "presence": {
    //                                         "type": "text"
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     },
    //                     "timestamp": {
    //                         "type": "date"
    //                     },
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

    if (req.session.userid != null) {

        esClient.get({
            index: 'melanoq_nurses',
            type: '_doc',
            id: req.session.userid
        }, function(error, user, response) {
            if (error) {
                console.log('search error: ' + error)
            } else {
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

                    res.render('home', { profileData: user._source, result: questionnaires });
                });
            }
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
                            code_number: req.body.code_number,
                            insert_date: current_timestamp
                        }
                    }
                }
            }
        }, function(error, response, status) {
            if (error) {
                console.log('search error: ' + error)
            }

            esClient.search({
                index: 'melano_questionnaires',
                size: 1,
                body: {
                    query: {
                        bool: {
                            must: [{
                                    term: {
                                        code_country: req.body.code_country
                                    }
                                },
                                {
                                    term: {
                                        code_center: req.body.code_center
                                    }
                                },
                                {
                                    term: {
                                        code_type: req.body.code_type
                                    }
                                },
                                {
                                    term: {
                                        code_number: req.body.code_number
                                    }
                                }
                            ]
                        }
                    }
                }
            }, function(error, questionnaire, status) {
                if (error) {
                    console.log('search error: ' + error)
                }
                console.log("search result: ");
                console.log(questionnaire);
                res.render('summary', { result: questionnaire.hits.hits[0]._source });
            });
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
    esClient.get({
        index: 'melano_questionnaires',
        type: '_doc',
        id: req.body.codeNumber
    }, function(error, response) {
        res.render('summary', { result: response.hits.hits[0]._source });
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