$(document).ready(() => {
    $('#removeOptions').on('click', () => {
        $('#myColor').empty().append('<option selected="selected" value="test">White</option>');
    })
});
