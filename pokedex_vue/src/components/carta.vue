<template>
  <div>
    <div class="card p-1 my-3 border-light">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Nom pokemon</h5>
        <span class="text-center">
          <div class="row py-3">
            <div class="col-4"><small><b>Tipus</b></small></div>
            <div class="col-4"><small><b>Atac</b></small></div>
            <div class="col-4"><small><b>Defensa</b></small></div>
          </div>
          <div class="row pb-3">
            <div class="col-4"><small>Planta</small></div>
            <div class="col-4"><small>125</small></div>
            <div class="col-4"><small>157</small></div>
          </div>
        </span>
        <div class="row">
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

}
</script>

