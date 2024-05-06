/**
 * load home page for a Home button and change text of the button
 * Eslint can't parse HTML files, so we ignore the warning that this function is not used
 */
/* eslint-disable no-unused-vars */
function loadHome() {
  fetch("../common.html")
    .then((response) => response.text())
    .then((text) => (document.getElementById("home").innerHTML = text));
}
/* eslint-enable no-unused-vars */
