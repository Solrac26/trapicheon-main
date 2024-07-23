<template>
  <div class="q-pa-md" @click="closeDrawer" @dblclick.native="openDrawer">
    <q-layout view="hHh Lpr lff">
      <q-header elevated :class="$q.dark.isActive ? 'bg-teal' : 'bg-teal'">
        <q-toolbar>
          <q-btn flat @click.stop="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Trapiche On</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        elevated
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="200"
        :breakpoint="500"
        :class="$q.dark.isActive ? 'bg-black' : 'bg-white'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list padding>
            <router-link class="lg4" to="/Principal/Mantenimiento">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>

                <q-item-section> Mantenimiento </q-item-section>
              </q-item></router-link
            >

            <router-link class="lg4" to="/Principal/Costos">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="paid" />
                </q-item-section>

                <q-item-section> Costos </q-item-section>
              </q-item></router-link
            >

            <router-link class="lg4" to="/Principal/Pedidos">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="shopping_cart " />
                </q-item-section>

                <q-item-section> Pedidos </q-item-section>
              </q-item></router-link
            >

            <router-link class="lg4" to="/Principal/Conversion">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="transform " />
                </q-item-section>

                <q-item-section> Conversión </q-item-section>
              </q-item></router-link
            >

            <router-link class="lg4" to="/Principal/Inventario">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="inventory " />
                </q-item-section>

                <q-item-section> Inventario </q-item-section>
              </q-item></router-link
            >

            <!-- <q-separator /> -->

            <router-link class="lg4" to="/Principal/Reportes">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="description" />
                </q-item-section>

                <q-item-section> Reportes </q-item-section>
              </q-item></router-link
            >
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container style="padding-left: 0">
        <center>
          <div style="margin: 20px">
            <router-link class="lg4" to="/">
              <q-btn
                icon="power_settings_new"
                color="black"
                title="Salir"
                round
                dense
                push
                style="margin-right: 10px"
              />
            </router-link>
            <router-link class="lg4" to="/RegisterNuevo">
              <q-btn
                icon="person_add"
                color="black"
                title="Registro Nuevo"
                round
                dense
                push
                style="margin-right: 10px"
              />
            </router-link>
            <router-link class="lg4" to="/Principal/Home">
              <q-btn
                icon="home"
                color="black"
                title="Menu"
                round
                dense
                push
                style="margin-right: 10px"
              />
            </router-link>

            <q-btn
              href="https://trapicheon.bio.link/?_gl=1*1rv7zld*_gcl_au*MTc2ODY3NjQyMS4xNjg0MDM2NDM2"
              icon="support"
              color="black"
              title="Soporte"
              round
              dense
              push
              style="margin-right: 10px"
            />
          </div>
        </center>
        <router-view></router-view>
      </q-page-container>
    </q-layout>

    <footer>
      <div>
        <q-layout view="lHh lpr lFf" style="min-height: fit-content">
          <q-footer reveal elevated style="background-color: #009688">
            <q-toolbar>
              <q-toolbar-title class="text" title="Copyright Trapiche On 2023"
                >Copyright Trapiche On 2023</q-toolbar-title
              >
            </q-toolbar>
          </q-footer>
        </q-layout>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const drawer = ref(false);
    const miniState = ref(true);

    const closeDrawer = () => {
      if (drawer.value) {
        drawer.value = false;
      }
    };

    const openDrawer = () => {
      if (!drawer.value) {
        drawer.value = true;
      }
    };

    return {
      drawer,
      miniState,
      closeDrawer,
      openDrawer,
    };
  },
};
</script>

<style scoped>
.lg4 {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.text {
  text-align: center;
  font-size: small;
  padding: auto;
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
