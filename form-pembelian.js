// AMBIL DATA NAMA BARANG DAN HARGA DARI URL
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get("name");
const productPrice = urlParams.get("price");
const productImage = urlParams.get("image") || ""; // Tambahkan untuk gambar produk jika ada
const namaBarangInput = document.getElementById("namaBarang");
const jumlahInput = document.getElementById("jumlah");
const totalHargaDisplay = document.getElementById("totalHarga");

// MASUKKAN NAMA BARANG KE INPUT
if (productName) {
  namaBarangInput.value = productName;
}

// HITUNG TOTAL HARGA
function updateTotal() {
  const jumlah = parseInt(jumlahInput.value);
  const price = parseInt(productPrice?.replace(/[^\d]/g, "")) || 0;
  const total = jumlah * price;
  totalHargaDisplay.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  return total;
}

// UPDATE TOTAL SAAT JUMLAH BERUBAH
jumlahInput.addEventListener("input", updateTotal);
updateTotal(); // inisialisasi awal

// RESET FORM
function resetForm() {
  document.getElementById("purchaseForm").reset();
  namaBarangInput.value = productName || "";
  updateTotal();
}

// VALIDASI FORM
function isFormValid() {
  // Implementasi validasi sesuai kebutuhan
  // Contoh sederhana: cek nama dan nohp
  const nama = document.getElementById("nama").value;
  const nohp = document.getElementById("nohp").value;
  let isValid = true;

  if (nama.trim() === "") {
    document.getElementById("errorNama").textContent = "Nama harus diisi";
    isValid = false;
  } else {
    document.getElementById("errorNama").textContent = "";
  }

  if (nohp.trim() === "") {
    document.getElementById("errorNoHP").textContent = "No HP harus diisi";
    isValid = false;
  } else {
    document.getElementById("errorNoHP").textContent = "";
  }

  return isValid;
}

// TAMPILKAN NOTIFIKASI
function showNotification(message, type = "success") {
  // Buat elemen notifikasi
  const notification = document.createElement("div");
  notification.className = "notification " + type;
  notification.textContent = message;

  // Tambahkan ke body
  document.body.appendChild(notification);

  // Tampilkan notifikasi
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Hilangkan setelah 3 detik
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// HANDLE TAMBAH KE KERANJANG
document
  .getElementById("btnTambahKeKeranjang")
  .addEventListener("click", function () {
    // Validasi form
    if (!isFormValid()) {
      return;
    }

    // Ambil data form
    const barangData = {
      namaBarang: namaBarangInput.value,
      gambarBarang: productImage,
      warna: document.getElementById("warna").value,
      jumlah: parseInt(document.getElementById("jumlah").value),
      harga: parseInt(productPrice?.replace(/[^\d]/g, "")) || 0,
      totalHarga: updateTotal(),
      formattedTotal: document.getElementById("totalHarga").textContent,
      namaPembeli: document.getElementById("nama").value,
      email: document.getElementById("email").value,
      nohp: document.getElementById("nohp").value,
      alamatPengiriman: document.getElementById("alamat").value,
      pembayaran: document.getElementById("pembayaran").value,
      pesan: document.getElementById("pesan").value,
      waktu: getFormattedDateTime(),
    };

    // Simpan ke localStorage (keranjang)
    saveToCart(barangData);

    // Tampilkan notifikasi
    showNotification("Barang berhasil ditambahkan ke keranjang!");
  });

// FUNGSI UNTUK MENYIMPAN KE KERANJANG
function saveToCart(barangData) {
  // Ambil data keranjang yang sudah ada
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  // Tambahkan barang baru dengan ID unik
  barangData.id = generateUniqueId();
  keranjang.push(barangData);

  // Simpan kembali ke localStorage
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

// GENERATE ID UNIK
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// FORMAT WAKTU
function getFormattedDateTime() {
  const now = new Date();
  const jam = now.getHours().toString().padStart(2, "0");
  const menit = now.getMinutes().toString().padStart(2, "0");
  const tanggal = now.getDate();
  const bulan = now.toLocaleString("id-ID", { month: "long" });
  const tahun = now.getFullYear();
  return `${jam}.${menit} ${tanggal} ${bulan} ${tahun}`;
}

// HANDLE SUBMIT FORM (BELI LANGSUNG)
document
  .getElementById("purchaseForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Panggil fungsi validasi
    if (!isFormValid()) {
      return; // Stop kalau validasi gagal
    }

    // Ambil data form
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const nohp = document.getElementById("nohp").value;
    const alamat = document.getElementById("alamat").value;
    const warna = document.getElementById("warna").value;
    const jumlah = document.getElementById("jumlah").value;
    const barang = namaBarangInput.value;
    const total = totalHargaDisplay.textContent;
    const pembayaran = document.getElementById("pembayaran").value;
    const pesan = document.getElementById("pesan").value;
    const waktuPesan = getFormattedDateTime();

    // Buat URL untuk struk (single item)
    const strukURL = `struk.html?nama=${encodeURIComponent(
      nama
    )}&email=${encodeURIComponent(email)}&nohp=${encodeURIComponent(
      nohp
    )}&alamat=${encodeURIComponent(alamat)}&warna=${encodeURIComponent(
      warna
    )}&jumlah=${encodeURIComponent(jumlah)}&barang=${encodeURIComponent(
      barang
    )}&total=${encodeURIComponent(total)}&pembayaran=${encodeURIComponent(
      pembayaran
    )}&pesan=${encodeURIComponent(pesan)}&waktu=${encodeURIComponent(
      waktuPesan
    )}&fromCart=false`;

    // Pindah ke halaman struk
    window.location.href = strukURL;
  });
