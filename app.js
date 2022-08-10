$(document).ready(() => {
    let test = {
        id: "div",
        class: "divclass",
        css: {
            "color": "Green"
        }
    };
    $('#addDiv').on('click', () => {
        var $div = $("<div>", test);
        $div.html("New Division");
        $("body").append($div);
    })
});
