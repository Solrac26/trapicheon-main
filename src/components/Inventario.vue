<!-- Inventario -->

<template>
  <div class="q-pa-mn">
    <q-layout view="lHh Lpr lff" style="height: auto">
      <!-- <q-header elevated class="bg-green">
        <q-toolbar>
          <q-toolbar-title>Inventario</q-toolbar-title>

          <router-link class="lg4" to="/Home">
            <q-btn flat round dense icon="home" />
          </router-link>

          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="240" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <div
              class="q-pa-mx q-gutter-sm"
              style="margin-left: 25px; margin-right: auto"
            >
              <br />
              <router-link class="lg4" to="/Mantenimiento">
                <q-btn
                  elevated
                  push
                  color="green"
                  label="Mantenimiento"
                  style="width: 80%"
                />
              </router-link>
              <br />
              <br />
              <router-link class="lg4" to="/Costos">
                <q-btn
                  elevated
                  push
                  color="green"
                  label="Costos"
                  style="width: 80%"
                />
              </router-link>
              <br />
              <br />
              <router-link class="lg4" to="/Pedidos">
                <q-btn
                  elevated
                  push
                  color="green"
                  label="Pedidos"
                  style="width: 80%"
                />
              </router-link>
              <br />
              <br />
              <router-link class="lg4" to="/Conversion">
                <q-btn
                  elevated
                  push
                  color="green"
                  label="Conversión"
                  style="width: 80%"
                />
              </router-link>
              <br />
              <br />
              <router-link class="lg4" to="">
                <q-btn
                  elevated
                  push
                  color="black"
                  label="Inventario  ►"
                  style="width: 80%"
                />
              </router-link>
              <br />
              <br />
              <router-link class="lg4" to="/Reportes">
                <q-btn
                  elevated
                  push
                  color="green"
                  label="Reportes"
                  style="width: 80%"
                />
              </router-link>
              <br />
              <br />
              <router-link class="lg4" to="/">
                <q-btn
                  v-for="size in sizes"
                  :key="`btn_size_dense_round_${size}`"
                  push
                  color="black"
                  round
                  icon="logout"
                  style="margin-left: 50px"
                  :size="size"
                />
              </router-link>
              <router-link class="lg4" to="/Register">
                <q-btn
                  v-for="size in sizes"
                  :key="`btn_size_dense_round_${size}`"
                  push
                  color="black"
                  round
                  icon="person_add"
                  style="margin-left: 5px"
                  :size="size"
                />
              </router-link>
            </div>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://beevoo.net/blog/wp-content/uploads/2022/12/cana-de-azucar.jpg"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img
                src="https://i.pinimg.com/originals/e9/38/fb/e938fb109435cb8403b1eeaec02a77d9.jpg"
              />
            </q-avatar>
            <div class="text-weight-bold">Carl Johnson (CJ)</div>
            <div>@sanandreascj</div>
          </div>
        </q-img>
      </q-drawer> -->

      <q-page-container>
        <!-- <h4
          style="
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
            margin-bottom: 25px;
          "
        >
          Formularios
        </h4> -->
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
            <q-icon name="inventory" color="white" style="font-size: 20px; margin-top: -2px;" />
              Inventario
            </p>
          </div>
        </center>

        <div class="contenedor">
          <div class="contenedor-conciertos">
            <router-link class="lg4" to="/Principal/Productos">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Productos</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">pallet</i>
                </div>
              </div>
            </router-link>

            <router-link class="lg4" to="/Principal/Bodegas">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Bodegas</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">shelves</i>
                </div>
              </div>
            </router-link>

            <router-link class="lg4" to="/Principal/Marcas">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Marcas</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">star</i>
                </div>
              </div>
            </router-link>

            <router-link class="lg4" to="/Principal/Categorias">
              <div class="card" style="background-color: #ffffff">
                <div class="textos">
                  <center><h6>Categorias</h6></center>
                  <!-- <q-separator style="background-color: #000000" dark inset /> -->
                  <i class="material-icons">category</i>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </q-page-container>
    </q-layout>

    <!-- <footer>
      <div>
        <q-layout view="lHh lpr lFf" style="min-height: fit-content">
          <q-footer reveal elevated style="background-color: #4caf50">
            <q-toolbar>
              <q-toolbar-title class="text"
                >Copyright Trapiche 2023</q-toolbar-title
              >
            </q-toolbar>
          </q-footer>
        </q-layout>
      </div>
    </footer> -->
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
  grid-template-columns: repeat(4, 1fr);
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
