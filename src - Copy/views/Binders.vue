<template>
    <div class="container">
        <h1>All Binders</h1>
        <div v-if="isBinders">
          <div v-for="binder in binders" :key="binder.id">
            <h2>{{ binder.name }}</h2>
          </div>
        </div>
        <div v-else>No binders yet</div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/init.js";

let binders = ref([]);
let isBinders = ref(false);

const results = await getDocs(collection(db, "binders"));

results.forEach((doc) => {
  binders.value.push(doc.data());
  isBinders.value = true;
});
</script>

<style></style>
