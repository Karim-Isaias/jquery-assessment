$(document).ready(function () {
    let dataValues;
    $.ajax({
        type: "GET",
        url: "https://restcountries.com/v3.1/all",
        dataType: "json",
        data: {
            country: "country"
        },
        success: function (data) {
            dataValues = data;
            orderAscend(data);
        }
    });

    $("#sort").click(function(){
        if (asc) {
            $("#countries").empty()
            orderDescend(dataValues);
        } else {
            $("#countries").empty()
            orderAscend(dataValues);
        }
    })
});

let asc = true;

const orderAscend = (data) => {
    let ascData = data.sort((a, b) => ('' + a.name.official).localeCompare(b.name.official));
    for (let i = 0; i < ascData.length; i++) {
        let firstLanguage, capital;
        if (ascData[i].languages === undefined) {
            firstLanguage = 'No language to display';
        } else {
            firstLanguage = Object.values(ascData[i].languages)[0]
        }
        if (ascData[i].capital === undefined) {
            capital = 'No capital';
        } else {
            capital = Object.values(ascData[i].capital)[0]
        }
        $("#countries").append($("<tr onClic=()>")
            .append($("<td>" + ascData[i].name.official + "</td>"))
            .append($("<td>" + capital + "</td>"))
            .append($("<td>" + ascData[i].region + "</td>"))
            .append($("<td>" + firstLanguage + "</td>"))
            .append($("<td>" + ascData[i].population + "</td>"))
            .append($("<td><img src=" + ascData[i].flags.png + "></td>"))
        );
    }
    asc = true;
}

const orderDescend = (data) => {
    let desData = data.sort((a, b) => ('' + b.name.official).localeCompare(a.name.official));
    for (let i = 0; i < desData.length; i++) {
        let firstLanguage, capital;
        if (desData[i].languages === undefined) {
            firstLanguage = 'No language to display';
        } else {
            firstLanguage = Object.values(desData[i].languages)[0]
        }
        if (desData[i].capital === undefined) {
            capital = 'No capital';
        } else {
            capital = Object.values(desData[i].capital)[0]
        }
        $("#countries").append($("<tr onClic=()>")
            .append($("<td>" + desData[i].name.official + "</td>"))
            .append($("<td>" + capital + "</td>"))
            .append($("<td>" + desData[i].region + "</td>"))
            .append($("<td>" + firstLanguage + "</td>"))
            .append($("<td>" + desData[i].population + "</td>"))
            .append($("<td><img src=" + desData[i].flags.png + "></td>"))
        );
    }
    asc = false;
}