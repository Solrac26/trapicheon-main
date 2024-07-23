<template>
  <div class="login-form">
    <q-card class="q-pa-md" style="max-width: 400px; border-radius: 10px">
      <q-card-section>
        <center>
          <img class="imgg2" src="https://i.ibb.co/3kb0gFw/A.gif" />
        </center>
        <q-form @submit="handleSubmit" class="q-gutter-md">
          <q-input
            v-model="email"
            label="Correo electrónico"
            dense
            outlined
            type="email"
            :rules="[
              (val) => !!val ||'Ingrese un correo electronico valido',
              (val) => !!val.includes('@gmail.com') || 'El correo debe tener @gmail.com'
            ]"
          />
          <q-input
            dense
            outlined
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :rules="[
              (val) => !!val || 'Ingrese una contraseña válida',
            ]"
            label="Contraseña"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                @click="togglePasswordVisibility()"
              />
            </template>
          </q-input>

          <q-btn
              push
              class="q-mt-md"
              type="submit"
              color="teal"
              label="Iniciar sesión"
          />

          <router-link class="lg4" to="/RegisterNuevo">
            <q-btn
              push
              class="q-mt-md"
              color="teal"
              label="Registrarme"
              @click="goToRegistrationPage"
            />
          </router-link>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { UserStore } from '../stores/user.js'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

export default {
  data() {
    let email= ref("");
    let password= ref("");
    let showPassword= ref(false);
    let isLoading= ref(false);
    const $q = useQuasar()
    
    const store = UserStore()

    const router = useRouter()

    async function handleSubmit() {
      
        const {data, status} = await store.login({
          correo: email.value,
          contrasena: password.value
        })
        
        console.log(data)

        if(status == 200) {
          router.push('/Principal/Home')
        } else {
          $q.notify({
            type: "negative",
            message: data,
            position: "top"
          })
        }
    }

    return {
      email,
      password,
      showPassword,
      isLoading,
      handleSubmit,
    };
  },
  computed: {
  },

  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.login-form {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  background-image: url("https://i.ibb.co/s6xPxbp/TR.png"); /* Ruta de la imagen que deseas usar */
  background-size: cover; /* Ajusta el tamaño de la imagen para cubrir todo el elemento */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  background-position: center; /* Centra la imagen en el elemento */
  background-color: #f1f1f1; /* Color de fondo de respaldo */
}

.imgg2 {
  height: 200px;
}

.lg4 {
  text-decoration: none;
  color: white;
}

@media screen and (max-width: 700px) {
  .imgg2 {
    height: 200px;
  }
}

@media screen and (max-width: 500px) {
  .imgg2 {
    height: 200px;
  }
}

@media screen and (max-width: 400px) {
  .imgg2 {
    height: 200px;
  }
}
</style>
