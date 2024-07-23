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
              Inventario ‣ Productos
            </p>
          </div>
        </center>

        <div>
          <div class="q-pa-md">
            <div style="text-align: right">
              <q-btn
                elevated
                push
                icon="add_box"
                color="teal"
                label="Nuevo Registro"
                style="margin-bottom: 20px"
                @click="guardar"
              ></q-btn>
            </div>

            <q-table :rows="rows" :columns="columns">
              <template v-slot:body-cell-estado="props">
                <td
                  v-if="props.row.estado == 1"
                  style="color: teal; text-align: center; font-weight: bold"
                >
                  ACTIVO
                </td>
                <td
                  v-else
                  style="color: red; text-align: center; font-weight: bold"
                >
                  INACTIVO
                </td>
              </template>
              <template v-slot:body-cell-opcion="props">
                <td style="text-align: center">
                  <q-btn
                    @click="edit(props.row)"
                    class=""
                    icon="edit"
                    color="black"
                    title="Editar"
                    round
                    dense
                    push
                    style="margin-right: 10px"
                  />
                  <q-btn
                    v-if="props.row.estado == 1"
                    @click="inactive(props.row)"
                    icon="toggle_on"
                    color="teal"
                    title="Inactivar"
                    round
                    dense
                    push
                    style="margin-right: 10px"
                  />
                  <q-btn
                    v-else
                    @click="active(props.row)"
                    icon="toggle_off"
                    color="red"
                    title="Activar"
                    round
                    dense
                    push
                    style="margin-right: 10px"
                  />
                </td>
              </template>
            </q-table>
          </div>

          <q-dialog
            v-model="nuevo"
            persistent
            transition-show="scale"
            transition-hide="scale"
          >
          <q-card style="width: 300px">
              <q-card-section style="background-color: teal">
                <div class="text-h6" style="color: #ffffff">
                  <center>
                    {{ bd == 0 ? "Nuevo Registro" : "Editar Registro" }}
                  </center>
                </div>
              </q-card-section>

              <q-card-section>
                <q-input
                  dense
                  outlined
                  v-model="nombreProducto"
                  label="Nombre del Producto"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="nombreMarca"
                  label="Nombre de la Marca"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-select
                  dense
                  outlined
                  v-model="categoriaProducto"
                  label="Categoria de Productos"
                  :options="['Semilla', 'Cítrico', 'Empaques', 'Batidores']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="cantidadProducto"
                  label="Cantidad del Producto"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="number"
                />
                <p style="margin-left: 10px; opacity: 0.5;">Fecha de Entrada</p>
                <q-input
                  dense
                  outlined
                  v-model="fecha"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="date"
                />
                <p style="margin-left: 10px; opacity: 0.5;">Fecha de Vencimiento</p>
                <q-input
                  dense
                  outlined
                  v-model="tiempoVidaUtil"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="date"
                />
              </q-card-section>
              <q-card-actions
                align="center"
                class="bg-white"
                style="margin-bottom: 20px"
              >
                <q-btn
                  elevated
                  push
                  color="teal"
                  label="Cancelar"
                  @click="nuevo = false"
                />
                <q-btn elevated push color="teal" @click="guardarEditarDatos">
                  {{ bd === 0 ? "Guardar" : "Editar" }}
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { productoStore } from "../../stores/Productos.js";
import { useQuasar } from "quasar";

const q = useQuasar();
const producto = productoStore();
let rows = ref();

let nombreProducto = ref("");
let nombreMarca = ref("");
let categoriaProducto = ref("");
let cantidadProducto = ref("");
let fecha = ref("");
let tiempoVidaUtil = ref("");

