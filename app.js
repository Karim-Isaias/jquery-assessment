$(document).ready(() => {
    $('#toggle').on('click', () => {
        if($('#submit').is(':disabled')){
            $('#submit').removeAttr('disabled');
        } else {
            $('#submit').attr('disabled', 'disabled');
        }
    }); 
});
