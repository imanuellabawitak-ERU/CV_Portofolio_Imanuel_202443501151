
/* =========================
   1. SIDEBAR MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function setMenu(isOpen) {
    if (!menuToggle || !sidebar || !overlay) return;

    sidebar.classList.toggle("active", isOpen);
    overlay.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu" : "Buka menu"
    );
}

/* Buka dan tutup sidebar */

if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener("click", () => {
        const isOpen = sidebar.classList.contains("active");
        setMenu(!isOpen);
    });

    /* Tutup saat overlay diklik */
    overlay.addEventListener("click", () => {
        setMenu(false);
    });

    /* Tutup setelah memilih menu */
    sidebar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenu(false);
        });
    });

    /* Tutup dengan tombol Escape */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenu(false);
        }
    });
}


/* =========================
   2. ANIMASI FADE + DROP
========================= */

/*
   Pastikan HTML menggunakan:
   <section class="reveal" id="section-profil">
       ...
   </section>
*/

const sections = document.querySelectorAll(
    "main section.reveal"
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Section masuk layar: jalankan animasi
                    entry.target.classList.add("show");
                } else {
                    // Section keluar layar: siap untuk animasi ulang
                    entry.target.classList.remove("show");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
} else {
    // Fallback untuk browser lama
    sections.forEach((section) => {
        section.classList.add("show");
    });
}


/* LOADER 10 DETIK */
const loader = document.getElementById("loader");

if (loader) {
    document.body.classList.add("is-loading");

    const minimumLoadingTime = 10000; // 10 detik

    function hideLoader() {
        setTimeout(() => {
            loader.classList.add("loader-hidden");
            document.body.classList.remove("is-loading");

            // Hapus loader setelah animasi fade-out selesai
            setTimeout(() => loader.remove(), 1300);
        }, minimumLoadingTime);
    }

    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener("load", hideLoader, { once: true });
    }
}
