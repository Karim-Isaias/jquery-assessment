$(document).ready(() => {
    $('a.printPage').on('click', () => {
        window.print();
        return false;
    })
});
