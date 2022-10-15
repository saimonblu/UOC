<template>
  <div>
    <div class="card p-1 my-3 border-light shadow rounded" style="max-height:250px;">
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
          <button type="button" class="btn btn-outline-dark btn-sm col-6" data-bs-toggle="modal" :data-bs-target="modalTarget"><b>+</b> Info</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" :id="modalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content text-right">
          <div class="modal-header">
            <h5 class="modal-title text-uppercase"><b>{{ pokemon.name }}</b></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row border-bottom pb-3">
              <img :src="pokemon.img_davant" class="card-img-top mx-auto d-block mb-0 " style="width:115px">
              <img :src="pokemon.img_post" class="card-img-top mx-auto d-block mb-0" style="width:115px">
            </div>
            <div class="row text-center py-2" style="font-size:13px">
              <div class="row mx-auto">
                <div class="col-4"><small><b>ID</b></small></div>
                <div class="col-4"><small><b>Atac</b></small></div>
                <div class="col-4"><small><b>Defensa</b></small></div>
              </div>
              <div class="row mx-auto">
                <div class="col-4"><small>{{ pokemon.id }}</small></div>
                <div class="col-4"><small>{{ pokemon.atac }}</small></div>
                <div class="col-4"><small>{{ pokemon.defensa }}</small></div>
              </div>
            </div>
            <div class="row text-center py-2" style="font-size:13px">
              <div class="row mx-auto">
                <div class="col-4"><small><b>Tipus</b></small></div>
                <div class="col-4"><small><b>Alçada</b></small></div>
                <div class="col-4"><small><b>Amplada</b></small></div>                
              </div>
              <div class="row mx-auto">
                <div class="col-4"><small>{{ pokemon.tipus }}</small></div>
                <div class="col-4"><small>{{ pokemon.alsada }}</small></div>
                <div class="col-4"><small>{{ pokemon.amplada }}</small></div>                
              </div>
            </div>
          </div>
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

      data: () => {
        return {
          nom: "",
          modalId: "",
          modalTarget: ""         
        }
      },

      created() {

      },

      mounted () {
        this.modalId = `modal-${this.pokemon.id}`;
        this.modalTarget = `modal-${this.pokemon.id}`
      },

      methods: {

      }

  }
</script>