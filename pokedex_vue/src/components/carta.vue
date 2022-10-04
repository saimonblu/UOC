<template>
  <div>
    <div class="card p-1 my-3 border-light shadow" style="max-height:250px;">
      <img :src="pokemon.img_davant" class="card-img-top mx-auto d-block mb-0 pb-0" style="width:115px">
      <div class="card-body p-0">
        <h5 class="card-title p-0 m-0 text-center text-uppercase">{{ pokemon.name }}</h5>

        <div class="row text-center py-2" style="font-size:13px">
          <div class="row mx-auto">
            <div class="col-4"><small><b>Tipus</b></small></div>
            <div class="col-4"><small><b>Atac</b></small></div>
            <div class="col-4"><small><b>Defensa</b></small></div>
          </div>
          <div class="row mx-auto">
            <div class="col-4"><small>{{ pokemon.tipus }}</small></div>
            <div class="col-4"><small>{{ pokemon.atac }}</small></div>
            <div class="col-4"><small>{{ pokemon.defensa }}</small></div>
          </div>
        </div>

        <div class="row py-2">
          <div class="col-3"></div>
          <button class="btn btn-outline-dark btn-sm col-6">+ Info</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'carta',

    props: {
      pokemon: { type: Object }
    },

    created() {

    },

    mounted () {

    },

    methods: {
      buscar(info) {
        console.log(info)
      }
    }

  }
</script>