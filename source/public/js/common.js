/**
 * load home page for a Home button and change text of the button
 */
function loadHome() {
  fetch("/common/home")
    .then((response) => response.text())
    .then((text) => (document.getElementById("home").innerHTML = text));
}
