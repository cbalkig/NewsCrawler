const Crawler = require("crawler");
const isodate = require("isodate");

let crawlManager = {
    CLEAN_URL_REGEX : /((http|https):\/\/[a-zAZ._]*)\/.*/g,
    TIME_REGEX: /(\d{2})\/(\d{2})\/(\d{4})/
};

crawlManager.searchForWord = ($, word) => {
    var bodyText = $('html > body').text();
    if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        return true;
    }
    return false;
};

crawlManager.getContent = (url, keywordList, startDate, endDate, crawlCallback, callback) => {
    let startTime = new Date(startDate.replace(crawlManager.TIME_REGEX,'$3-$2-$1'));
    let endTime = new Date(endDate.replace(crawlManager.TIME_REGEX,'$3-$2-$1'));

    let c = new Crawler({
        maxConnections : 10,
        skipDuplicates: true,
        skipEventRequest: false,
        callback : (error, res, done) => {
            if(error){
                console.error(error);
            } else{
                let $ = res.$;

                try {
                    $('a').each((i, elem) => {
                        let href = $(elem).attr('href');
                        let childUrl = url + href;
                        if (childUrl != url) {
                            c.queue(childUrl);
                        }
                    });

                    $('time').each((i, elem) => {
                        let timeText = elem.attribs['datetime'];
                        if(timeText){
                            let time = isodate(timeText);

                            if(time >= startTime && time <= endTime) {
                                for (let keyword of keywordList) {
                                    if (crawlManager.searchForWord($, keyword)) {
                                        crawlCallback(res.request.uri.href, time, keyword, $("title").text(), res.body);
                                        break;
                                    }
                                }
                            }
                        }
                    });
                }
                catch(err){
                    console.error(err);
                }
            }
            done();
        }
    });

    if(url && url.length > 0) {
        c.queue(url);
    }
    c.on('drain', () => {
        callback();
    });
};

module.exports.getContent = crawlManager.getContent;