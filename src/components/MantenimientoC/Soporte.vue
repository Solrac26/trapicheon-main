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
                Mantenimiento ‣ Soporte
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
  
  <script>
</script>
  
  <style scoped>
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
  
</style>