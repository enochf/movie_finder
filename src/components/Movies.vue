<template>
  <div class="container">
    <Suspense>
      <MovieDetails v-if="(getDetails)" :id="id" :thumb="thumb" :title="title" @close="closeDetails" />
    </Suspense>
    <h1>Movies</h1>
    <div v-if="isMovies" class="movies">
      <div v-for="movie in movies" :key="movie.id" class="movie" @click="showDetails(movie)" :style="{backgroundImage:`url(${movie.thumb})`}" :url="movie.thumb" thumb="{{ movie.thumb }}" :title="movie.title"></div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
    <div v-else class="loading">Loading movies....</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MovieDetails from './MovieDetails.vue';

const movies = ref([])
const isMovies = ref(false)
// const url = 'http://192.168.68.66:32400/library/sections/1/all?X-Plex-Token=QY-DfGJysjYiNRVRuKaw'
const url = 'http://64.98.235.77:27270/library/sections/1/all?X-Plex-Token=' + PLEX_TOKEN
const getDetails = ref(false)
const id = ref(null)
const thumb = ref(null)
const title = ref(null)

const emit = defineEmits(['getDetails'])

const showDetails = (movie) => {
  id.value = movie.id
  thumb.value = movie.thumb
  title.value = movie.title
  // emit('getDetails', movie)
  getDetails.value = true
}

const closeDetails = () => {
  getDetails.value = false
}

fetch(url).then(response => {
  return response.text()
}).then(xmlString => {
  const xmlDocument = new DOMParser().parseFromString(xmlString, 'text/xml')
  const videos = xmlDocument.querySelectorAll('Video')
  
  for (const video of videos) {
    const videoId = video.getAttribute('title').replaceAll(' ', '_').replaceAll('&', 'and').replaceAll('\'', '').toLowerCase()
    const videoTitle = video.getAttribute('title')
    const videoThumb = 'http://64.98.235.77:27270' + video.getAttribute('thumb') + '?X-Plex-Token=QY-DfGJysjYiNRVRuKaw'
    
    movies.value.push( { id: videoId, title: videoTitle, thumb: videoThumb } )
  }
  isMovies.value = true
})

</script>

<style scoped>
.loading {
  color:#008cff;
  font-size:2em;
}
.movies {
  /* display:flex;
  justify-content:left; */
  text-align:center;
}
.movie {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.2);
  margin:2%;
  background-size:cover;
}
.movie:hover {
  cursor:pointer;
}
</style>
