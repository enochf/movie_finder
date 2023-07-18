import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB1v2LkWJzIw0WjZNsrGOixAz7N1KNiVOo",
    authDomain: "movie-finder-333bd.firebaseapp.com",
    projectId: "movie-finder-333bd",
    storageBucket: "movie-finder-333bd.appspot.com",
    messagingSenderId: "649930756536",
    appId: "1:649930756536:web:2f609ccc00e226aea6ff4d",
    measurementId: "G-4BDCXR6EFS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// utils
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db };






// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// // 👆 This example is using Auth + Firestore

// var firebaseConfig = {
//     apiKey: "AIzaSyB1v2LkWJzIw0WjZNsrGOixAz7N1KNiVOo",
//     authDomain: "movie-finder-333bd.firebaseapp.com",
//     projectId: "movie-finder-333bd",
//     storageBucket: "movie-finder-333bd.appspot.com",
//     messagingSenderId: "649930756536",
//     appId: "1:649930756536:web:2f609ccc00e226aea6ff4d",
//     measurementId: "G-4BDCXR6EFS"
// };
// firebase.initializeApp(firebaseConfig);

// // utils
// const db = firebase.firestore();
// const auth = firebase.auth();

// // collections
// const usersCollection = db.collection("users");
// const recipeCollection = db.collection("recipe");
// // 👆 Here you create your Collections you want to use later

// // 👇 You export things here | update the variable names
// export { db, auth, usersCollection, recipeCollection };