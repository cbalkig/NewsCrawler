const storeManager = require("./managers/store_manager");

let get = (filter, startDate, endDate, successCallback, failureCallback) => {
    storeManager.find({
        text: new RegExp(filter, 'i')
    }, storeManager.save).then((content) => {
        successCallback(content);
    }).catch(failureCallback);
};

module.exports.get = get;