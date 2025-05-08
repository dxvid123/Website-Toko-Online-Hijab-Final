// Ambil data dari URL
const urlParams = new URLSearchParams(window.location.search);
const fromCart = urlParams.get("fromCart") === "true";
const strukContainer = document.getElementById("strukContainer");

// Cek apakah datang dari keranjang atau pembelian langsung
if (fromCart) {
  // Datang dari keranjang (bisa multiple struk)
  const selectedItems =
    JSON.parse(localStorage.getItem("selectedCartItems")) || [];

  if (selectedItems.length > 0) {
    // Buat struk untuk setiap item yang dipilih
    selectedItems.forEach((item) => {
      createStruk(item);
    });

    // Hapus item yang sudah dibeli dari keranjang
    removeSelectedItemsFromCart(selectedItems);

    // Hapus data selectedCartItems dari localStorage
    localStorage.removeItem("selectedCartItems");
  } else {
    strukContainer.innerHTML =
      "<div class='struk'><h1>Tidak ada item yang dipilih</h1></div>";
  }
} else {
  // Pembelian langsung (single struk)
  const strukData = {
    namaPembeli: urlParams.get("nama") || "-",
    email: urlParams.get("email") || "-",
    nohp: urlParams.get("nohp") || "-",
    alamatPengiriman: urlParams.get("alamat") || "-",
    warna: urlParams.get("warna") || "-",
    jumlah: urlParams.get("jumlah") || "-",
    namaBarang: urlParams.get("barang") || "-",
    formattedTotal: urlParams.get("total") || "-",
    pembayaran: urlParams.get("pembayaran") || "COD",
    pesan: urlParams.get("pesan") || "-",
    waktu: urlParams.get("waktu") || getFormattedDateTime(),
  };

  createStruk(strukData);

  // Tambahkan waktu ke URL jika belum ada
  if (!urlParams.get("waktu")) {
    urlParams.set("waktu", strukData.waktu);
    const newURL = window.location.pathname + "?" + urlParams.toString();
    window.history.replaceState({}, "", newURL);
  }
}

// Fungsi untuk membuat struk
function createStruk(data) {
  const strukElement = document.createElement("div");
  strukElement.className = "struk";

  strukElement.innerHTML = `
    <div class="struk-header">
      <h1 class="struk-title">Struk Pembayaran</h1>
    </div>
    <div class="info">
      <p><strong>Nama Pembeli:</strong> <span>${data.namaPembeli}</span></p>
      <p><strong>Email:</strong> <span>${data.email || "-"}</span></p>
      <p><strong>No HP:</strong> <span>${data.nohp || "-"}</span></p>
      <p><strong>Nama Barang:</strong> <span>${data.namaBarang}</span></p>
      <p><strong>Warna:</strong> <span>${data.warna}</span></p>
      <p><strong>Alamat Pengiriman:</strong> <span>${
        data.alamatPengiriman
      }</span></p>
      <p><strong>Jumlah Dibeli:</strong> <span>${data.jumlah} unit</span></p>
      <p><strong>Total Harga:</strong> <span>${data.formattedTotal}</span></p>
      <p><strong>Metode Pembayaran:</strong> <span>${
        data.pembayaran || "COD"
      }</span></p>
      <p><strong>Pesan:</strong> <span>${data.pesan || "-"}</span></p>
      <p><strong>Dipesan pada:</strong> <span>${data.waktu}</span></p>
    </div>
    <div class="struk-footer">
      <p>Terima kasih telah berbelanja di toko kami!</p>
    </div>
  `;

  strukContainer.appendChild(strukElement);
}

// Fungsi untuk mendapatkan waktu sekarang dalam format yang diinginkan
function getFormattedDateTime() {
  const now = new Date();
  const jam = now.getHours().toString().padStart(2, "0");
  const menit = now.getMinutes().toString().padStart(2, "0");
  const tanggal = now.getDate();
  const bulan = now.toLocaleString("id-ID", { month: "long" });
  const tahun = now.getFullYear();
  return `${jam}.${menit} ${tanggal} ${bulan} ${tahun}`;
}

// Fungsi untuk menghapus item yang sudah dibeli dari keranjang
function removeSelectedItemsFromCart(selectedItems) {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const selectedIds = selectedItems.map((item) => item.id);

  const updatedKeranjang = keranjang.filter(
    (item) => !selectedIds.includes(item.id)
  );
  localStorage.setItem("keranjang", JSON.stringify(updatedKeranjang));
}

// Ketika tombol selesai diklik
document.getElementById("selesaiBtn").addEventListener("click", function () {
  alert("Terima kasih sudah berbelanja!");
  window.location.href = "index.html";
});

// Ketika tombol keranjang diklik
document.getElementById("keranjangBtn").addEventListener("click", function () {
  window.location.href = "keranjang.html";
});
