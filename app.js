$(document).ready(() => {
    let maxLength = 15;
    $('#textarea').on('keyup', ()  => {
        let textlen = maxLength - $('#textarea').val().length;
        $('#rchars').text(textlen);
    });
});
