// NAVBAR UNTUK VERSI MOBILE ATAU HP
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  toggleButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
});
