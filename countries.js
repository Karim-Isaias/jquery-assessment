let asc = true;
let supLimit = 240;
let infLimit = 0;
let position = 0;
$(document).ready(function () {
    let dataValues;
    $.ajax({
        type: "GET",
        url: "countries.json",
        dataType: "json",
        data: {
            country: "country"
        },
        success: function (data) {
            dataValues = data;
            orderAscend(data);
            // contentFilter(data);
            $('#textFilter').on('keyup', () => {
                if ($('#textFilter').val() !== '' && $('#textFilter').val().length >= 3) {
                    $("#countries").empty();
                    contentFilter(data);
                    console.log('Filtrado');
                } else {
                    $("#countries").empty();
                    orderAscend(data);
                    console.log('No Filtrado');
                }
            })

            // filter(data);
        }
    });

    $("#sort").on('click', () => {
        $("#countries").empty();
        if (asc) {
            position = supLimit;
            asc = false;
            orderDescend(dataValues);
            $("#sort").html('Sort Asc');
        } else if (!asc) {
            position = infLimit;
            asc = true;
            orderAscend(dataValues);
            $("#sort").html('Sort Desc');
        }
    });

    $("#back").on('click', () => {
        $("#countries").empty();
        if (asc) {
            if (position === 0) {
                alert('This is the first page');
                orderAscend(dataValues);
            } else {
                position -= 10;
                infLimit = position;
                supLimit += 10;
                orderAscend(dataValues);
            }
        } else {
            if (position === 240) {
                alert('This is the first page');
                orderDescend(dataValues);
            } else {
                position += 10;
                supLimit = position;
                infLimit -= 10;
                orderDescend(dataValues);
            }
        }
    });

    $("#next").on('click', () => {
        $("#countries").empty();
        if (asc) {
            if (position === 240) {
                alert('This is the last page');
                orderAscend(dataValues);
            } else {
                position += 10;
                infLimit = position;
                supLimit -= 10;
                orderAscend(dataValues);
            }
        } else {
            if (position === 0) {
                alert('This is the last page');
                orderDescend(dataValues);
            } else {
                position -= 10;
                supLimit = position;
                infLimit += 10;
                orderDescend(dataValues);
            }
        }
    });

    // $('#filterText').on('keyup', () => {
    //     $('#countries').filter('tr', () => {

    //     })
    // });

    // oTable = $('#table-countries').DataTable(); 
    // $('#filterText').keyup(function () {
    //     oTable.search($(this).val()).draw();
    // })

});

const orderAscend = (data) => {
    // $('#filterText').on('keyup', () => {
    //     let filter = $('#filterText').val().toLowerCase();
    //     console.log(filter);
    //     $('#countries').filter($(data), () => {
    //         $(this).toggle($(this).text().toLowerCase().indexOf(filter) > -1)
    //     });
    // });
    let ascData = data.sort((a, b) => ('' + a.name.official).localeCompare(b.name.official));
    for (let i = 0 + position; i < (ascData.length / 25) + position; i++) {
        idCountry = ascData[i].name.official;
        Object.prototype.toString(idCountry);
        idCountryCleaned = idCountry.replace(/\s/g, '_');
        officialName = ascData[i].name.official;
        region = ascData[i].region;
        population = ascData[i].population;
        imgPath = ascData[i].flags.png

        let firstLanguage, capital;
        if (ascData[i].languages === undefined) {
            firstLanguage = 'No language to display';
        } else {
            firstLanguage = Object.values(ascData[i].languages)[0];
        }
        if (ascData[i].capital === undefined) {
            capital = 'No capital';
        } else {
            capital = Object.values(ascData[i].capital)[0];
        }

        $("#countries").append($(`<tr>`)
            .append($(`<td id=${idCountryCleaned}> ${officialName} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${capital} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${region} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${firstLanguage} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${population} </td>`))
            .append($(`<td id=${idCountryCleaned}><img src=${imgPath} class='img-fluid w-50'></td>`))
        );
    }

}


