// const { default: Swal } = require("sweetalert2");
import { default as Swal } from "sweetalert2";

let elementId;
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

    $("#sort").click(function () {
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
let modalId;

const orderAscend = (data) => {
    let ascData = data.sort((a, b) => ('' + a.name.official).localeCompare(b.name.official));
    for (let i = 0; i < ascData.length; i++) {
        idCountry = ascData[i].name.common;
        Object.prototype.toString(idCountry);
        idCountryCleaned = idCountry.replace(/\s/g, '_');
        modalId = ascData[i].name.common;
        officialName = ascData[i].name.official;
        region = ascData[i].region;
        population = ascData[i].population;
        imgPath = ascData[i].flags.png

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

        $("#countries").append($(`<tr id=${idCountryCleaned} onClic=${getId()}>`)
        .append($(`<td id=${idCountryCleaned}> ${officialName} </td>`))
        .append($(`<td id=${idCountryCleaned}> ${capital} </td>`))
        .append($(`<td id=${idCountryCleaned}> ${region} </td>`))
        .append($(`<td id=${idCountryCleaned}> ${firstLanguage} </td>`))
        .append($(`<td id=${idCountryCleaned}> ${population} </td>`))
        .append($(`<td id=${idCountryCleaned}><img src=${imgPath} class='img-fluid w-50'></td>`))
        );
    }
    asc = true;
}

const orderDescend = (data) => {
    let desData = data.sort((a, b) => ('' + b.name.official).localeCompare(a.name.official));
    let idCountry;
    for (let i = 0; i < desData.length; i++) {
        idCountry = desData[i].name.common;
        Object.prototype.toString(idCountry);
        idCountryCleaned = idCountry.replace(/\s/g, '_');
        modalId = desData[i].name.common;
        officialName = desData[i].name.official;
        region = desData[i].region;
        population = desData[i].population;
        imgPath = desData[i].flags.png
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

        $("#countries").append($(`<tr id=${idCountryCleaned} onClic=${getId()}>`)
            .append($(`<td id=${idCountryCleaned}> ${officialName} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${capital} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${region} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${firstLanguage} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${population} </td>`))
            .append($(`<td id=${idCountryCleaned}><img src=${imgPath} class='img-fluid w-50'></td>`))
        );
    }
    asc = false;
}

const modal = (elementId) => {
    Object.prototype.toString(elementId)
    if (elementId !== '') {
        $.ajax({
            type: "GET",
            url: `https://en.wikipedia.org/api/rest_v1/page/summary/${elementId}`,
            dataType: "json",
            data: {
                country: "country"
            },
            success: function (data) {
                html = data.extract_html;
                title = data.title;
                flag = data.thumbnail.source;

                Swal.fire({
                    title: title,
                    html: html,
                    iconHtml: "<img src=" + flag + " width=300 height=130>",
                    confirmButtonText: 'Back'
                });
            }
        });
    } else {

    }
}

const getId = (e) => {
    $('tr').click((e) => {
        elementId = e.target.id;
        modal(elementId);
    })
}
