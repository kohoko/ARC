document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".hover-navbar a, .hover-sidebar a");

  window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(`#${sectionId}`)) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});