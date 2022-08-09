$(document).ready(() => {
    setInterval(blinkText, 1000);
});

const blinkText = () => {
    $('.blink').fadeOut(500);
    $('.blink').fadeIn(500);
}
