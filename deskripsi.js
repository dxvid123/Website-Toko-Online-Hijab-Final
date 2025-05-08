// MENGAMBIL PARAMETER DARI URL YG DI TARUH DI HREF TIAP TIAP PRODUK
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const price = urlParams.get("price");
const image = urlParams.get("image");
const description = urlParams.get("description");

// TAMPILKAN DATA PADA HALALAMAN DESKRIPSI
//NAH DATA DI HTML AKAN OTOMATIS KE ISI DGN CARA MENGAMBIL SI URL YG DI TARUH DI HREF PRODUK
document.getElementById("productName").textContent = name || "Nama Produk";
document.getElementById("productPrice").textContent = price
  ? ` ${price}`
  : "Rp 0";
document.getElementById("productImage").src =
  image || "https://via.placeholder.com/200";
document.getElementById("productDescription").textContent =
  description || "Deskripsi produk tidak tersedia.";

// FUNGSI BUAT TOMBOL BELI, UNTUK REDIRECT KE FORM PEMBELIAN
const buyButton = document.getElementById("buyButton");
buyButton.addEventListener("click", function () {
  const url = `form-pembelian.html?name=${encodeURIComponent(
    name
  )}&price=${encodeURIComponent(price)}`;
  window.location.href = url;
});
