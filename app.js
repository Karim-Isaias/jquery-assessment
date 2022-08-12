$(document).ready(() => {
    $('p').each(function () {

        var text_words = $(this).text().split(' ');

        $(this).empty().html(function () {

            for (i = 0; i < text_words.length; i++) {
                if (i === 0) {
                    $(this).append('<span>' + text_words[i] + '</span>');
                } else {
                    $(this).append(' <span>' + text_words[i] + '</span>');
                }
            }

        });

    });
});
