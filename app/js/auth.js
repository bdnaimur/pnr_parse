const correctUsername = "pricing_section";
const correctPassword = "01977772188";

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
  const status = document.getElementById("userStatus");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const card = document.querySelector(".card");

  if (isLoggedIn) {
    status.textContent = `Signed in as: ${correctUsername}`;
    loginForm.style.display = "none";
    logoutBtn.style.display = "inline-block";
    card.style.display = "block";
  } else {
    status.textContent = "Not signed in";
    loginForm.style.display = "block";
    logoutBtn.style.display = "none";
    card.style.display = "none";
  }
}
