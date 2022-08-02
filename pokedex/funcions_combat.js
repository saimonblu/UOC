function inicia() {

    var idPokemon = [];

    var params = new URLSearchParams(document.location.search);
    var id = params.get("pokeID");

    for (let i = 0; i < 10; i++) {
        idPokemon.push(getRandomInt(151))
        fetch('https://pokeapi.co/api/v2/pokemon/' + getRandomInt(151) + '/')
            .then(response => response.json())
            .then(data => {
                carta = {
                    name: data.name,
                    img_davant: data.sprites.front_default,
                    img_post: data.sprites.back_default,
                    atac: data.stats[1].base_stat,
                    defensa: data.stats[2].base_stat
                }
                document.getElementById("cartes" + i).innerHTML =
                    "<div class='card cursor_oculta'onclick='" + 'seleccionaCarta("' + data.id + '")' + "'>" +
                    "<div class='carta_oculta' id=id_" + data.id + " style='display: none;'>" +
                    "<div id='poke" + i + "' class='titol'>" + carta.name.charAt(0).toUpperCase() + carta.name.slice(1) + "</div>" +
                    "<img class='img_carta' src='" + carta.img_davant + "' width='130' height='130'>" +
                    "<span class='idPokemon" + i + "' id=idPokemon" + data.id + "></span>" +
                    "<div class='footer'>" +
                    "<div><b>Atac</b> " + carta.atac + "</div>" +
                    "<div><b>Defensa</b> " + carta.defensa + "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
            })
    }
}

function getRandomInt(num) {
    return Math.floor(Math.random() * (num - 1) + 1);
}

function seleccionaCarta(id) {
    var seleccio = [];
    seleccio.push(id);
    var pokemon = document.getElementById("id_" + id + "");

    for (let i = 0; i < 10; i++) {

        if (pokemon != null) {
            pokemon.style.display = "";
            pokemon.parentNode.classList.add("carta_seleccionada");
            seleccionat = document.getElementsByClassName("carta_seleccionada")[i];
            if (seleccionat) {
                var idPokemon = seleccionat.childNodes[0].id.substring(3);
            }
        }

        if (!seleccio.includes(idPokemon)) {
            seleccio.push(idPokemon);
        }
    }

    if (seleccio.length == 3) {
        esborraCartes(seleccio);
    }

    if (seleccio.length == 2) {
        combatCartes(seleccio);
    }
    seleccio = [];
}

function combatCartes(sel) {
    console.log(sel.length)
    console.log(sel)
}

function esborraCartes(sel) {

    for (let i = 0; i < sel.length; i++) {
        let pokemon = document.getElementById("id_" + sel[i] + "");
        pokemon.style.display = "none";
        document.getElementById("id_" + sel[i] + "").parentNode.classList.remove("carta_seleccionada");
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
    inicia()
});