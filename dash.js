const userData = JSON.parse(sessionStorage.getItem("user"));
if (!userData) {
  alert("Unauthorized access!");
  window.location.href = "index.html";
} else {
  document.getElementById("studentName").textContent = userData.username;
  document.getElementById("studentId").textContent = userData.id;
  document.getElementById("studentRole").textContent = userData.role;
  fetch("grades.json")
    .then((res) => res.json())
    .then((data) => {
      const studentRecord = data[userData.id];
      if (studentRecord) {
        const gradeList = document.getElementById("gradeList");
        for (const subject in studentRecord.grades) {
          const li = document.createElement("li");
          li.textContent = `${subject}: ${studentRecord.grades[subject]}`;
          gradeList.appendChild(li);
        }
        document.getElementById("attendance").textContent = studentRecord.attendance;
      } else {
        document.getElementById("attendance").textContent = "No data found.";
      }
    })
    .catch((err) => {
      console.error("Error loading grades.json:", err);
      document.getElementById("attendance").textContent = "Error loading data.";
    });
}
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}
function switchAccount() {
  sessionStorage.clear();
  window.location.href = "index.html";
}
