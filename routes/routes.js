const express = require('express');
var dateFormat = require('dateformat');

const router = express.Router();

const { check, validationResult } = require('express-validator');

const es = require('elasticsearch');
const esClient = new es.Client({
    host: 'localhost:9200',
    log: 'trace'
});

router.get('/', (req, res) => {
    res.render('login');
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

            esClient.get({
                index: 'melano_questionnaires',
                type: '_doc',
                id: resp._id
            }, function(error, quest, response) {
                if (error) {
                    console.log('search error: ' + error)
                }

                res.render('summary', { result: quest._source });
            });
        });
    });
});

router.post('/find', (req, res) => {
    esClient.search({
        index: 'melano_questionnaires',
        size: 1,
        body: {
            query: {
                term: {
                    code_number: req.body.codeNumber
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