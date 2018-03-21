const htmlToText = require('html-to-text');
const db = require('../fw/mongodb');

let storeManager = {
    collection: null
};

storeManager.setSettings = (database, collection) => {
    return new Promise((resolve, reject) => {
        storeManager.collection = collection;

        db.connect(database, resolve, reject);
    });
};

storeManager.save = (url, time, keyword, title, body) => {
    let text = htmlToText.fromString(body, {
        wordwrap: 130
    });
    db.insert(storeManager.collection, {
        url: url,
        time: time,
        keyword: keyword,
        title: title,
        html: body,
        text: text
    }, (err) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log("Inserted.");
    });
};

storeManager.find = (filter) => {
    return new Promise((resolve, reject) => {
        db.find(storeManager.collection, filter, (err, content) => {
            if(err){
                return reject(err);
            }

            return resolve(content);
        });
    });
};

storeManager.count = () => {
    return new Promise((resolve, reject) => {
        db.count(storeManager.collection, (err, count) => {
            if(err){
                return reject(err);
            }

            return resolve(count);
        });
    });
};

module.exports.save = storeManager.save;
module.exports.find = storeManager.find;
module.exports.count = storeManager.count;
module.exports.setSettings = storeManager.setSettings;