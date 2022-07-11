function inicia() {
    fetch('https://pokeapi.co/api/v2/pokemon/1/')
        .then(response => response.json())
        .then(data => console.log(data));
}
//document.getElementById("inicia").innerHTML = "Hello JavaScript";

document.addEventListener("DOMContentLoaded", function(event) {
    inicia()
});