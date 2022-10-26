<template>

  <div class="flip-card" @click="gira(), cartesCombat(pokemon.id)">
    <div class="flip-card-inner" :id="'p_'+ pokemon.id">
      <div class="flip-card-front card p-1 my-3  shadow rounded p-0 m-0" style="cursor:pointer;">
        <img src="../../public/pokeball.png" style="width:40px;" class="my-auto mx-auto">
      </div>
      <div class="flip-card-back bg-dark shadow rounded">
        <h1 class="mt-5 mx-auto">{{ pokemon.nom }}</h1>
        <img :src="pokemon.img_davant" class="card-img-top mx-auto d-block mb-0 pb-0" style="width:115px">
      </div>
    </div>
  </div>

</template>

<script>

    const $ = require('jquery')
    window.$ = $

    export default {
      name: 'cartaCombat',

      props: {
        pokemon: { type: Object }
      },

      data () {
        return {
          seleccio:[]
        }
      },

      created() {

      },

      mounted () {

      },

      methods: {

        cartesCombat(id) {          
          this.$parent.cartesCombat(id)
        },

        gira() {
          $("#p_"+this.pokemon.id).css("transform", "rotateY(180deg)");
        }

      }
  }
</script>