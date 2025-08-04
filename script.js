document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.toLowerCase();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const res = await fetch("users.json");
    const data = await res.json();

    const userList = data[role + "s"]; // → "students" or "admins"
    const user = userList.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      localStorage.setItem("role", role);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("errorMsg").textContent = "Invalid credentials!";
    }
  } catch (err) {
    document.getElementById("errorMsg").textContent = "Unable to load users.";
  }
});
