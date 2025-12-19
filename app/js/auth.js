const correctUsername = "pricing_section";
const correctPassword = "01977772188";
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
// const userHint = document.getElementById("userHint");
// const passHint = document.getElementById("passHint");

// usernameInput.addEventListener("focus", () => {
//   userHint.style.display = "block";
//   userHint.classList.add("show");
// });

// usernameInput.addEventListener("blur", () => {
//   userHint.style.display = "none";
// //   userHint.classList.remove("show");
// });

// passwordInput.addEventListener("focus", () => {
//   passHint.style.display = "block";
//   passHint.classList.add("show");
// });

// passwordInput.addEventListener("blur", () => {
//   passHint.style.display = "none";
// //   passHint.classList.remove("show");
// });
// usernameInput.addEventListener("focus", () => {
//   userHint.classList.add("show");
// });

// usernameInput.addEventListener("blur", () => {
//   userHint.classList.remove("show");
// });

// passwordInput.addEventListener("focus", () => {
//   passHint.classList.add("show");
// });

// passwordInput.addEventListener("blur", () => {
//   passHint.classList.remove("show");
// });

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});
function login() {
  const userInput = document.getElementById("username").value.trim();
  const passInput = document.getElementById("password").value.trim();

  if (userInput === correctUsername && passInput === correctPassword) {
    localStorage.setItem("loggedIn", "true");
    updateUser(true);
    startInactivityTimer();
  } else {
    alert("Incorrect username or password");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  clearTimeout(inactivityTimer);
  updateUser(false);
}

function updateUser(isLoggedIn) {
  //   const status = document.getElementById("userStatus");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const card = document.querySelector(".card");
  const authBar = document.getElementById("authBar");

  if (isLoggedIn) {
    // status.textContent = `Signed in as: ${correctUsername}`;
    loginForm.style.display = "none";
    logoutBtn.style.display = "inline-block";
    card.style.display = "block";
    authBar.style.display = "none";
  } else {
    // status.textContent = "Not signed in";
    loginForm.style.display = "block";
    logoutBtn.style.display = "none";
    card.style.display = "none";
    authBar.style.display = "flex";
  }
}
