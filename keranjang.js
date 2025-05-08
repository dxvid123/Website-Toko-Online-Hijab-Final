// Ambil elemen dari DOM
const keranjangItemsContainer = document.getElementById("keranjangItems");
const totalHargaDisplay = document.getElementById("totalHarga");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
// BARU: Ambil elemen checkbox "Pilih Semua"
const selectAllCheckbox = document.getElementById("selectAllItems");

// BARU: Fungsi untuk menghitung total harga berdasarkan item yang dipilih
function calculateSelectedTotal() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  let totalHarga = 0;

  keranjang.forEach((item) => {
    if (item.selected) {
      totalHarga += item.harga * item.jumlah;
    }
  });

  totalHargaDisplay.textContent = `Rp ${totalHarga.toLocaleString("id-ID")}`;
}

// BARU: Fungsi untuk memperbarui status "selected" di localStorage
function updateItemSelection(index, isSelected) {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang[index].selected = isSelected;
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  calculateSelectedTotal();

  // Update status checkbox "Pilih Semua"
  const allSelected = keranjang.every((item) => item.selected);
  selectAllCheckbox.checked = allSelected;
}

// BARU: Fungsi untuk menangani "Pilih Semua"
function toggleSelectAll() {
  const isSelected = selectAllCheckbox.checked;
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  keranjang.forEach((item, index) => {
    item.selected = isSelected;
    const checkbox = document.querySelector(
      `#item-${index} input[type="checkbox"]`
    );
    if (checkbox) {
      checkbox.checked = isSelected;
    }

    // Update tampilan visual
    const itemElement = document.getElementById(`item-${index}`);
    if (itemElement) {
      if (isSelected) {
        itemElement.classList.remove("not-selected");
      } else {
        itemElement.classList.add("not-selected");
      }
    }
  });

  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  calculateSelectedTotal();
}

// Fungsi untuk menampilkan keranjang
function displayCart() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjangItemsContainer.innerHTML = ""; // Kosongkan kontainer

  // BARU: Inisialisasi status selected jika belum ada
  let updatedKeranjang = false;
  keranjang.forEach((item) => {
    if (item.selected === undefined) {
      item.selected = true; // Default semua item terpilih
      updatedKeranjang = true;
    }
  });

  if (updatedKeranjang) {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
  }

  // BARU: Set status "Pilih Semua" checkbox berdasarkan status item
  const allSelected = keranjang.every((item) => item.selected);
  selectAllCheckbox.checked = allSelected;

  keranjang.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    // BARU: Tambahkan ID untuk setiap item dan kelas not-selected jika tidak dipilih
    itemDiv.id = `item-${index}`;
    itemDiv.className = `item ${item.selected ? "" : "not-selected"}`;

    // BARU: Tambahkan checkbox ke setiap item
    itemDiv.innerHTML = `
            <div class="item-checkbox">
                <input type="checkbox" id="check-${index}" ${
      item.selected ? "checked" : ""
    }>
            </div>
            <div class="item-info">
                <strong>${item.namaBarang}</strong> - ${
      item.jumlah
    } unit - Rp ${item.harga.toLocaleString("id-ID")}
                <br>
                <small>Warna: ${item.warna}</small>
            </div>
            <div class="item-remove" onclick="removeItem(${index})">Hapus</div>
        `;
    keranjangItemsContainer.appendChild(itemDiv);

    // BARU: Tambahkan event listener untuk checkbox
    const checkbox = document.getElementById(`check-${index}`);
    checkbox.addEventListener("change", function () {
      const isChecked = this.checked;
      updateItemSelection(index, isChecked);

      // Update tampilan visual
      if (isChecked) {
        itemDiv.classList.remove("not-selected");
      } else {
        itemDiv.classList.add("not-selected");
      }
    });
  });

  // BARU: Hitung total berdasarkan item yang dipilih
  calculateSelectedTotal();
}

// Fungsi untuk menghapus item dari keranjang
function removeItem(index) {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.splice(index, 1); // Hapus item berdasarkan index
  localStorage.setItem("keranjang", JSON.stringify(keranjang)); // Simpan kembali ke localStorage
  displayCart(); // Tampilkan ulang keranjang
}

// Fungsi untuk menghapus semua item dari keranjang
function clearCart() {
  localStorage.removeItem("keranjang");
  displayCart();
}

// Fungsi untuk checkout
function checkout() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  // BARU: Filter hanya item yang dipilih
  const selectedItems = keranjang.filter((item) => item.selected);

  if (selectedItems.length === 0) {
    alert(
      "Tidak ada barang yang dipilih! Silakan pilih barang untuk checkout."
    );
    return;
  }

  // Simpan item yang dipilih untuk checkout
  localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
  window.location.href = "struk.html?fromCart=true"; // Arahkan ke halaman struk
}

// Event listeners
checkoutBtn.addEventListener("click", checkout);
clearCartBtn.addEventListener("click", clearCart);
// BARU: Event listener untuk checkbox "Pilih Semua"
selectAllCheckbox.addEventListener("change", toggleSelectAll);

// Tampilkan keranjang saat halaman dimuat
displayCart();
