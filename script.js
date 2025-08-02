document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");
  try {
    const response = await fetch("users.json");
    const users = await response.json();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      errorDiv.style.display = "none";
      sessionStorage.setItem("user", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      errorDiv.textContent = "Invalid username or password.";
      errorDiv.style.display = "block";
    }
  } catch (err) {
    console.error("Error loading users.json:", err);
    errorDiv.textContent = "Unable to load user data.";
    errorDiv.style.display = "block";
  }
});
