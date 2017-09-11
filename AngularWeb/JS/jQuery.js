$(document).ready(function () {
    $('input[name=releaseDate]').on('keyup mouseup', function (event) {
        var date = $(this).val();
        var format = /^(19[7-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        if (format.test(date) === false) {
            $('#vali').text("0000-00-00 식으로 입력해 주세요. 1970-01-01부터 2099-12-31일까지 가능합니다.");
        }
    });
})

