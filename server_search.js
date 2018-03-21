const storeManager = require("./managers/store_manager");

let TIME_REGEX = /(\d{2})\/(\d{2})\/(\d{4})/;

let get = (_id, successCallback, failureCallback) => {
    storeManager.get(_id).then((content) => {
        successCallback(content);
    }).catch(failureCallback);
};

let search = (filter, startDate, endDate, successCallback, failureCallback) => {
    let startTime = new Date(startDate.replace(TIME_REGEX,'$3-$2-$1'));
    let endTime = new Date(endDate.replace(TIME_REGEX,'$3-$2-$1'));

    storeManager.find({
        text: new RegExp(filter, 'i'),
        time: {
            "$gte" : startTime,
            "$lte" : endTime
        }
    }).then((content) => {
        successCallback(content);
    }).catch(failureCallback);
};

module.exports.get = get;
module.exports.search = search;