<template>
  <div class="container-login">
    <div class="popup-form">
      <div class="popup-form__switch">
        <button @click="switchData = 0" :class="{ active: switchData == 0 }" class="btn">
          Авторизация
        </button>
        <div class="line"></div>
        <button @click="switchData = 1" :class="{ active: switchData == 1 }" class="btn">
          Регистрация
        </button>
      </div>
      <transition name="switch" mode="out-in">
        <form @submit.prevent="LoginFunc()" v-if="switchData == 0">
          <input class="form-control my-3" v-model="loginData.email" placeholder="email" />
          <input
            class="form-control"
            v-model="loginData.password"
            type="password"
            placeholder="password"
          />
          <p v-if="error">Неверный логин или пароль</p>
          <button class="btn btn-form my-3" type="submit">Вход</button>
        </form>
        <form @submit.prevent="RegistrationFunc()" v-else>
          <input class="form-control my-3" v-model="registrationData.email" placeholder="email" />
          <p v-if="errorText.email">{{ errorText?.email[0] }}</p>
          <input class="form-control my-3" v-model="registrationData.name" placeholder="name" />
          <input
            class="form-control my-3"
            v-model="registrationData.password"
            type="password"
            placeholder="password"
          />
          <p v-if="errorText.password">{{ errorText.password[0] }}</p>
          <input
            class="form-control my-3"
            v-model="registrationData.passwordCheck"
            type="password"
            placeholder="password"
          />
          <p v-for="item in errorText" :key="item">{{ item }}</p>
          <button class="btn btn-form my-3" type="submit">Зарегистрироваться</button>
        </form>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import authentication from '@/composition/authentication'
import { useAuthentication } from '@/stores/authentication'
const authStore = useAuthentication()
const { login, registration } = authentication()
const error = ref(false)
const errorText = ref('')
const loginData = ref({
  email: '',
  password: ''
})
const registrationData = ref({
  email: '',
  name: '',
  password: '',
  passwordCheck: ''
})
let switchData = ref(0)

function LoginFunc() {
  login(loginData.value.email, loginData.value.password)
    .then((res) => {
      localStorage.setItem('Token', res.data.token)
      authStore.getToken()
      router.go(-1)
    })
    .catch((error) => {
      error.value = true
      errorText.value = error.errors
    })
}
function RegistrationFunc() {
  registration(
    registrationData.value.email,
    registrationData.value.name,
    registrationData.value.password,
    registrationData.value.passwordCheck
  )
    .then(() => {
      switchData.value = 0
    })
    .catch((error) => {
      console.error(error.response.data.errors)
      errorText.value = {
        email: error.response.data.errors.email,
        password: error.response.data.errors.password
      }
    })
}
</script>

<style scoped>
.container-login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
.popup-form__switch {
  background-color: var(--primary);
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  .btn {
    color: rgb(255, 255, 255);
    width: 100%;
  }
  .active {
    background-color: rgba(255, 255, 255, 0.148);
    border: 0px;
  }
}
.line {
  width: 1px;
  margin: 5px 0px;
  background-color: rgba(0, 0, 0, 0.258);
}
.popup-form {
  background-color: var(--secondary);
  padding: 2rem;
  width: 40%;
  max-width: 400px;
  border-radius: 12px;
  overflow: hidden;
}
.btn-form {
  width: 100%;
  background-color: azure;
}

.switch-enter-active,
.switch-leave-active {
  transition: transform 0.5s ease;
}
.switch-enter-from,
.switch-leave-to {
  transform: translateX(200%);
}
</style>
