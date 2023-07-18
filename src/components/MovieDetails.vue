<template>
  <!-- movie details -->
  <div v-if="movie.data" class="details">
    <div class="centered">
      <h1>{{ movie.title }}</h1>
      <div class="cover" :style="{backgroundImage:`url(${movie.thumb})`}"></div>
      <div class="data">
        <p>Do I Own This: <span>{{ movie.data.owned ? 'Yes' : 'No' }}</span></p>
        <p>Edited: <span>{{ movie.data.edited ? 'Yes' : 'No' }}</span></p>
        <p>Binder: <span>{{ binder.name }}</span></p>
        <p>Page #: <span>{{ movie.data.page }}</span></p>
        <button @click="closeDetails">Close</button>
      </div>
    </div>
  </div>
  <!-- add new movie -->
  <div v-else class="details">
    <div class="centered">
      <h1>Add Movie Details For:</h1>
      <h2>{{ movie.id }}</h2>
      <div class="data">
        <p>
          Title:
          <span>
            <input type="text" placeholder="Title" v-model="title" />
          </span>
        </p>
        <p>
          Owned:
          <span>
            <input type="radio" value="1" v-model="owned" />
            <label>Yes</label>
            <input type="radio" value="0" v-model="owned" />
            <label>No</label>
          </span>
        </p>
        <p>
          Edited:
          <span>
            <input type="radio" value="1" v-model="edited" />
            <label>Yes</label>
            <input type="radio" value="0" v-model="edited" />
            <label>No</label>
          </span>
        </p>
        <p>
          Rating:
          <span>
            <select v-model="rating">
              <option value="Not Rated">Not Rated</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG13">PG13</option>
            </select>
          </span>
        </p>
        <p v-if="binders">
          Binder:
          <span>
            <select v-model="binder">
              <option v-for="binder in binders" :key="binder.id" :value="binder.id">{{ binder.name }}</option>
            </select>
          </span>
        </p>
        <p>
          Page #:
          <span>
            <input type="text" placeholder="Page #" v-model="pageNum" />
          </span>
        </p>
        <button @click="addMovie">Add Movie</button>
        <button @click="closeDetails">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { doc, query, collection, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/init.js";

const props = defineProps({
  id: String,
  title: String,
  thumb: String
});

const emit = defineEmits(['close'])

// data storage

const movie = ref({
  id: props.id,
  title: props.title,
  thumb: props.thumb
})

const binders = ref([])

const title = ref(props.title)
const owned = ref(false)
const edited = ref(false)
const rating = ref('Not Rated')
const binder = ref(null)
const pageNum = ref(null)

const resetBinder = ref(false)

// functions

const closeDetails = () => {
  emit('close')
}

// API data

// get movie from firebase
const docRefMovie = doc(db, "movies", movie.value.id)
const docSnapMovie = await getDoc(docRefMovie)

if (docSnapMovie.exists()) {
  movie.value.data = docSnapMovie.data()
} else {
  const q = query(collection(db, "binders"))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    binders.value.push(doc.data())
    binders.value[binders.value.length-1].id = doc['_document'].key.path.segments[6]
  })
}

// get binder from firebase
if (movie.value.data) {
  const docRefBinder = doc(db, "binders", movie.value.data.binder.toString())
  const docSnapBinder = await getDoc(docRefBinder)

  if (docSnapBinder.exists()) {
      binder.value = docSnapBinder.data()
  } else {
      console.log("No such document!");
  }
}

const addMovie = async () => {
  const newMovieData = {
    title: title.value,
    owned: Boolean(owned.value),
    edited: Boolean(edited.value),
    rating: rating.value,
    binder: Number(binder.value),
    page: Number(pageNum.value)
  }
  const newMovie = await setDoc(doc(db, "movies", movie.value.id), newMovieData)
  movie.value = {
    id: movie.value.id,
    title: newMovieData.title,
    thumb: movie.value.thumb,
    data: {
      edited: newMovieData.edited,
      owned: newMovieData.owned,
      rating: newMovieData.rating,
      binder: newMovieData.binder,
      page: newMovieData.page,
    }
  }
  resetBinder.value = true
}

</script>

<style scoped>
.details {
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  padding:20px;
  border:none;
  border-radius:20px;
  background-color:rgba(0,0,0,.9);
  text-align: center;
}
.centered {
  margin:0 auto;
  max-width:400px;
}
.cover {
  display: inline-block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.3);
  margin: 2%;
  margin-bottom:20px;
  background-size:cover;
}
.data {
    width:100%;
}
.data p {
    display:flex;
    justify-content:space-between;
    font-size: 2em;
    padding:20px 10px;
    border-bottom:1px solid #003561;
    margin:0px;
}
.data span {
    display: flexbox;
}
button {
  display:block;
  padding:10px;
  margin:0 auto;
  margin-top:30px;
  width:70%;
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
