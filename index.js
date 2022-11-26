import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword ,

} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

document.getElementById('login-form').addEventListener('submit', event => {event.preventDefault();})

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        location.replace("welcome.html");
    }
})

function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("we are signed in successfully");
}