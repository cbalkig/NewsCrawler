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
                $('#results tbody').empty();
                for(let r of data){
                    let $row = $('<tr data-id="' + r._id + '"><td>' + r._id+ '</td><td>' + r.title+ '</td><td>' + r.time+ '</td><td>' + r.url+ '</td><td><a href="#" data-toggle="modal" data-target="#detailModal">Detail</a></td></tr>');
                    $('#results tbody').append($row);
                }
                $('#status span').html('Completed successfully.<br> Result count : <strong>' + data.length + '</strong>');
                $('#status span').css('color', 'green');
                $('#status').show();
                $.unblockUI();
                $('#results').show();

                let links = $('#results table tbody a');
                for(let l of links){
                    $(l).click(() => {
                        let _id = $(l).parent().parent().data('id');
                        if(_id) {
                            let data = {};
                            data._id = _id;
                            $.ajax({
                                type: 'GET',
                                data: data,
                                contentType: 'application/json',
                                url: '/crawlerGet',
                                success: function (data) {
                                    $('#detailModalLabel').text(data.title);
                                    $('#detailModal .modal-body').html('<strong>ID : </strong>' + data._id + '<hr><strong>URL : </strong>' + data.url + '<hr><strong>Keyword : </strong>' + data.keyword + '<hr><strong>Time : </strong>' + data.time + '<hr>' + data.text);
                                },
                                error: function (response, error, message) {
                                    $('#detailModalLabel').text('Error : ' + error);
                                    $('#detailModal .modal-body').text(message);
                                }
                            });
                        }
                    });
                }
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