let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let columns = ref([
  {
    name: "nombreProducto",
    required: true,
    label: "Nombre del Producto",
    align: "left",
    field: "nombreProducto",
    sortable: false,
  },
  {
    name: "nombreMarca",
    required: true,
    label: "Nombre de la Marca",
    align: "left",
    field: "nombreMarca",
    sortable: false,
  },
  {
    name: "categoriaProducto",
    required: true,
    label: "Categoria de Productos",
    align: "left",
    field: "categoriaProducto",
    sortable: false,
  },
  {
    name: "cantidadProducto",
    required: true,
    label: "Cantidad del Producto",
    align: "left",
    field: "cantidadProducto",
    sortable: false,
  },
  {
    name: "fecha",
    required: true,
    label: "Fecha de Entrada",
    align: "left",
    field: "fecha",
    sortable: false,
  },
  {
    name: "tiempoVidaUtil",
    required: true,
    label: "Fecha de Vencimiento",
    align: "left",
    field: "tiempoVidaUtil",
    sortable: false,
  },

  {
    name: "estado",
    label: "Estado",
    field: "estado",
    align: "center",
  },

  {
    name: "opcion",
    label: "Opciones",
    field: "",
    sortable: true,
    align: "center",
  },
]);

const listarproductosI = async () => {
  rows.value = await producto.getproductosI();
};

listarproductosI();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreProducto.value = row.nombreProducto;
  nombreMarca.value = row.nombreMarca;
  categoriaProducto.value = row.categoriaProducto;
  cantidadProducto.value = row.cantidadProducto;
  fecha.value = row.fecha;
  tiempoVidaUtil.value = row.tiempoVidaUtil;
}

function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

async function inactive(props) {
  console.log("desactivado", props.nombreProducto);
  let res = await producto.inactiveproductosI(props._id);
  listarproductosI();
}

async function active(props) {
  console.log("activado", props.nombreProducto);
  let res = await producto.activeproductosI(props._id);
  listarproductosI();
}

function limpiarFormulario() {
  nombreProducto.value = "";
  nombreMarca.value = "";
  categoriaProducto.value = "";
  cantidadProducto.value = "";
  fecha.value = "";
  tiempoVidaUtil.value = "";
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombreProducto.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de producto válido.",
        position: "top",
      });
      return;
    }

    if (nombreMarca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de marca válida.",
        position: "top",
      });
      return;
    }

    if (categoriaProducto.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una categoría válida.",
        position: "top",
      });
      return;
    }

    if (cantidadProducto.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una cantidad válida.",
        position: "top",
      });
      return;
    }

    if (fecha.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha de entrada válida.",
        position: "top",
      });
      return;
    }

    if (tiempoVidaUtil.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha de vencimiento válida.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreProducto: nombreProducto.value,
      nombreMarca: nombreMarca.value,
      categoriaProducto: categoriaProducto.value,
      cantidadProducto: cantidadProducto.value,
      fecha: fecha.value,
      tiempoVidaUtil: tiempoVidaUtil.value,
      estado: 0,
    };

    let res = await producto.addproductosI(datos);

    listarproductosI();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Producto añadida exitosamente.",
      position: "top",
      progress: true,
    });
  } else {
    if (nombreProducto.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de producto válido.",
        position: "top",
      });
      return;
    }

    if (nombreMarca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de marca válida.",
        position: "top",
      });
      return;
    }

    if (categoriaProducto.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una categoría válida.",
        position: "top",
      });
      return;
    }

    if (cantidadProducto.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una cantidad válida.",
        position: "top",
      });
      return;
    }

    if (fecha.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha de entrada válida.",
        position: "top",
      });
      return;
    }

    if (tiempoVidaUtil.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha de vencimiento válida.",
        position: "top",
      });
      return;
    }
    const datos = {
      nombreProducto: nombreProducto.value,
      nombreMarca: nombreMarca.value,
      categoriaProducto: categoriaProducto.value,
      cantidadProducto: cantidadProducto.value,
      fecha: fecha.value,
      tiempoVidaUtil: tiempoVidaUtil.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await producto.editproductosI(_id, datos);
    listarproductosI();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Producto actualizado exitosamente.",
      position: "top",
      progress: true,
    });
  }
}

listarproductosI();
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
  z-index: 9999;
  /* Asegúrate de que el z-index sea mayor que cualquier otra capa en la página */
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
  grid-template-columns: repeat(3, 2fr);
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
