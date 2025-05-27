import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");
const mainBtn = document.getElementById("main-action-btn");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const googleBtn = document.getElementById("google-login-btn");

let mode = "login";

// Tab switching
loginTab.addEventListener("click", () => {
  mode = "login";
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  mainBtn.textContent = "Login";
  status.textContent = "";
});

registerTab.addEventListener("click", () => {
  mode = "register";
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  mainBtn.textContent = "Register";
  status.textContent = "";
});

// Main action
mainBtn.addEventListener("click", () => {
  const userEmail = email.value.trim();
  const userPass = password.value.trim();

  if (!userEmail || !userPass) {
    status.textContent = "Fill in both fields.";
    return;
  }

  if (mode === "login") {
    signInWithEmailAndPassword(auth, userEmail, userPass)
      .then(() => window.location.href = "dashboard.html")
      .catch(err => status.textContent = "Login Error: " + err.message);
  } else {
    createUserWithEmailAndPassword(auth, userEmail, userPass)
      .then(() => window.location.href = "dashboard.html")
      .catch(err => status.textContent = "Register Error: " + err.message);
  }
});

// Google Login
googleBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => status.textContent = "Google Error: " + err.message);
});
