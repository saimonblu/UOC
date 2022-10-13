<template>
  <div class="bg-light" id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
          <form class="d-flex">
            <input class="form-control" type="search" placeholder="Buscar" v-model="cerca" @input="busca()" aria-label="Search">
          </form>
        </div>
      </div>
    </nav>

  <div v-if="hiHaDadesInici">
    <div class="container-fluid">
      <div class="row col d-flex justify-content-center">
      <div class="col-md-3 " style="width:250px" v-for="n in infoPokemon" v-bind:key="n.posicio">
        <carta ref="cartaIndividual" :pokemon="n"></carta>
      </div>
      </div>
    </div>
  </div>

  <div v-if="hiHaDadesCombat">
    <div class="container-fluid">
      <div class="row col d-flex justify-content-center">
      <div class="col-md-3 " style="width:250px" v-for="n in infoPokemon" v-bind:key="n.posicio">
        <carta :id="'pokemonId_'+n.id" ref="cartaIndividual" :pokemon ="{ n }"></carta>
      </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>

  import carta from './components/carta.vue'
  import axios from 'axios'

  export default {
    name: 'App',

    components: {
      carta
    },

    created() {
      this.inici()
    },

    mounted () {

    },

    data: () => {
      return {
        cerca: "",
        numPokemon: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        infoPokemon: [],
        hiHaDadesInici: false,
        hiHaDadesCombat: false,
        pokemonExclosos: []
      }
    },

    methods: {
      async inici () {
        let that = this
        that.infoPokemon = {}
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
        that.hiHaDadesInici = false
        that.hiHaDadesCombat = true
      },

      busca () {
        let that = this
        that.pokemonExclosos = []
        for (let i = 0; i < 10; i++) {
          
          if(!that.infoPokemon[i].name.includes(this.cerca)) {
            that.pokemonExclosos.push(that.infoPokemon[i])
            //delete that.infoPokemon[i]
          }
        }
        console.log(that.pokemonExclosos)
      }
    },

  }

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
