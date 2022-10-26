<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" @click="inici()">Inici</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#" @click="carregaCombat()">Combat</a>
            </li>
          </ul>
          <div class="row">
            <form class="d-flex col-11">
              <input class="form-control" type="search" placeholder="Buscar" v-model="cerca" @input="busca()" aria-label="Search">
            </form>
          </div>
          <div class="toggle-wrapper col-1 pt-1">
            <label class="toggle">
              <input type="checkbox" :checked="(modestyle == 'dark') ? 'light' : false" @change="toggle()">
              <span class="toggler round"></span>
            </label>
          </div>
        </div>
      </div>
    </nav>

  <div v-if="hiHaDadesInici">
    <div class="container-fluid">
      <div class="row col d-flex justify-content-center">
      <div class="col-md-3 " style="width:250px" v-for="n in filtratCerca" v-bind:key="n.posicio">
        <carta ref="cartaIndividual" :pokemon="n"></carta>
      </div>
      </div>
    </div>
  </div>

  <div v-if="hiHaDadesCombat">
    <div class="container-fluid">
      <div class="row col d-flex justify-content-center">
      <div class="col-md-3 " style="width:250px" v-for="n in infoPokemon" v-bind:key="n.id">
        <cartaCombat :id="'pokemonId_'+n.id" ref="cartaCombat" :pokemon ="n"></cartaCombat>
      </div>
      </div>
    </div>
  </div>

    <!-- Modal -->
    <div class="modal fade" id="combat" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-right">
          <div class="modal-header">
            <h5 class="modal-title"><b class="text-uppercase">{{ atacant.name }}</b> guanya a <b class="text-uppercase">{{ defensor.name }}</b></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="inicialitzaCombat()"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img :src="atacant.img_davant" class="card-img-top mx-auto d-block mb-0 " style="width:115px">
              </div>
              <div class="col-md-6">
                <img :src="defensor.img_davant" class="card-img-top mx-auto d-block mb-0 " style="width:115px">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 text-center">
                <h2>{{ atac }} <b>{{ atacant.atac }}</b></h2>
              </div>
              <div class="col-md-6 text-center">
                <h2>{{ defensa }} <b>{{ defensor.defensa }}</b></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  const $ = require('jquery')
  window.$ = $

  import carta from './components/carta.vue'
  import cartaCombat from './components/cartaCombat.vue'
  import axios from 'axios'

  export default {
    name: 'App',

    components: {
      carta, cartaCombat
    },

    created() {
      this.inici()
    },

    mounted () {

    },

    data: () => {
      return {        
        numPokemon: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        infoPokemon: [],
        hiHaDadesInici: false,
        hiHaDadesCombat: false,
        pokemonExclosos: [],
        pokemonInclosos: [],
        seleccio:[],
        pokemon1: {
          id: "",
          name: "",
          img_davant: "",
          atac: "",
          defensa: ""
        },
        pokemon2: {
          id: "",
          name: "",
          img_davant: "",
          atac: "",
          defensa: ""
        },
        atacant: {
          id: "",
          name: "",
          img_davant: "",
          atac: "",
          defensa: ""
        },
        defensor: {
          id: "",
          name: "",
          img_davant: "",
          atac: "",
          defensa: ""
        },
        atac: "Atac",
        defensa: "Defensa",
        cerca: "",
        modestyle: "light"
      }
    },

    methods: {
      async inici () {
        let that = this
        that.infoPokemon = []
        for(let i = 0; i < this.numPokemon.length; i++) {
          await axios.get('https://pokeapi.co/api/v2/pokemon/'+ parseInt(Math.random()*(0-151)+151))
          .then(response => {
            let pokemon = {
              posicio: i,
              id: response.data.id,
              name: response.data.name,
              img_davant: response.data.sprites.front_default,
              img_post: response.data.sprites.back_default,
              atac: response.data.stats[1].base_stat,
              defensa: response.data.stats[2].base_stat,
              tipus: response.data.types[0].type.name,
              alsada: response.data.height,
              amplada: response.data.weight
            }
            that.infoPokemon[i] = pokemon
          })          
        }        
        that.hiHaDadesInici = true
        that.hiHaDadesCombat = false
      },

      async carregaCombat () {
        let that = this
        that.infoPokemon = {}
        for(let i = 0; i < this.numPokemon.length; i++) {
          await axios.get('https://pokeapi.co/api/v2/pokemon/'+ parseInt(Math.random()*(0-151)+151))
          .then(response => {
            let pokemon = {
              posicio: i,
              id: response.data.id,
              nom: response.data.name,
              img_davant: response.data.sprites.front_default,
            }
            that.infoPokemon[i] = pokemon
          })          
        }
        that.hiHaDadesInici = true
        that.hiHaDadesCombat = false
        that.hiHaDadesInici = false
        that.hiHaDadesCombat = true
      },

      inicialitzaCombat() {
        let that = this
        this.carregaCombat ()
        that.hiHaDadesInici = false
        that.hiHaDadesCombat = true
      },

      async cartesCombat(id) {
        let that = this
        this.seleccio.push(id)
        if(that.seleccio.length >= 2) {
          //Pokemon 1
          await axios.get('https://pokeapi.co/api/v2/pokemon/'+ that.seleccio[0])
          .then(res => {
            that.pokemon1.id = res.data.id,
            that.pokemon1.name = res.data.name,
            that.pokemon1.img_davant = res.data.sprites.front_default,
            that.pokemon1.atac = res.data.stats[1].base_stat,
            that.pokemon1.defensa = res.data.stats[2].base_stat
          })
          //Pokemon 2
          await axios.get('https://pokeapi.co/api/v2/pokemon/'+ that.seleccio[1])
          .then(res => {
            that.pokemon2.id = res.data.id,
            that.pokemon2.name = res.data.name,
            that.pokemon2.img_davant = res.data.sprites.front_default,
            that.pokemon2.atac = res.data.stats[1].base_stat,
            that.pokemon2.defensa = res.data.stats[2].base_stat
          })
          
          //Comprovar que l'atac sigui més gran que la defensa
          if(parseInt(that.pokemon1.atac) > parseInt(that.pokemon2.defensa)) {
            that.atacant.name = that.pokemon1.name
            that.atacant.img_davant = that.pokemon1.img_davant
            that.atacant.atac = that.pokemon1.atac

            that.defensor.name = that.pokemon2.name
            that.defensor.img_davant = that.pokemon2.img_davant
            that.defensor.defensa = that.pokemon2.defensa
            that.atac = "Atac"
            that.defensa = "Defensa"
          } else {
            that.atacant.name = that.pokemon2.name
            that.atacant.img_davant = that.pokemon2.img_davant
            that.atacant.atac = that.pokemon2.defensa

            that.defensor.name = that.pokemon1.name
            that.defensor.img_davant = that.pokemon1.img_davant
            that.defensor.defensa = that.pokemon1.atac
            that.atac = "Defensa"
            that.defensa = "Atac"
          }
          $("#combat").modal('show')
          that.seleccio = []
        }
      },

      busca () {
        let that = this
        that.pokemonExclosos = []
        that.pokemonInclosos = []
        
        if(that.pokemonInclosos.length == 0 || that.pokemonInclosos == '') {
          for (let i = 0; i < 10; i++) {            
            if(!that.infoPokemon[i].name.includes(that.cerca)) { 
              that.pokemonExclosos.push(that.infoPokemon[i])            
            } else {
              that.pokemonInclosos.push(that.infoPokemon[i])
            }
          }
        }

        if(that.pokemonInclosos.length > 0 || that.pokemonInclosos != '') {
          for (let x = 0; x < that.pokemonInclosos.length; x++) {
            if(!that.pokemonInclosos[x].name.includes(that.cerca)) {
              that.pokemonExclosos.push(that.infoPokemon[x])
              that.pokemonInclosos.splice(x, 1);
            } 
          }
          that.infoPokemon = that.pokemonInclosos
        }
      },

      toggle() {
        if (this.modestyle === "dark") {
          this.modestyle = "light"
          import("./styleClar.css")
        } else {
          this.modestyle = "dark"
          import("./styleFosc.css")
        }
      }
    },

    computed: {
      /*filtratCerca: computed( () => {
          return this.infoPokemon.value.filter((p)=> {
            console.log(p)
            return p.name.includes(this.cerca)
          })
        }
      ),*/
      filtratCerca: {
        get() {
          return this.infoPokemon
        },
        // setter
        set(newValue) {
          // Note: we are using destructuring assignment syntax here.
          [this.infoPokemon] = newValue.split(' ')
        }
      },
      
    }

  }

</script>

<style>
  @import './styleClar.css';
</style>
