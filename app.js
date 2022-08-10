$(document).ready(() => {
    $('p').each(() => {
        var pdata = $('div p');
        pdata.html( pdata.text().replace(/(^\w+)/,'$1') );
    });
});
