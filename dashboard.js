import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
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

// Auth guard
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    document.querySelector("h1").textContent = `Welcome, ${user.displayName || user.email}`;
  }
});

// Logout button
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
});

// Live search
document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    const title = card.getAttribute("data-title").toLowerCase();
    card.style.display = title.includes(value) ? "block" : "none";
  });
});
