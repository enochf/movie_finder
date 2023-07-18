<template>
  <button @click="handleSignOut">Sign Out</button>
  <nav>
    <a @click="handleNav('movies')">Movies</a>
    <a @click="handleNav('binders')">Binders</a>
  </nav>
</template>

<script setup>

const emit = defineEmits(['signOutSuccess', 'setNav'])

const handleNav = (nav) => {
    emit('setNav', nav)
}

const handleSignOut = () => {
    emit('signOutSuccess')
}

</script>

<style scoped>

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
  padding:40px 30px;
  cursor:pointer;
}

button {
  display:block;
  float:right;
  padding:10px;
  margin:25px 30px;
  max-width:400px;
  border:3px solid rgba(255,255,255,.2);
  border-radius:8px;
  background-color:rgba(0, 140, 255, .4);
  font-size:1.6em;
  color:#008cff;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  cursor:pointer;
}

</style>