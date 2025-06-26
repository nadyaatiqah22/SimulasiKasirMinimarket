let total = 0;

function tampilkanNotifikasi(pesan, tipe = "success") {
  const notif = document.getElementById("notif");
  notif.textContent = pesan;
  notif.className = "notification"; // reset class
  if (tipe === "success") {
    notif.classList.add("success");
  } else if (tipe === "error") {
    notif.classList.add("error");
  }
  notif.style.display = "block";

  // hilangkan notifikasi setelah  detik
  setTimeout(() => {
    notif.style.display = "none";
  }, 5000);
}

function tambahBarang() {
  const nama = document.getElementById("nama").value.trim();
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const harga = parseInt(document.getElementById("harga").value);

  if (!nama || isNaN(jumlah) || isNaN(harga) || jumlah <= 0 || harga <= 0) {
    tampilkanNotifikasi("Isi semua kolom dengan benar!", "error");
    return;
  }

  const subtotal = jumlah * harga;
  total += subtotal;

  const tbody = document.querySelector("#tabelBelanja tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${nama}</td>
    <td>${jumlah}</td>
    <td>Rp ${harga.toLocaleString('id-ID')}</td>
    <td>Rp ${subtotal.toLocaleString('id-ID')}</td>
  `;
  tbody.appendChild(row);

  document.getElementById("totalHarga").textContent = total.toLocaleString('id-ID');

  // reset input
  document.getElementById("nama").value = "";
  document.getElementById("jumlah").value = "";
  document.getElementById("harga").value = "";

  tampilkanNotifikasi("Barang berhasil ditambahkan!", "success");
}

function simpanTransaksi() {
  if (total === 0) {
    tampilkanNotifikasi("Belum ada barang ditambahkan!", "error");
    return;
  }

  tampilkanNotifikasi("Transaksi berhasil disimpan!", "success");
}

function resetTransaksi() {
  document.querySelector("#tabelBelanja tbody").innerHTML = "";
  document.getElementById("totalHarga").textContent = "0";
  total = 0;

  tampilkanNotifikasi("Transaksi telah direset.", "success");
}
