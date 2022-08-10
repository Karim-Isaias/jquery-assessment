$(document).ready(() => {

});

const moveButton = (elem) => {
    if( $(elem).parent().attr("id") == "nonSelected" ){
        $(elem).detach().appendTo('#selected');
    }
    else{
        $(elem).detach().appendTo('#nonSelected'); 
    }
}
