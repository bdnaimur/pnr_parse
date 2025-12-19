document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  updateUser(loggedIn);
  if (loggedIn) startInactivityTimer();
});
