import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAt1y_W0qeluBWuvUa-CKBI8OQ3PVwr8f4",
  authDomain: "codinghackclass.firebaseapp.com",
  projectId: "codinghackclass",
  storageBucket: "codinghackclass.appspot.com",
  messagingSenderId: "757390386768",
  appId: "1:757390386768:web:5d26196f4f835033799355"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM elements
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const loginBtn = document.getElementById("email-login-btn");
const registerBtn = document.getElementById("email-register-btn");
const googleBtn = document.getElementById("google-login-btn");
const statusText = document.getElementById("status");

// Google login
googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      statusText.textContent = `Google Login Error: ${error.message}`;
    });
});

// Email login
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    statusText.textContent = "Enter both email and password.";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      statusText.textContent = `Login Error: ${error.message}`;
    });
});

// Email register
registerBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    statusText.textContent = "Enter both email and password.";
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      statusText.textContent = `Register Error: ${error.message}`;
    });
});
