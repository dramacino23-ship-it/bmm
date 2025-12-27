const products = [
  {
    name: "Mesin Perajang Singkong",
    img: "img/mesin1.jpg",
    desc: "Mesin perajang singkong untuk UMKM skala kecil hingga menengah.",
    spec: ["Bahan: Stainless", "Daya: 750 Watt", "Kapasitas: 100kg/jam"],
    price: "Rp 3.500.000"
  },
  {
    name: "Mesin Mixer Pakan",
    img: "img/mesin3.jpg",
    desc: "Mixer pakan ternak dengan hasil merata.",
    spec: ["Tabung Besi", "Motor 1 HP", "Kapasitas 50kg"],
    price: "Rp 4.800.000"
  },
  {
    name: "Mesin Penggiling Padi",
    img: "img/mesin2.jpg",
    desc: "Mesin penggiling padi efisien dan tahan lama.",
    spec: ["Rangka Baja", "Mesin Bensin", "Kapasitas 200kg/jam"],
    price: "Rp 7.000.000"
  }
];

// Home (produk sedikit)
const homeProducts = document.getElementById("homeProducts");
products.slice(0,2).forEach(p => createCard(p, homeProducts));

// Galeri (semua produk)
const galleryProducts = document.getElementById("galleryProducts");
products.forEach(p => createCard(p, galleryProducts));

function createCard(product, container) {
  const card = document.createElement("div");
  card.className = "card";
card.innerHTML = `
  <div class="product-img-box">
    <img src="${product.img}" alt="${product.name}">
  </div>
  <div class="card-body">
    <h3>${product.name}</h3>
    <button onclick='showDetail(${JSON.stringify(product)})'>
      Lihat Detail
    </button>
  </div>
`;
  container.appendChild(card);
}
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const modal = document.getElementById("productModal");
const WA_NUMBER = "6285749275680"; // GANTI JIKA PERLU

function showDetail(p) {
  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalName").innerText = p.name;
  document.getElementById("modalDesc").innerText = p.desc;
  document.getElementById("modalPrice").innerText = p.price;

  const spec = document.getElementById("modalSpec");
  spec.innerHTML = "";
  p.spec.forEach(s => {
    const li = document.createElement("li");
    li.innerText = s;
    spec.appendChild(li);
  });

  // ✅ WA LINK PER PRODUK
  const message =
    `Halo Berkah Mesin Madiun,%0A` +
    `Saya tertarik dengan produk:%0A` +
    `*${p.name}*%0A` +
    `Harga: *${p.price}*%0A` +
    `Mohon info lebih lanjut.`;

  document.getElementById("waBtn").href =
    `https://wa.me/${WA_NUMBER}?text=${message}`;

  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});


// Tahun otomatis
document.getElementById("year").innerText = new Date().getFullYear();

const navLinks = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("section[id], footer[id]");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (!id) return; // 🔥 PENTING

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
  }
);

sections.forEach(sec => observer.observe(sec));

/* ================= DATA ARTIKEL ================= */
const articles = [
  {
    title: "Tips Memilih Mesin UMKM yang Tepat",
    img: "img/artikel.jpg",
    content:
      "Memilih mesin UMKM tidak boleh sembarangan. Perhatikan kapasitas produksi, daya listrik, bahan rangka, serta kemudahan perawatan agar investasi mesin lebih efisien dan tahan lama."
  },
  {
    title: "Keunggulan Mesin Custom untuk Usaha",
    img: "img/artikel.jpg",
    content:
      "Mesin custom memungkinkan penyesuaian sesuai kebutuhan usaha. Mulai dari ukuran, kapasitas, hingga sistem penggerak dapat disesuaikan agar proses produksi lebih optimal."
  },
  {
    title: "Perawatan Mesin Agar Awet Bertahun-tahun",
    img: "img/artikel.jpg",
    content:
      "Perawatan rutin seperti pembersihan, pelumasan, dan pengecekan baut sangat penting. Mesin yang dirawat dengan baik akan lebih awet dan minim kerusakan."
  }
];

const articleList = document.getElementById("articleList");
const articleModal = document.getElementById("articleModal");

articles.forEach(a => {
  const card = document.createElement("div");
  card.className = "article-card";
  card.innerHTML = `
    <div class="article-img">
      <img src="${a.img}" alt="${a.title}">
    </div>
    <div class="article-body">
      <h3>${a.title}</h3>
      <p>${a.content.substring(0, 90)}...</p>
    </div>
  `;

  card.onclick = () => openArticle(a);
  articleList.appendChild(card);
});

/* ================= MODAL ARTIKEL ================= */
function openArticle(a) {
  document.getElementById("articleImg").src = a.img;
  document.getElementById("articleTitle").innerText = a.title;
  document.getElementById("articleContent").innerText = a.content;

  articleModal.classList.add("show");
}

function closeArticle() {
  articleModal.classList.remove("show");
}

/* klik area gelap tutup */
articleModal.addEventListener("click", e => {
  if (e.target === articleModal) closeArticle();
});
