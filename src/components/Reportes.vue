

<template>
  <div class="q-pa-mn">
    <q-layout view="lHh Lpr lff" style="height: auto">
      

      <q-page-container>
        
        <q-separator class="q2" style="background-color: #ddd" dark inset />

        <center>
          <div
            style="
              background-color: teal;
              display: inline-block;
              padding: 5px;
              border-radius: 5px;
              margin-top: 30px;
            "
          >
            <p
              style="
                text-align: center;
                color: #ffffff;
                /* font-weight: bold; */
              "
            >
            <q-icon name="description" color="white" style="font-size: 20px; margin-top: -2px;" />
              Reportes
            </p>
          </div>
        </center>

        <div class="contenedor">
          <div class="contenedor-conciertos">
            <router-link class="lg4" to="/Principal/Rmantenimiento">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Mantenimiento</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">settings</i>
                </div>
              </div>
            </router-link>

            <router-link class="lg4" to="/Principal/Rcostos">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Costos</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">monetization_on</i>
                </div>
              </div>
            </router-link>

            <router-link class="lg4" to="/Principal/Rpedidos">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Pedidos</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">shopping_cart</i>
                </div>
              </div>
            </router-link>

            <router-link class="lg4" to="/Principal/Rconversion">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Conversión</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">transform</i>
                </div>
              </div>
            </router-link>

            <router-link class="lg4" to="/Principal/Rinventario">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Inventario</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">inventory</i>
                </div>
              </div>
            </router-link>

            <router-link class="lg4" to="/Principal/Home">
              <div class="card" style="background-color: #ffffff;">
                <div class="textos">
                  <center><h6>Ir a Inicio</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">home</i>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </q-page-container>
    </q-layout>

    
  </div>
</template>

<script>
// import { ref } from "vue";

// export default {
//   setup() {
//     return {
//       drawer: ref(false),
//       sizes: ["sm"],
//       slide: ref("style"),
//     };
//   },
// };
</script>

<style scoped>
.lg4 {
  text-decoration: none;
  color: white;
}

.material-icons {
  font-size: 5em;
  margin-top: 10%;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 9999; /* Asegúrate de que el z-index sea mayor que cualquier otra capa en la página */
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background: #1d202b;
  color: #fff;
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
}

.contenedor {
  width: 90%;
  max-width: 1200px;
  margin: auto;
  padding: 40px 0;

  /* Flexbox */
  /* display: flex;
      gap: 20px; */

  /* Grid */
  display: grid;
  grid-template-columns: 3fr;
  gap: 20px;
}

.contenedor-conciertos {
  /* Flexbox */
  /* width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px; */

  /* Grid */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 50px;
}

.card {
  border-radius: 10px;
  min-height: 200px;
  font-weight: bold;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center center;

  border-color: teal; 
  border-width: 5px; 
  border-style: outset;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;

  /* Flexbox */
  /* width: calc(33.33% - 20px); */
}

.card:hover {
  transform: scale(1.05);
}

.card .textos {
  height: 100%;
  color: #000000;

  /* Flebox */
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  /* Grid */
  /* display: grid;
      grid-template-rows: 1fr auto; */
}

@media screen and (max-width: 900px) {
  .contenedor-conciertos {
    /* Flexbox */
    /* width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px; */

    /* Grid */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media screen and (max-width: 700px) {
  .contenedor-conciertos {
    /* Flexbox */
    /* width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px; */

    /* Grid */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media screen and (max-width: 600px) {
  .contenedor-conciertos {
    /* Flexbox */
    /* width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px; */

    /* Grid */
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }
}
</style>
