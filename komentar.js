// komentar.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formKomentar");
  const input = document.getElementById("inputKomentar");
  const list = document.getElementById("listKomentar");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isiKomentar = input.value.trim();
    if (isiKomentar !== "") {
      const item = document.createElement("div");
      item.className = "komentar-item";
      item.textContent = isiKomentar;

      list.appendChild(item);
      input.value = "";
    }
  });
});
