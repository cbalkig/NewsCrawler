(function($) {
    "use strict";

    $('#status').hide();

    let urlList = new Array();
    urlList.push('http://www.bbc.com');
    urlList.push('http://www.hurriyet.com.tr');
    urlList.push('https://tr.sputniknews.com');
    urlList.push('https://onedio.com');
    urlList.push('https://www.nytimes.com/');

    let urlListText = '';
    for(let url of urlList){
        urlListText += url;
        urlListText += '\n';
    }
    $('#urlList').text(urlListText);

    let keywordList = new Array();
    keywordList.push('ekonomi');
    keywordList.push('politika');
    keywordList.push('gündem');
    keywordList.push('economy');
    keywordList.push('politics');

    let keywordListText = '';
    for(let keyword of keywordList){
        keywordListText += keyword;
        keywordListText += '\n';
    }
    $('#keywordList').text(keywordListText);

    $('#startDate').val('01/03/2018');
    $('#endDate').val('23/03/2018');

    $('#save').click(function(){
        $.blockUI({ message: '<h3>Just a moment...</h3>' });

        let urlList = $('#urlList').val().split('\n');
        let keywordList = $('#keywordList').val().split('\n');
        let startDate = $('#startDate').val();
        let endDate = $('#endDate').val();

        let data = {};
        data.urls = urlList;
        data.keywords = keywordList;
        data.startDate = startDate;
        data.endDate = endDate;

        $.ajax({
            type: 'GET',
            data: data,
            contentType: 'application/json',
            url: '/crawlerSave',
            success: function(data) {
                $('#status span').html('Completed successfully.');
                $('#status span').css('color', 'green');
                $('#status').show();
                $.unblockUI();
            },
            error: function(response, error, message){
                $('#status span').html('Error<br>' + response.status + '<br>' + error + '<br>' + message);
                $('#status span').css('color', 'red');
                $('#status').show();
                $.unblockUI();
            }
        });
    });
})(jQuery);