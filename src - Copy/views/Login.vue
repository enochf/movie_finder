<template>
    <div class="container">
        <h1>Sign In</h1>
        <form @submit.prevent="signIn">
            <p><input type="text" placeholder="Email" v-model="email" /></p>
            <p><input type="password" placeholder="Password" v-model="password" /></p>
            <p><button>Submit</button></p>
            <p>{{ errMsg }}</p>
        </form>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../firebase/init.js'
  
  const email = ref('')
  const password = ref('')
  const errMsg = ref('')
  const router = useRouter()
  
  const signIn = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
          .then((user) => {
              console.log('Successfully logged in!')
              router.push('/movies')
          })
          .catch((error) => {
              console.log(error.code)
              switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email"
                    break
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found"
                    break
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password"
                    break
                default:
                    errMsg.value = "Email or password was incorrect"
                    break
              }
          })
  }
</script>

<style>

</style>