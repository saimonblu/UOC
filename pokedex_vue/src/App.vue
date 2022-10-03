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

  <div>
    <div class="container-fluid">
      <div class="row">
      <div class="col-md-3" v-for="n in numPokemon" v-bind:key="n">
        <carta class=""></carta>
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

    data: () => {
      return {
        cerca: "",
        numPokemon: [1,2,3,4,5,6,7,8]
      }
    },

    methods: {
      inici () {
        console.log("Hola!")
        axios.get('https://pokeapi.co/api/v2/pokemon/'+ parseInt(Math.random()*(0-151)+151))
        .then(response => (
          console.log(response.data))
        )
      },

      carregaCombat () {
        console.log("Carrega combat!")
      },

      busca () {
        console.log(this.cerca)
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
