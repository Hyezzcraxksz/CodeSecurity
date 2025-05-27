import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase Config
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

// DOM Elements
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const status = document.getElementById("status");

// Tab Toggle Logic
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  status.textContent = "";
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  status.textContent = "";
});

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      status.textContent = `Logged in as ${cred.user.email}`;
      loginForm.reset();
    })
    .catch((err) => {
      status.textContent = `Error: ${err.message}`;
    });
});

// Register
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      status.textContent = `Account created for ${cred.user.email}`;
      registerForm.reset();
    })
    .catch((err) => {
      status.textContent = `Error: ${err.message}`;
    });
});

// Google Login
document.getElementById("google-login").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      status.textContent = `Welcome, ${result.user.displayName}`;
    })
    .catch((err) => {
      status.textContent = `Google Login Error: ${err.message}`;
    });
});
