$(document).ready(() => {
    colors = { "color1": "Red", "color2": "Green", 'color3': "Blue" };

    $.each(colors, function(key, value) {
        $('#divSelect').append($("<option/>", {
            value: key,
            text: value
        }));
    });
});
