const crawlManager = require("./managers/crawl_manager");
const storeManager = require("./managers/store_manager");

let store = (urlList, keywordList, startDate, endDate, callback) => {
    for (let url of urlList) {
        crawlManager.getContent(url, keywordList, startDate, endDate, storeManager.save, callback);
    }
};

module.exports.store = store;