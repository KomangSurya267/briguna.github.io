function formatRupiah(angka, prefix) {
  let number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

gajipokok = document.getElementById("gajipokok");
gajipokok.addEventListener("keyup", function (e) {
  gajipokok.value = formatRupiah(this.value, "Rp");
  gajian = unformatRupiah(this.value === "" ? "Rp. 0" : this.value);
  total = new Intl.NumberFormat("id-ID").format(parseInt(gajian) * 0.85);
  const val = "Rp. " + total;
  document.formD.txtDisplay.value = val;
  simulasi();
});
function unformatRupiah(formattedRupiah) {
  return parseInt(formattedRupiah.replace(/[^0-9]/g, ""), 10);
}

function pilihtipe(){
  var jenis_tipe = document.getElementById("tipe");
 
  if (jenis_tipe=="Fasilitas Baru")
    {
        return simulasi();
    }
  else if (jenis_tipe=="Top Up Pinjaman")
    {
        return simulasi1();
    }
}

function simulasi() {
  pinjaman = document.getElementById("pinjaman");
  pinjaman.addEventListener("keyup", function (e) {
    pinjaman.value = formatRupiah(this.value, "Rp");
    pinjamanpokok = unformatRupiah(this.value === "" ? "Rp. 0" : this.value);
    pinjaman1 = new Intl.NumberFormat("id-ID").format(parseInt(pinjamanpokok));
  });
  var selectBulan = document.getElementById("bulan");
  var nilaiBulan = parseInt(
    selectBulan.options[selectBulan.selectedIndex].text
  );
  var bungaTahunan = 0.71 / 100;
  var bungaBulanan = bungaTahunan / 1;

  const jumlah =
    (pinjamanpokok * bungaBulanan) /
    (1 - Math.pow(1 + bungaBulanan, -nilaiBulan));
  const jumlahFormat = formatRupiah(Math.floor(jumlah).toString(), "Rp");
  document.formD.result.value = jumlahFormat;
}
