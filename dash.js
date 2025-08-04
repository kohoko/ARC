document.addEventListener("DOMContentLoaded", async () => {
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  if (!user || !role) {
    return window.location.href = "index.html";
  }

  document.getElementById("welcomeText").textContent = `Welcome, ${user.name}`;
  document.getElementById("userId").textContent = user.id || "Admin";
  document.getElementById("userRole").textContent = user.role;
  document.getElementById("profilePhoto").src = user.photo || "admin.png";

  if (role === "student") {
    document.querySelectorAll(".admin-only").forEach(el => el.style.display = "none");

    const grades = user.grades || [
      { subject: "Math", grade: "A" },
      { subject: "English", grade: "B+" }
    ];
    const gradeBody = document.getElementById("gradesTable");
    grades.forEach(g => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${g.subject}</td><td>${g.grade}</td>`;
      gradeBody.appendChild(row);
    });

  } else if (role === "admin") {
    document.querySelectorAll(".student-only").forEach(el => el.style.display = "none");

    const res = await fetch("users.json");
    const data = await res.json();
    const users = data.students;

    const userList = document.getElementById("userList");
    users.forEach(u => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <img src="${u.photo}" />
        <p><strong>${u.name}</strong></p>
        <p>ID: ${u.id}</p>
        <p>Role: ${u.role}</p>`;
      userList.appendChild(card);
    });
  }
});

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}