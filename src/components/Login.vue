<template>
    <div class="container">
        <form @submit.prevent="signIn">
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Password" v-model="password" />
            <input type="submit" value="Submit">
            <p class="err">{{ errMsg }}</p>
        </form>
    </div>
</template>
  
<script setup>

import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/init.js'

const emit = defineEmits(['loginSuccess'])

const email = ref('enoch@enochfredericks.com')
const password = ref('N0chbf&*MOVI')
const errMsg = ref('')
  
const signIn = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((user) => {
            emit('loginSuccess')
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

<style scoped>
form {
    margin-top:30%;
    width:100%;
    text-align:center;
}
input[type="email"],
input[type="password"],
input[type="submit"] {
    display:block;
    padding:10px;
    margin:0 auto;
    margin-bottom:20px;
    width:70%;
    max-width:400px;
    border:3px solid rgba(255,255,255,.2);
    border-radius:8px;
    background-color:rgba(255,255,255,.05);
    font-size:1.6em;
    color:#008cff;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}
input[type="submit"] {
    background-color:rgba(0, 140, 255, .3);
    cursor:pointer;
}
.err {
    font-size:1.6em;
    color:#f1304a;
}
</style>