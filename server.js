const express = require('express');
const path = require('path');
const app = express();
const storeService = require('./server_store');
const searchService = require('./server_search');
const storeManager = require("./managers/store_manager");

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/save', function (req, res) {
    res.redirect('/save.html');
});

app.get('/get', function (req, res) {
    res.redirect('/get.html');
});

app.get('/crawlerSave', function (req, res) {
    storeService.store(req.query.urls, req.query.keywords, req.query.startDate, req.query.endDate, (err) => {
        if(err){
            console.error(err.stack)
            res.status(500).send(JSON.stringify(err))
        }
        else{
            res.send(200);
        }
    });
});

app.get('/crawlerSearch', function (req, res) {
    searchService.search(req.query.filter, req.query.startDate, req.query.endDate, (content) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(content));
    }, (err) => {
        console.error(err.stack)
        res.status(500).send(JSON.stringify(err))
    });
});

app.get('/crawlerGet', function (req, res) {
    searchService.get(req.query._id, (content) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(content));
    }, (err) => {
        console.error(err.stack)
        res.status(500).send(JSON.stringify(err))
    });
});

storeManager.setSettings("local","news_crawler").then(() => {
    app.listen(9001, () => console.log('App listening on port 9001!'))
}).catch((err) => {
    console.error('Server init error', err);
});

