<template>
    <div class="login-form">
      <q-card class="card q-pa-md" style="max-width: 400px; border-radius: 10px;">
        <q-card-section>
          <center>
            <img class="imgg2" src="https://i.ibb.co/7CdHX59/B.gif" />
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
              v-model="firstName"
              label="Nombre"
              dense
              outlined
              :rules="[val => !!val || 'Este campo es requerido']"
          />

            <q-input
              v-model="lastName"
              label="Teléfono"
              dense
              outlined
              type="number"
              :rules="[
                (val) => !!val || 'Ingrese un número telefonico',
                (val) => val && val.toString().length >= 10 || 'Debes ingresar al menos 10 números'
                ]"
/>
            <q-input
              dense
              outlined
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              :rules="[
              (val) => !!val || 'Ingrese una contraseña válida',
              (val) =>
                /^(?=.*[a-zA-Z])(?=.*\d).{5,10}$/.test(val) ||
                'La contraseña debe tener entre 5 y 10 caracteres y contener letras y números',
            ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility' : 'visibility_off'"
                  @click="togglePasswordVisibility()"
                />
                
              </template>
            </q-input>
  
            <router-link class="lg4" :to="isFormValid ? '/Principal/Home' : ''">
            <q-btn
              push
              class="q-mt-md"
              type="submit"
              color="teal"
              :disabled="!isFormValid"
              label="Registrarme"
              :loading="isLoading"
              :class="!isLoading"
            />
            </router-link>
  
            <router-link class="lg4" to="/">
            <q-btn
              push
              class="q-mt-md"
              color="teal"
              label="Tengo Cuenta"
              @click="goToRegistrationPage"
            />
            </router-link>

          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
        showPassword: false,
        isLoading: false,
      };
    },
    computed: {
      isFormValid() {
        return !!this.email && !!this.password;
      },
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
    background-image: url('https://i.ibb.co/s6xPxbp/TR.png'); /* Ruta de la imagen que deseas usar */
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
  