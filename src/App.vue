<template>
  <Navigation v-if="isLoggedIn" @signOutSuccess="handleSignOut" @setNav="handleNav($event)" />
  <Suspense>
    <Login v-if="!isLoggedIn" @loginSuccess="updateLogin" />
  </Suspense>
  <Suspense>
    <Movies v-if="(isLoggedIn && page == 'movies')" @getDetails="handleGetDetails($event)" />
  </Suspense>
</template>

<script setup>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Navigation from './components/Navigation.vue'
import Movies from './components/Movies.vue'

const isLoggedIn = ref(false)
const myMovie = ref(null)
const page = ref('')

const updateLogin = () => {
  isLoggedIn.value = true
  page.value = 'movies'
}

const handleSignOut = () => {
  isLoggedIn.value = false
}

const handleNav = (nav) => {
  page.value = nav
}

const handleGetDetails = (movie) => { 
  myMovie.value = movie
  page.value = 'details'
}

</script>

<style>

/* * {
  border:1px solid red;
} */

body {
  margin: 0;
  /* height: 100vh; */
  font-family: "Lato", sans-serif;
  /* font-weight: bold; */
  font-size: 10px;
  /* text-transform: uppercase; */
  
}

#app {
  position:absolute;
  overflow: scroll;
  top:0;
  bottom:0;
  right:0;
  left:0;
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