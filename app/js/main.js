document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  updateUser(loggedIn);
  if (loggedIn) startInactivityTimer();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const userHint = document.getElementById("userHint");
  const passHint = document.getElementById("passHint");

  usernameInput.addEventListener("focus", () => {
    userHint.classList.add("show");
  });

  usernameInput.addEventListener("blur", () => {
    userHint.classList.remove("show");
  });

  passwordInput.addEventListener("focus", () => {
    passHint.classList.add("show");
  });

  passwordInput.addEventListener("blur", () => {
    passHint.classList.remove("show");
  });
});
