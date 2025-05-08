// MENGAMBIL ELEMEN INPUT DARI SI HTML PEMBELIAN
function isFormValid() {
  const namaInput = document.getElementById("nama");
  const noHPInput = document.getElementById("nohp");
  const errorNama = document.getElementById("errorNama");
  const errorNoHP = document.getElementById("errorNoHP");

  let valid = true;

  // VALIDASI UNTUK NAMA
  const namaValue = namaInput.value.trim();
  const jumlahKata = namaValue.split(/\s+/).length;
  if (jumlahKata < 2) {
    errorNama.textContent = "Masukkan nama lengkap !";
    valid = false;
  } else if (jumlahKata > 40) {
    errorNama.textContent = "Nama terlalu panjang !";
    valid = false;
  } else {
    errorNama.textContent = "";
  }

  // VALIDASI UNTUK NOMOR HP
  const noHPValue = noHPInput.value.trim();
  const digitOnly = noHPValue.replace(/\D/g, "");
  if (digitOnly.length < 11 || digitOnly.length > 13) {
    errorNoHP.textContent = "Nomor HP harus 11-13 digit angka!";
    valid = false;
  } else {
    errorNoHP.textContent = "";
  }

  return valid;
}
