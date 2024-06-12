<template>
  <HeaderLayouts></HeaderLayouts>
  <div class="wrapper-page">
    <transition name="v" mode="in-out">
      <router-view></router-view>
    </transition>
    <FooterLayout></FooterLayout>
  </div>
</template>

<script lang="js" setup>
import HeaderLayouts from './components/layouts/HeaderLayouts.vue'
import { onMounted } from 'vue'
import { useAuthentication } from './stores/authentication'
import FooterLayout from './components/layouts/FooterLayout.vue'

const { getToken } = useAuthentication()
onMounted(() => {
  getToken()
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
:root {
  --primary: #cd241f;
  --secondary: #ab211c;
  --dark: #17252a;
  --light: #feffff;
}
* {
  list-style: none;
  text-decoration: none;
  font-family: roboto;
}
a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: rgb(227, 227, 227);
  }
}
.container {
  max-width: 1350px;
  margin: 0px auto;
}
.wrapper-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 100px);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: #dedede;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--primary-light);
  border-radius: 5px;
}
</style>
