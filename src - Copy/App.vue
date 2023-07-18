<template>
  <nav>
    <router-link :to="{ name: 'movies' }" v-if="isLoggedIn"> Movies </router-link>
    <router-link :to="{ name: 'binders' }" v-if="isLoggedIn"> Binders </router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
  </nav>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from './router';

const isLoggedIn = ref(false)

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push({name: 'login'})
  })
}

</script>

<style>

/* * {
  border:1px solid red;
} */

body {
  margin: 0;
  height: 100vh;
  font-family: "Lato", sans-serif;
  /* font-weight: bold; */
  font-size: 10px;
  /* text-transform: uppercase; */
  
}

#app {
  position:fixed;
  overflow: scroll;
  top:0;
  bottom:0;
  right:0;
  /* display: flex; */
  transition: background-color 5s;
  background-color: #252525;
  background-image: linear-gradient(160deg, #000 0%, #003561 100%);
}

.container {
  margin: auto;
  padding:0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border:1px solid red; */
}

nav {
  text-align:center;
  /* padding:20px; */
  /* display:flex;
  flex-direction:column;
  justify-content:space-evenly; */
  border-bottom:1px solid #003561;
}
nav a {
  display:inline-flex;
  color:#008cff;
  font-size:1.6em;
  font-weight:bold;
  text-decoration:none;
  padding:20px 30px;
}

h1 {
  font-size:3em;
  color:#fff;
}

h2 {
  color:#fff;
}

p {
  color:#fff;
}
</style>