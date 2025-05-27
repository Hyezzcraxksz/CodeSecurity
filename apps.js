import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config
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
const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");
const mainBtn = document.getElementById("main-action-btn");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const googleBtn = document.getElementById("google-login-btn");

let mode = "login";

// Tab Switching
loginTab.addEventListener("click", () => {
  mode = "login";
  mainBtn.textContent = "Login";
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  status.textContent = "";
});

registerTab.addEventListener("click", () => {
  mode = "register";
  mainBtn.textContent = "Register";
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  status.textContent = "";
});

// Main Action (Login or Register)
mainBtn.addEventListener("click", () => {
  const emailVal = email.value.trim();
  const passVal = password.value.trim();

  if (!emailVal || !passVal) {
    status.textContent = "Please fill in all fields.";
    return;
  }

  if (mode === "login") {
    signInWithEmailAndPassword(auth, emailVal, passVal)
      .then(() => (window.location.href = "dashboard.html"))
      .catch(err => status.textContent = "Login Error: " + err.message);
  } else {
    createUserWithEmailAndPassword(auth, emailVal, passVal)
      .then(() => (window.location.href = "dashboard.html"))
      .catch(err => status.textContent = "Register Error: " + err.message);
  }
});

// Google Login
googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => status.textContent = "Google Login Error: " + err.message);
});
