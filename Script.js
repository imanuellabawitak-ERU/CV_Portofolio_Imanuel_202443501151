
/* ==============================
   AMBIL ELEMEN HTML
============================== */
const tombolMasuk = document.getElementById("button");
const popup = document.getElementById("popup");
const popupBox = document.getElementById("popupBox");

const tombolYa = document.getElementById("ya");
const tombolTidak = document.getElementById("tidak");
const tombolUlang = document.getElementById("ulang");

const pertanyaan = document.getElementById("pertanyaan");
const deskripsi = document.getElementById("deskripsi");
const popupEmoji = document.getElementById("popupEmoji");
const buttonArea = document.getElementById("buttonArea");

let jumlahKabur = 0;
const batasKabur = 10;


/* ==============================
   TOMBOL MASUK
============================== */
tombolMasuk.addEventListener("click", () => {
    popup.classList.add("aktif");
});


/* ==============================
   TOMBOL TIDAK KABUR SAAT DIKLIK
============================== */
function tombolKabur() {
    if (!popup.classList.contains("aktif")) return;
    if (jumlahKabur >= batasKabur) return;

    jumlahKabur++;

    const area = popupBox.getBoundingClientRect();
    const tombol = tombolTidak.getBoundingClientRect();

    const maxX = Math.max(0, (area.width - tombol.width) / 2 - 10);
    const maxY = Math.max(0, (area.height - tombol.height) / 2 - 10);

    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;

    tombolTidak.style.transform = `translate(${x}px, ${y}px)`;

    if (jumlahKabur === 3) {
        deskripsi.textContent = "Eh, kok mau pencet TIDAK?! 😭";
    } else if (jumlahKabur === 6) {
        deskripsi.textContent = "WKWKWK gak semudah itu! 🤣";
    } else if (jumlahKabur === 9) {
        deskripsi.textContent = "Oke, kesempatan terakhir! 😈";
    } else if (jumlahKabur === 10) {
        deskripsi.textContent = "Sekarang boleh pencet TIDAK 😂";
    }
}


/* ==============================
   KLIK TOMBOL TIDAK
============================== */

/* TOMBOL TIDAK: KABUR, LALU BUKA TAB BARU */
tombolTidak.addEventListener("click", () => {
    if (jumlahKabur < batasKabur) {
        tombolKabur();
        return;
    }

    // Buka halaman blank di tab baru
    window.open("https://google.com", "_blank");
});


/* ==============================
   JAWABAN YA
============================== */
tombolYa.addEventListener("click", () => {
    window.location.href = "Halaman-2.html";
});


/* ==============================
   MAIN LAGI
============================== */
tombolUlang.addEventListener("click", () => {
    jumlahKabur = 0;

    popupEmoji.textContent = "😎";
    pertanyaan.textContent = "Nuel ganteng kan?";
    deskripsi.textContent = "Jawab yang jujur yaa! 🤨";

    buttonArea.style.display = "flex";
    tombolUlang.classList.remove("tampil");

    tombolTidak.style.transform = "none";

    popup.classList.remove("aktif");
});


/* ==============================
   TUTUP POPUP
============================== */
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.classList.remove("aktif");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        popup.classList.remove("aktif");
    }
});


/* ==============================
   LOADER 10 DETIK
============================== */
function jalankanLoader() {
    const loader = document.getElementById("loader");

    if (!loader) {
        console.warn("Loader tidak ditemukan di halaman ini.");
        return;
    }

    document.body.classList.add("is-loading");

    const durasiLoader = 10000;
    const waktuMulai = performance.now();

    function sembunyikanLoader() {
        const waktuBerlalu = performance.now() - waktuMulai;
        const sisaWaktu = Math.max(
            0,
            durasiLoader - waktuBerlalu
        );

        setTimeout(() => {
            loader.classList.add("loader-hidden");
            document.body.classList.remove("is-loading");

            setTimeout(() => {
                loader.remove();
            }, 1300);
        }, sisaWaktu);
    }

    if (document.readyState === "complete") {
        sembunyikanLoader();
    } else {
        window.addEventListener("load", sembunyikanLoader, {
            once: true
        });
    }
}

jalankanLoader();
