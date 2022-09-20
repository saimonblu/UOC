function inicia() {

    var idPokemon = [];

    var params = new URLSearchParams(document.location.search);
    var id = params.get("pokeID");

    // SI no té ID la URL
    if (!id) {
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
                        "<div class='card' id=id_" + data.id + ">" +
                        "<div id='poke" + i + "' class='titol'>" + carta.name.charAt(0).toUpperCase() + carta.name.slice(1) + "</div>" +
                        "<img class='img_carta' src='" + carta.img_davant + "' width='130' height='130'>" +
                        "<span class='idPokemon" + i + "' id=idPokemon" + data.id + " ></span>" +
                        "<div class='footer'>" +
                        "<div><b>Atac</b> " + carta.atac + "</div>" +
                        "<div><b>Defensa</b> " + carta.defensa + "</div>" +
                        "<button class='center' onclick='" + 'pokeInfo("' + data.id + '")' + "'><b>Més informació</b></button>" +
                        "</div>" +
                        "</div>"
                })
        }
    } else {
        // Si té ID la URL
        fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/')
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
                for (let i = 0; i < data.types.length; i++) {
                    carta.tipus.push(data.types[i].type.name)
                }
                document.getElementById("menu").style.display = "none"
                document.getElementById("cardGroup").classList.remove("cards")
                document.getElementById("cartes1").innerHTML =
                    "<div class='card_sola'>" +
                    "<div class='titol'>" + carta.name.charAt(0).toUpperCase() + carta.name.slice(1) + "</div>" +
                    "<h1 class='titol'>" + id + "</h1>" +
                    "<img class='img_carta_sola' src='" + carta.img_davant + "' width='130' height='130'>" +
                    "<img class='img_carta_sola' src='" + carta.img_post + "' width='130' height='130'>" +
                    "<div class='footer_sola'>" +
                    "<div><b>Atac</b> " + carta.atac + "</div>" +
                    "<div><b>Defensa</b> " + carta.defensa + "</div>" +
                    "<div><b>Tipus</b> " + carta.tipus + "</div>" +
                    "<div><b>Alçada</b> " + carta.alsada + "</div>" +
                    "<div><b>Amplada</b> " + carta.amplada + "</div>" +
                    "</div>"


            })
    }
}

function getRandomInt(num) {
    return Math.floor(Math.random() * (num - 1) + 1);
}

function pokeInfo(id) {

    fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/')
        .then(response => response.json())
        .then(data => {
            window.open('index.html?pokeID=' + id, 'Nombre de la ventana', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=450,left = 450,top = 175');
        })
}

function buscarPokemon() {
    var nomCerca = document.getElementById("cerca").value;

    for (let i = 0; i < 10; i++) {
        let pokemon = document.getElementById("poke" + i + "").textContent;
        let idPokemon = document.getElementsByClassName("idPokemon" + i + "")[0].id.substring(9);
        if (pokemon.toLowerCase().indexOf(nomCerca) > -1) {
            let carta = document.getElementById("id_" + idPokemon + "")
            document.getElementById("id_" + idPokemon + "").style.display = ""
        } else {
            document.getElementById("id_" + idPokemon + "").style.display = "none"
        }
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