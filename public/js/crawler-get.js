(function($) {
    "use strict";

    $('#status').hide();
    $('#results').hide();

    $('#filter').val('Atatürk');

    $('#startDate').val('21/03/2018');
    $('#endDate').val('21/03/2018');

    $('#search').click(function(){
        $.blockUI({ message: '<h3>Just a moment...</h3>' });

        let filter = $('#filter').val();
        let startDate = $('#startDate').val();
        let endDate = $('#endDate').val();

        let data = {};
        data.filter = filter;
        data.startDate = startDate;
        data.endDate = endDate;

        $.ajax({
            type: 'GET',
            data: data,
            contentType: 'application/json',
            url: '/crawlerSearch',
            success: function(data) {
                for(let r of data){
                    let $row = $('<tr><td>' + r._id+ '</td><td>' + r.title+ '</td><td>' + r.keyword+ '</td><td>' + r.text+ '</td><td>' + r.time+ '</td><td>' + r.url+ '</td></tr>');
                    $('#results tbody').append($row);
                }
                $('#status span').html('Completed successfully.');
                $('#status span').css('color', 'green');
                $('#status').show();
                $.unblockUI();
                $('#results').show();
            },
            error: function(response, error, message){
                $('#status span').html('Error<br>' + response.status + '<br>' + error + '<br>' + message);
                $('#status span').css('color', 'red');
                $('#status').show();
                $.unblockUI();
                $('#results').hide();
            }
        });
    });
})(jQuery);