const orderDescend = (data) => {
    let desData = data.sort((a, b) => ('' + b.name.official).localeCompare(a.name.official));
    for (let i = 0 + position; i < (desData.length / 25) + position; i++) {
        idCountry = desData[i].name.common;
        Object.prototype.toString(idCountry);
        idCountryCleaned = idCountry.replace(/\s/g, '_');
        officialName = desData[i].name.official;
        region = desData[i].region;
        population = desData[i].population;
        imgPath = desData[i].flags.png
        let firstLanguage, capital;

        if (desData[i].languages === undefined) {
            firstLanguage = 'No language to display';
        } else {
            firstLanguage = Object.values(desData[i].languages)[0];
        }
        if (desData[i].capital === undefined) {
            capital = 'No capital';
        } else {
            capital = Object.values(desData[i].capital)[0];
        }

        $("#countries").append($(`<tr>`)
            .append($(`<td id=${idCountryCleaned}> ${officialName} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${capital} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${region} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${firstLanguage} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${population} </td>`))
            .append($(`<td id=${idCountryCleaned}><img src=${imgPath} class='img-fluid w-50'></td>`))
        );
    }
}

const modal = (elementId) => {
    if (elementId !== '') {
        $.ajax({
            type: "GET",
            url: (`https://en.wikipedia.org/api/rest_v1/page/summary/${elementId}`).normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
            // url: `https://en.wikipedia.org/api/rest_v1/page/summary/${elementId}`,
            dataType: "json",
            data: {
                country: "country"
            },
            success: function (data) {
                html = data.extract_html;
                title = data.title;
                thumbnail = data.thumbnail.source;

                Swal.fire({
                    title: title,
                    html: html,
                    iconHtml: "<img src=" + thumbnail + " width=300 height=130>",
                    confirmButtonText: 'Back'
                });
            }
        });
    } else {

    }
}

$('#table-countries').on('click', (e) => {
    elementId = e.target.id;
    e.stopPropagation();
    modal(elementId);
})

const contentFilter = (data) => {
    let ascData = data.sort((a, b) => ('' + a.name.official).localeCompare(b.name.official));
    for (let i = 0; i < ascData.length; i++) {
        idCountry = ascData[i].name.official;
        Object.prototype.toString(idCountry);
        idCountryCleaned = idCountry.replace(/\s/g, '_');
        officialName = ascData[i].name.official;
        region = ascData[i].region;
        population = ascData[i].population;
        imgPath = ascData[i].flags.png

        let firstLanguage, capital;
        if (ascData[i].languages === undefined) {
            firstLanguage = 'No language to display';
        } else {
            firstLanguage = Object.values(ascData[i].languages)[0];
        }
        if (ascData[i].capital === undefined) {
            capital = 'No capital';
        } else {
            capital = Object.values(ascData[i].capital)[0];
        }

        $("#countries").append($(`<tr>`)
            .append($(`<td id=${idCountryCleaned}> ${officialName} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${capital} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${region} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${firstLanguage} </td>`))
            .append($(`<td id=${idCountryCleaned}> ${population} </td>`))
            .append($(`<td id=${idCountryCleaned}><img src=${imgPath} class='img-fluid w-50'></td>`))
        );
    }
    var input, filter, table, tr, td, i;
    input = document.getElementById("textFilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("countries");
    tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        var tds = tr[i].getElementsByTagName("td");
        var flag = false;
        for (var j = 0; j < tds.length; j++) {
            var td = tds[j];
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                flag = true;
            }
        }
        if (flag) {
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
    }
}

// const filter = (data) => {
//     filterSearch = $("#filterText").val();
//     console.log(filterSearch);
//     let results = data.filter(result => result.includes(filterSearch));
//     if (asc) {
//         orderAscend(results);
//     } else if (!asc) {
//         orderDescend(results);
//     }
// }