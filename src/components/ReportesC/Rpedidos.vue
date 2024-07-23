<template>
    <div class="q-pa-mn">
      <q-layout view="lHh Lpr lff" style="height: auto">
        <q-page-container>
          <!-- <h4
                      style="
                        text-align: center;
                        margin-top: 20px;
                        font-weight: bold;
                        margin-bottom: 25px;
                      "
                    >
                      Personas
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
                Reportes ‣ Pedidos
              </p>
            </div>
          </center>
  
          <template>
            <q-table :rows="tableData" :columns="columns" row-key="id">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-for="col in columns" :key="col.name" :props="props">
                    {{ props.row[col.name] }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </template>
        </q-page-container>
      </q-layout>
    </div>
  </template>
  
  <script></script>
  
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