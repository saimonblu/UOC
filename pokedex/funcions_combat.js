function inicia() {

    var idPokemon = [];

    const params = new URLSearchParams(document.location.search);

    const id_atac = params.get("poke_atac");
    const id_defensa = params.get("poke_defensa");

    if (!id_atac) {
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
    } else {

        // Si té ID la URL
        fetch('https://pokeapi.co/api/v2/pokemon/' + id_atac + '/')
            .then(response => response.json())
            .then(data => {
                carta = {
                    name: data.name,
                    img_davant: data.sprites.front_default,
                    img_post: data.sprites.back_default,
                    atac: data.stats[1].base_stat,
                    defensa: data.stats[2].base_stat,
                    tipus: [],
                    alsada: data.height,
                    amplada: data.weight
                }
                fetch('https://pokeapi.co/api/v2/pokemon/' + id_defensa + '/')
                    .then(response => response.json())
                    .then(data => {
                        carta_defensa = {
                            name: data.name,
                            img_davant: data.sprites.front_default,
                            img_post: data.sprites.back_default,
                            atac: data.stats[1].base_stat,
                            defensa: data.stats[2].base_stat,
                            tipus: [],
                            alsada: data.height,
                            amplada: data.weight
                        }

                        document.getElementById("menu").style.display = "none"
                        document.getElementById("cardGroup").classList.remove("cards")
                        document.getElementById("carta_combat").innerHTML =
                            "<div class='card_sola'>" +
                            "<div class='titol'><b>" + carta.name.charAt(0).toUpperCase() + carta.name.slice(1) + "</b> ataca <br>i guanya a <b>" + carta_defensa.name.charAt(0).toUpperCase() + carta_defensa.name.slice(1) + "</b></div>" +
                            "<img class='img_carta_sola' src='" + carta.img_davant + "' width='130' height='130'>" +
                            "<img class='img_carta_sola' src='" + carta_defensa.img_davant + "' width='130' height='130'>" +
                            "<div class='footer_sola'>" +
                            "<h3><b>Atac " + carta.name.charAt(0).toUpperCase() + carta.name.slice(1) + " </b>= " + carta.atac + "</h3>" +
                            "<h3><b>Defensa " + carta_defensa.name.charAt(0).toUpperCase() + carta_defensa.name.slice(1) + " </b>= " + carta_defensa.defensa + "</h3>" +
                            "</div>"
                    })


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
        combatCartes(seleccio, id);
    }
    seleccio = [];
}

function combatCartes(sel, id) {

    var atacant = {};
    var defensor = {};
    fetch('https://pokeapi.co/api/v2/pokemon/' + sel[1] + '/')
        .then(response => response.json())
        .then(data => {
            atacant.nom = data.name;
            atacant.id = sel[1];
            atacant.img = data.sprites.front_default;
            atacant.atac = data.stats[1].base_stat;
            fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/')
                .then(response => response.json())
                .then(data => {
                    defensor.nom = data.name;
                    defensor.id = id
                    defensor.img = data.sprites.front_default;
                    defensor.defensa = data.stats[2].base_stat;
                    if (parseInt(atacant.atac) > parseInt(defensor.defensa)) {
                        window.open('combat.html?poke_atac=' + sel[1] + '&poke_defensa=' + id, 'Nombre de la ventana', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=450,left = 450,top = 175');
                    }
                    if (parseInt(atacant.atac) < parseInt(defensor.defensa)) {
                        window.open('combat.html?poke_atac=' + id + '&poke_defensa=' + sel[1], 'Nombre de la ventana', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=450,left = 450,top = 175');
                    }
                })
        })
}

function esborraCartes(sel) {

    for (let i = 0; i < sel.length; i++) {
        let pokemon = document.getElementById("id_" + sel[i] + "");
        pokemon.style.display = "none";
        document.getElementById("id_" + sel[i] + "").parentNode.classList.remove("carta_seleccionada");
    }

}

function canviTema(t) {

    if (t == 0) {
        document.querySelector("link[href='estils.css']").href = "estils_fosc.css";
    }

    if (t == 1) {
        document.querySelector("link[href='estils_fosc.css']").href = "estils.css";
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    inicia()
});