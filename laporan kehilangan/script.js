// Lost & Found Terintegrasi Kampus
// Berdasarkan Dokumen Spesifikasi Sistem Rekayasa Perangkat Lunak (README.md)

const NOW = new Date(2026, 8, 30); // 30 September 2026

const S = {
  PENDING: "Menunggu verifikasi",
  ACTIVE: "Aktif di forum",
  FOUND: "Barang ditemukan",
  RETURNED: "Sudah dikembalikan",
  REJECTED: "Ditolak",
  EXPIRED: "Kedaluwarsa",
  PENDING_APPROVAL: "Menunggu ACC Admin",
  APPROVED: "Disetujui (Tersimpan)",
  MATCHED: "Dicocokkan",
};

const CATS = [
  "Dompet dan tas",
  "Elektronik",
  "Dokumen dan kartu",
  "Kunci",
  "Pakaian dan aksesori",
  "Alat tulis dan buku",
  "Lainnya",
];

const LOCS = [
  "Gedung A - Ruang kelas",
  "Gedung A - Toilet lantai 1",
  "Gedung A - Toilet lantai 2",
  "Gedung A - Toilet lantai 3",
  "Gedung A - Toilet lantai 4",
  "Gedung A - Musholah lantai 1",
  "Gedung A - Musholah lantai 2",
  "Gedung A - Musholah lantai 3",
  "Gedung A - Musholah lantai 4",
  "Gedung A - Parkiran belakang",
  "Gedung A - Lab 1",
  "Gedung A - Lab 2",
  "Gedung A - Lab 3",
  "Gedung A - Lab 4",
  "Gedung A - Lab Teknik Industri",
  "Gedung A - Ruang pertemuan",
  "Gedung A - Ruang inkubator",
  "Gedung A - Poliklinik",
  "Gedung A - Lainnya",
  "Gedung B - Ruang kelas",
  "Gedung B - Toilet lantai 1",
  "Gedung B - Toilet lantai 2",
  "Gedung B - Toilet lantai 3",
  "Gedung B - Toilet lantai 4",
  "Gedung B - Musholah lantai 1",
  "Gedung B - Musholah lantai 2",
  "Gedung B - Musholah lantai 4",
  "Gedung B - Parkiran",
  "Gedung B - Perpustakaan",
  "Gedung B - Galeri FSD",
  "Gedung B - Ruang pertemuan",
  "Gedung B - Poliklinik",
  "Gedung B - Galeri investasi",
  "Gedung B - Studio FTV",
  "Gedung B - Bank Sumut",
  "Gedung B - Aula",
  "Gedung B - Microteaching",
  "Gedung B - Lab HI",
  "Gedung B - LIFT",
  "Gedung B - Bioskop",
  "Gedung B - Lainnya",
];

const d = (n) => {
  const x = new Date(NOW);
  x.setDate(x.getDate() - n);
  return x;
};

const fmt = (x) =>
  new Date(x).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const fmtT = (x) =>
  new Date(x).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const ic = (p) => `<svg class="i" viewBox="0 0 24 24">${p}</svg>`;

const IC = {
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  off: '<path d="M3 3l18 18M10.6 6.1A10 10 0 0112 6c6.5 0 10 6 10 6a17 17 0 01-3.2 3.9M6.5 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7c1.6 0 3-.4 4.3-1M9.9 9.9a3 3 0 004.2 4.2"/>',
  photo: '<path d="M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6"/><circle cx="9" cy="9.5" r="1"/>',
  logo: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
};

const logo = `<div class="logo"><i>${ic(IC.logo)}</i>Lost & Found Kampus</div>`;

// Sample Initial Database State
const INITIAL_DB = {
  users: [
    {
      id: 1,
      name: "Rina Marlina",
      nim: "2211001",
      prodi: "Teknik Informatika",
      role: "user",
    },
    {
      id: 2,
      name: "Dimas Prakoso",
      nim: "2211014",
      prodi: "Teknik Sipil",
      role: "user",
    },
    {
      id: 3,
      name: "Sari Lubis",
      nim: "2311020",
      prodi: "Manajemen",
      role: "user",
    },
    {
      id: 4,
      name: "Budi Santoso",
      nim: "-",
      prodi: "Keamanan & Logistik",
      role: "petugas",
      username: "petugas",
    },
    {
      id: 9,
      name: "Petugas Kemahasiswaan",
      nim: "-",
      prodi: "Pusat Kemahasiswaan",
      role: "admin",
      username: "admin",
    },
  ],
  reports: [
    {
      id: 1,
      uid: 1,
      name: "Dompet kulit hitam",
      cat: CATS[0],
      color: "Hitam",
      brand: "Eiger",
      loc: "Gedung A - Ruang kelas 305",
      date: d(1),
      desc: "Berisi KTM, SIM, dan kartu ATM. Ada gantungan kunci kecil di resleting.",
      status: "ACTIVE",
      appr: d(0),
      photo: "",
    },
    {
      id: 2,
      uid: 3,
      name: "Kunci motor Honda",
      cat: CATS[3],
      color: "Perak",
      brand: "Honda",
      loc: "Gedung A - Parkiran belakang",
      date: d(2),
      desc: "Gantungan boneka beruang biru.",
      status: "PENDING",
      photo: "",
    },
    {
      id: 3,
      uid: 2,
      name: "Earbuds putih",
      cat: CATS[1],
      color: "Putih",
      brand: "Xiaomi",
      loc: "Gedung B - Perpustakaan",
      date: d(3),
      desc: "Case ada stiker huruf D.",
      status: "FOUND",
      appr: d(2),
      photo: "",
    },
    {
      id: 4,
      uid: 1,
      name: "Jaket hoodie abu-abu",
      cat: CATS[4],
      color: "Abu-abu",
      brand: "Uniqlo",
      loc: "Gedung B - Aula",
      date: d(8),
      desc: "Ukuran M, ada noda tinta di lengan kiri.",
      status: "EXPIRED",
      appr: d(6),
      photo: "",
    },
    {
      id: 5,
      uid: 3,
      name: "Kalkulator ilmiah",
      cat: CATS[5],
      color: "Hitam",
      brand: "Casio",
      loc: "Gedung B - Ruang kelas 201",
      date: d(5),
      desc: "Tertulis nama di bagian belakang.",
      status: "RETURNED",
      appr: d(4),
      photo: "",
    },
  ],
  found: [
    {
      id: 101,
      name: "Earbuds putih dengan case",
      cat: CATS[1],
      color: "Putih",
      brand: "Xiaomi",
      loc: "Gedung B - Perpustakaan",
      date: d(2),
      desc: "Ditemukan di meja baca lantai 2 perpustakaan.",
      status: "MATCHED",
      received_by: "Petugas - Budi Santoso",
      photo: "",
    },
    {
      id: 102,
      name: "Dompet lipat hitam",
      cat: CATS[0],
      color: "Hitam",
      brand: "Eiger",
      loc: "Gedung A - Ruang kelas 305",
      date: d(0),
      desc: "Diserahkan mahasiswa penemu ke meja admin kemahasiswaan.",
      status: "APPROVED",
      received_by: "Admin Kemahasiswaan",
      photo: "",
    },
    {
      id: 103,
      name: "Tumbler minum perak",
      cat: CATS[6],
      color: "Perak",
      brand: "Lock&Lock",
      loc: "Gedung A - Musholah lantai 1",
      date: d(1),
      desc: "Tertinggal di dekat tempat wudhu.",
      status: "PENDING_APPROVAL",
      received_by: "Petugas - Budi Santoso",
      photo: "",
    },
  ],
  matches: [
    {
      id: 1,
      lost_report_id: 3,
      found_item_id: 101,
      matched_by: "Petugas Kemahasiswaan",
      matched_at: d(1),
    },
  ],
  returns: [
    {
      id: 1,
      lost_report_id: 5,
      found_item_id: 99,
      user_id: 3,
      verified_by: "Petugas Kemahasiswaan",
      returned_at: d(3),
      notes: "Kalkulator diserahkan setelah mencocokkan tulisan nama di balik kalkulator.",
    },
  ],
  msgs: [
    {
      id: 1,
      uid: 2,
      from: "admin",
      text: "Halo Dimas, laporan Earbuds putih Anda telah cocok dengan temuan di Perpustakaan. Silakan datang ke kantor kemahasiswaan untuk verifikasi kepemilikan.",
      at: d(1),
      read: true,
      rid: 3,
      rname: "Earbuds putih",
    },
    {
      id: 2,
      uid: 2,
      from: "user",
      text: "Baik terima kasih Pak, siang ini saya akan ke Gedung A membawa struk pembelian dan dus Earbuds.",
      at: d(0),
      read: true,
      rid: 3,
      rname: "Earbuds putih",
    },
  ],
};

// Persistence Loader
let DB = (() => {
  try {
    const raw = localStorage.getItem("LOST_FOUND_DB_V2");
    if (raw) {
      const parsed = JSON.parse(raw);
      // convert date strings back to Date objects
      parsed.reports.forEach((r) => {
        r.date = new Date(r.date);
        if (r.appr) r.appr = new Date(r.appr);
      });
      parsed.found.forEach((f) => (f.date = new Date(f.date)));
      parsed.msgs.forEach((m) => (m.at = new Date(m.at)));
      return parsed;
    }
  } catch (err) {
    console.error("Gagal load storage:", err);
  }
  return JSON.parse(JSON.stringify(INITIAL_DB));
})();

function saveDB() {
  try {
    localStorage.setItem("LOST_FOUND_DB_V2", JSON.stringify(DB));
  } catch (e) {
    console.warn("Storage quota / error:", e);
  }
}

function resetDB() {
  if (confirm("Reset seluruh data ke kondisi awal demo?")) {
    localStorage.removeItem("LOST_FOUND_DB_V2");
    DB = JSON.parse(JSON.stringify(INITIAL_DB));
    toast("Data berhasil direset ke kondisi awal demo");
    render();
  }
}

// Check Auto-Expiry (3 Hari Sesuai README Section 9)
function checkExpirations() {
  let changed = false;
  DB.reports.forEach((r) => {
    if (r.status === "ACTIVE" && r.appr) {
      const apprTime = new Date(r.appr).getTime();
      const diffDays = (NOW.getTime() - apprTime) / (1000 * 60 * 60 * 24);
      if (diffDays > 3) {
        r.status = "EXPIRED";
        changed = true;
      }
    }
  });
  if (changed) saveDB();
}
checkExpirations();

let ST = {
  user: null,
  auth: "login", // 'login' | 'reg'
  view: "",
  q: "",
  fc: "",
  fl: "",
  fs: "",
  fg: "",
  chat: null, // target user ID for admin/petugas view
  chatReportId: null, // item context being discussed
  draft: "",
  pendingChat: null, // if user clicked chat before login
};

const $ = (s) => document.querySelector(s);
const uname = (id) => (DB.users.find((u) => u.id === id) || {}).name || "-";
const uobj = (id) => DB.users.find((u) => u.id === id) || {};
const badge = (s) => `<span class="badge ${s}">${S[s] || s}</span>`;
const opts = (a) => a.map((c) => `<option>${c}</option>`).join("");

function toast(m) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = m;
  document.body.append(t);
  setTimeout(() => t.remove(), 2800);
}

function setR(id, st) {
  const r = DB.reports.find((x) => x.id === id);
  if (r) {
    r.status = st;
    if (st === "ACTIVE") r.appr = new Date(NOW);
    saveDB();
  }
}

const exp = (r) => {
  if (!r.appr) return null;
  const e = new Date(r.appr);
  e.setDate(e.getDate() + 3);
  return e;
};

const locOf = (f) =>
  f.l.value + (f.kn && f.kn.value.trim() ? " " + f.kn.value.trim() : "");

const locOpts = (g) =>
  LOCS.filter((x) => x.startsWith(g + " - "))
    .map((x) => `<option value="${x}">${x.slice(g.length + 3)}</option>`)
    .join("");

function gdg(e) {
  const f = e.form;
  f.l.innerHTML = locOpts(e.value);
  f.kn.value = "";
  kls(f.l);
}

function kls(e) {
  const f = e.form;
  const on = /Ruang kelas$/.test(e.value);
  const n = e.value.startsWith("Gedung A") ? 4 : 3;
  const knEl = f.querySelector(".kn");
  if (!knEl) return;
  knEl.style.display = on ? "" : "none";
  knEl.querySelector("label").textContent = `Nomor ruang kelas (${n} digit)`;
  f.kn.required = on;
  f.kn.maxLength = n;
  f.kn.minLength = n;
  f.kn.pattern = `[0-9]{${n}}`;
  f.kn.title = `Isi ${n} digit angka`;
  f.kn.placeholder = n === 4 ? "Contoh: 1305" : "Contoh: 305";
  if (!on) f.kn.value = "";
}

const nav = (v) => {
  ST.view = v;
  ST.q = ST.fc = ST.fl = ST.fs = ST.fg = "";
  render();
};

function render() {
  checkExpirations();
  if (ST.user) return app();
  const h = location.hash;
  if (h === "#/admin" || h === "#/petugas" || h === "#/staff") {
    authStaff();
  } else if (h === "#/masuk") {
    auth();
  } else {
    beranda();
  }
}

function beranda() {
  $("#root").innerHTML = `
    <header style="background:var(--side);color:#fff;padding:14px clamp(16px,4vw,40px);display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap">
      ${logo}
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <button class="btn ghost sm" style="color:#fff;border-color:rgba(255,255,255,.2)" onclick="location.hash='#/';render()">Forum</button>
        <button class="btn sm" onclick="goLogin('Masuk dengan akun mahasiswa untuk melaporkan kehilangan')">Lapor Kehilangan</button>
        <button class="btn ghost sm" style="color:#b9c6d8;border-color:rgba(255,255,255,.15)" onclick="location.hash='#/staff';render()">Portal Petugas & Admin</button>
      </div>
    </header>
    <div style="background:linear-gradient(180deg, var(--soft) 0%, var(--bg) 100%);padding:24px clamp(16px,4vw,40px);border-bottom:1px solid var(--line)">
      <div style="max-width:1120px;margin:0 auto">
        <div class="info-banner" style="margin:0 0 16px">
          <b>📢 Aturan Kampus:</b> Mahasiswa hanya dapat membuat <u>Laporan Barang Hilang</u>. Jika menemukan barang di lingkungan kampus, <b>wajib diserahkan langsung</b> kepada <b>Petugas Keamanan / Admin Kemahasiswaan</b> untuk diproses dan diverifikasi secara resmi.
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--mute)">
          <span>Masa aktif laporan forum: <b>3 Hari</b> setelah di-ACC Admin</span>
          <span>Butuh bantuan seputar barang? Gunakan tombol <b>💬 Chat Admin</b> pada detail barang.</span>
        </div>
      </div>
    </div>
    <main id="main" style="margin:0 auto"></main>
  `;
  V.forum();
}

function goLogin(m) {
  ST.auth = "login";
  if (m) toast(m);
  location.hash = "#/masuk";
  render();
}

window.addEventListener("hashchange", () => {
  if (!ST.user) render();
});

function pw(id) {
  return `<div class="pw"><input id="${id}" type="password" placeholder="Masukkan kata sandi" autocomplete="off"><button type="button" aria-label="Tampilkan kata sandi" onclick="tpw('${id}',this)">${ic(IC.eye)}</button></div>`;
}

function tpw(id, b) {
  const i = $("#" + id);
  const s = i.type === "password";
  i.type = s ? "text" : "password";
  b.innerHTML = ic(s ? IC.off : IC.eye);
  b.setAttribute("aria-label", s ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
}

// Student Login & Register
function auth() {
  const reg = ST.auth === "reg";
  $("#root").innerHTML = `
    <div class="auth">
      <div class="hero">
        <div>
          ${logo.replace("<div", "<div style='margin-bottom:48px'")}
          <h1>Barang hilang kembali ke pemilik lewat satu pintu resmi.</h1>
          <p>Laporkan kehilangan barang Anda, pantau statusnya, dan konsultasikan via chat langsung ke Admin Kemahasiswaan.</p>
        </div>
        <ol class="steps">
          <li><em>1</em><span><b>Buat Laporan Kehilangan</b>Isi ciri khusus, warna, lokasi, dan foto barang Anda.</span></li>
          <li><em>2</em><span><b>Verifikasi Admin (Maks 3 Hari)</b>Laporan tampil di forum setelah disetujui Admin.</span></li>
          <li><em>3</em><span><b>Pencocokan & Chat Admin</b>Hubungi Admin via chat mengenai barang yang di-upload untuk verifikasi dan pengambilan.</span></li>
        </ol>
      </div>
      <div class="pane">
        <div class="box">
          <button type="button" class="btn ghost sm" style="margin-bottom:16px" onclick="location.hash='#/'">&larr; Kembali ke Beranda</button>
          <div class="tabs">
            <button class="${reg ? "" : "on"}" onclick="ST.auth='login';render()">Masuk</button>
            <button class="${reg ? "on" : ""}" onclick="ST.auth='reg';render()">Daftar Akun</button>
          </div>
          <h2>${reg ? "Pendaftaran Mahasiswa" : "Masuk Mahasiswa"}</h2>
          <p class="sub">${reg ? "Gunakan data identitas dan NIM resmi Anda." : "Gunakan NIM dan kata sandi Anda."}</p>
          <form onsubmit="event.preventDefault();doAuth()">
            ${reg ? `<div class="f"><label>Nama lengkap</label><input id="rn" placeholder="Contoh: Rina Marlina" required autocomplete="off"></div>` : ""}
            <div class="f"><label>NIM</label><input id="nim" inputmode="numeric" placeholder="Contoh: 2211001" required autocomplete="off"></div>
            ${reg ? `<div class="f"><label>Program studi</label><input id="rp" placeholder="Contoh: Teknik Informatika" required autocomplete="off"></div>` : ""}
            <div class="f"><label>Kata sandi</label>${pw("pw")}</div>
            <button class="btn block">${reg ? "Daftar Akun Baru" : "Masuk"}</button>
          </form>

          <div class="demo-box">
            <b>⚡ Akun Demo Mahasiswa (Klik untuk isi cepat):</b>
            <div class="demo-pills">
              <span class="demo-pill" onclick="fillDemoUser('2211001')">👤 Rina (2211001)</span>
              <span class="demo-pill" onclick="fillDemoUser('2211014')">👤 Dimas (2211014)</span>
              <span class="demo-pill" onclick="fillDemoUser('2311020')">👤 Sari (2311020)</span>
            </div>
          </div>

          <p class="hint">Petugas atau Admin kampus? <a href="#/staff">Masuk ke Portal Staf</a></p>
        </div>
      </div>
    </div>
  `;
}

function fillDemoUser(nim) {
  if (ST.auth === "reg") {
    ST.auth = "login";
    render();
  }
  const iNim = $("#nim");
  const iPw = $("#pw");
  if (iNim && iPw) {
    iNim.value = nim;
    iPw.value = "12345";
  }
}

// Staff (Petugas & Admin) Login
function authStaff() {
  $("#root").innerHTML = `
    <div class="adm">
      <div class="card">
        ${logo}
        <h2 style="margin:0 0 4px;font-size:22px">Portal Staf Kampus</h2>
        <p class="sub">Khusus Petugas Keamanan dan Admin Kemahasiswaan.</p>
        <form onsubmit="event.preventDefault();doStaff()">
          <div class="f">
            <label>Nama pengguna (Username)</label>
            <input id="su" placeholder="Masukkan username (petugas / admin)" autocomplete="off" required>
          </div>
          <div class="f">
            <label>Kata sandi</label>
            ${pw("sp")}
          </div>
          <button class="btn block">Masuk ke Panel Staf</button>
        </form>

        <div class="demo-box" style="margin-top:18px">
          <b>⚡ Akun Demo Staf (Klik untuk isi):</b>
          <div class="demo-pills">
            <span class="demo-pill" onclick="$('#su').value='petugas';$('#sp').value='petugas123'">🛡️ Petugas (Budi Santoso)</span>
            <span class="demo-pill" onclick="$('#su').value='admin';$('#sp').value='admin123'">🔑 Admin (Kemahasiswaan)</span>
          </div>
        </div>

        <p class="hint"><a href="#/masuk">&larr; Kembali ke login mahasiswa</a></p>
      </div>
    </div>
  `;
}

function doAuth() {
  const nim = $("#nim").value.trim();
  const p = $("#pw").value;
  if (ST.auth === "reg") {
    const n = $("#rn").value.trim();
    const pr = $("#rp").value.trim();
    if (!n || !nim || !pr || !p) return toast("Lengkapi semua data pendaftaran.");
    if (DB.users.some((u) => u.nim === nim))
      return toast("NIM sudah terdaftar. Silakan masuk.");
    const u = { id: Date.now(), name: n, nim, prodi: pr, role: "user" };
    DB.users.push(u);
    saveDB();
    ST.user = u;
    toast("Akun mahasiswa berhasil dibuat.");
    afterLoginCheck();
    return;
  }
  if (!nim || !p) return toast("Isi NIM dan kata sandi.");
  const u = DB.users.find((x) => x.nim === nim && x.role === "user");
  if (!u) return toast("NIM belum terdaftar. Silakan daftar terlebih dahulu.");
  ST.user = u;
  toast("Selamat datang, " + u.name);
  afterLoginCheck();
}

function doStaff() {
  const u = $("#su").value.trim();
  const p = $("#sp").value;
  if (!u || !p) return toast("Isi username dan kata sandi.");
  if (u === "petugas" && p === "petugas123") {
    ST.user = DB.users.find((x) => x.role === "petugas") || DB.users[3];
    ST.view = "dash_petugas";
    toast("Masuk sebagai Petugas Kampus");
    return render();
  }
  if (u === "admin" && p === "admin123") {
    ST.user = DB.users.find((x) => x.role === "admin") || DB.users[4];
    ST.view = "dash";
    toast("Masuk sebagai Admin Kemahasiswaan");
    return render();
  }
  toast("Username atau kata sandi staf salah.");
}

function afterLoginCheck() {
  if (ST.pendingChat) {
    const { rid } = ST.pendingChat;
    ST.pendingChat = null;
    chatAbout(rid);
  } else {
    ST.view = "forum";
    render();
  }
}

function logout() {
  const role = ST.user ? ST.user.role : "";
  ST.user = null;
  ST.view = "";
  ST.chat = null;
  ST.chatReportId = null;
  ST.auth = "login";
  location.hash = role === "admin" || role === "petugas" ? "#/staff" : "#/";
  render();
}

const esc = (s) =>
  String(s || "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

function unread() {
  if (!ST.user) return 0;
  const a = ST.user.role === "admin";
  const p = ST.user.role === "petugas";
  if (a) {
    return DB.msgs.filter((m) => !m.read && m.from === "user").length;
  }
  if (p) {
    return 0;
  }
  return DB.msgs.filter(
    (m) => !m.read && m.from === "admin" && m.uid === ST.user.id,
  ).length;
}

function markRead() {
  if (!ST.user) return;
  const a = ST.user.role === "admin";
  const uid = a ? ST.chat : ST.user.id;
  let changed = false;
  DB.msgs.forEach((m) => {
    if (m.uid === uid && m.from === (a ? "user" : "admin") && !m.read) {
      m.read = true;
      changed = true;
    }
  });
  if (changed) saveDB();
}

// Enhanced Chat: Start chat linked to uploaded item
function chatAbout(rid) {
  const r = DB.reports.find((x) => x.id === rid);
  if (!r) return;

  if (!ST.user) {
    ST.pendingChat = { rid };
    goLogin(`Silakan masuk terlebih dahulu untuk berkonsultasi via chat mengenai "${r.name}".`);
    return;
  }

  const e = $("dialog");
  if (e && e.open) e.close();

  if (ST.user.role === "admin") {
    ST.chat = r.uid;
    ST.chatReportId = rid;
    ST.draft = `Mengenai laporan "${r.name}": `;
    nav("pesan");
    return;
  }

  if (ST.user.role === "petugas") {
    toast("Sebagai Petugas, koordinasikan langsung dengan Admin");
    return;
  }

  // Student chatting with Admin about this item
  ST.chatReportId = rid;
  ST.draft = "";
  nav("pesan");
}

function sendM(f) {
  const t = f.t.value.trim();
  if (!t) return;
  const a = ST.user.role === "admin";
  const targetUid = a ? ST.chat : ST.user.id;
  const currentRid = ST.chatReportId;
  const currentItem = currentRid ? DB.reports.find((x) => x.id === currentRid) : null;

  const newMsg = {
    id: Date.now(),
    uid: targetUid,
    from: a ? "admin" : "user",
    text: t,
    at: new Date(),
    read: false,
    rid: currentRid || null,
    rname: currentItem ? currentItem.name : null,
  };

  DB.msgs.push(newMsg);
  saveDB();
  f.t.value = "";

  // Auto-respond simulation if user sent message to admin
  if (!a && currentItem) {
    simulateAdminReply(targetUid, currentItem);
  }

  app();
  const i = $(".cf textarea");
  if (i) i.focus();
}

function simulateAdminReply(uid, item) {
  // If no admin reply exists yet in this thread, send realistic confirmation after 1.2s
  setTimeout(() => {
    const student = uobj(uid);
    const reply = {
      id: Date.now() + 1,
      uid: uid,
      from: "admin",
      text: `Halo ${student.name || "Mahasiswa"}, pesan Anda mengenai barang "${item.name}" telah diterima oleh Petugas Kemahasiswaan. Kami akan memeriksa status pencocokan dan membalas pertanyaan Anda.`,
      at: new Date(),
      read: false,
      rid: item.id,
      rname: item.name,
    };
    DB.msgs.push(reply);
    saveDB();
    if (ST.user && ST.user.id === uid && ST.view === "pesan") {
      app();
    }
  }, 1200);
}

function quickSend(txt) {
  const tf = $(".cf textarea");
  if (tf) {
    tf.value = txt;
    tf.focus();
    tf.form.requestSubmit();
  }
}

function app() {
  const role = ST.user.role;
  const a = role === "admin";
  const p = role === "petugas";

  const pendReports = DB.reports.filter((r) => r.status === "PENDING").length;
  const pendFound = DB.found.filter((f) => f.status === "PENDING_APPROVAL").length;
  const foundItemsCount = DB.reports.filter((r) => r.status === "FOUND").length;
  const unr = unread();

  if (ST.view === "pesan") {
    if (a && !ST.chat) {
      const firstStudent = DB.users.find((u) => u.role === "user");
      if (firstStudent) ST.chat = firstStudent.id;
    }
    markRead();
  }

  let M = [];
  if (a) {
    M = [
      ["Utama"],
      ["dash", "Dashboard"],
      ["pesan", "Pesan / Chat", unr],
      ["Laporan Kehilangan"],
      ["masuk", "Verifikasi Laporan", pendReports],
      ["forum", "Forum Lost & Found"],
      ["Barang Temuan"],
      ["acc_temuan", "ACC Barang Temuan", pendFound],
      ["input_admin", "Catat Temuan Langsung"],
      ["Pencocokan & Penyerahan"],
      ["cocok", "Pencocokan Barang"],
      ["kembali", "Pengembalian", foundItemsCount],
      ["Data Master"],
      ["users", "Data Mahasiswa"],
      ["petugas_data", "Data Petugas"],
      ["riwayat", "Riwayat & Arsip"],
    ];
  } else if (p) {
    M = [
      ["Utama"],
      ["dash_petugas", "Dashboard Petugas"],
      ["Barang Temuan"],
      ["input_temuan", "Catat Barang Temuan"],
      ["riwayat_petugas", "Riwayat Barang Diterima"],
      ["Forum & Akun"],
      ["forum", "Forum Lost & Found"],
      ["profil", "Profil Petugas"],
    ];
  } else {
    M = [
      ["forum", "Forum Lost & Found"],
      ["lapor", "Laporkan Kehilangan"],
      ["saya", "Laporan Saya"],
      ["pesan", "Pesan ke Admin", unr],
      ["profil", "Profil"],
    ];
  }

  if (!ST.view) {
    ST.view = M.find((m) => m.length > 1)[0];
  }

  $("#root").innerHTML = `
    <div class="app">
      <aside>
        ${logo}
        ${M.map((m) =>
          m.length === 1
            ? `<div class="grp">${m[0]}</div>`
            : `<button class="nav ${ST.view === m[0] ? "on" : ""}" onclick="nav('${m[0]}')">
                ${m[1]}
                ${m[2] ? `<span class="cnt">${m[2]}</span>` : ""}
              </button>`,
        ).join("")}
        <div class="me">
          <b>${ST.user.name}</b>
          ${a ? "Administrator Kemahasiswaan" : p ? "Petugas Keamanan / Kampus" : "NIM " + ST.user.nim}
          <br><button onclick="logout()">Keluar Akun</button>
        </div>
      </aside>
      <main id="main"></main>
    </div>
  `;

  if (V[ST.view]) {
    V[ST.view]();
  } else {
    V.forum();
  }
}

const head = (t, p, x = "") =>
  `<div class="head"><div><h1>${t}</h1><p>${p}</p></div>${x}</div>`;

const sel = (k, arr, ph, lab) =>
  `<select onchange="ST.${k}=this.value;V.forum()"><option value="">${ph}</option>${arr.map((o) => `<option value="${o}" ${ST[k] === o ? "selected" : ""}>${lab ? lab[o] : o}</option>`).join("")}</select>`;

const locFilter = () =>
  `<select onchange="ST.fg=this.value;ST.fl='';V.forum()"><option value="">Semua gedung</option>${["Gedung A", "Gedung B"].map((g) => `<option value="${g}" ${ST.fg === g ? "selected" : ""}>${g}</option>`).join("")}</select><select ${ST.fg ? "" : "disabled"} onchange="ST.fl=this.value;V.forum()"><option value="">Semua lokasi</option>${LOCS.filter(
    (x) => ST.fg && x.startsWith(ST.fg + " - "),
  )
    .map(
      (x) =>
        `<option value="${x}" ${ST.fl === x ? "selected" : ""}>${x.slice(ST.fg.length + 3)}</option>`,
    )
    .join("")}</select>`;

const tbl = (cols, rows) =>
  `<div class="card tw"><table><thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.length ? rows.join("") : `<tr><td colspan="${cols.length}" class="empty">Belum ada data.</td></tr>`}</tbody></table></div>`;

const V = {
  // 1. Forum Lost & Found
  forum() {
    const isLogged = !!ST.user;
    const a = isLogged && ST.user.role === "admin";

    const filteredReports = DB.reports
      .filter((r) =>
        ST.fs
          ? r.status === ST.fs
          : r.status === "ACTIVE" || r.status === "FOUND",
      )
      .filter(
        (r) =>
          (r.name + r.brand + r.desc)
            .toLowerCase()
            .includes(ST.q.toLowerCase()) &&
          (!ST.fc || r.cat === ST.fc) &&
          (!ST.fg || r.loc.startsWith(ST.fg + " - ")) &&
          (!ST.fl || r.loc === ST.fl || r.loc.startsWith(ST.fl + " ")),
      );

    const approvedFound = DB.found.filter(
      (f) =>
        (f.status === "APPROVED" || f.status === "MATCHED") &&
        (!ST.fc || f.cat === ST.fc) &&
        (f.name + f.brand + f.desc).toLowerCase().includes(ST.q.toLowerCase()),
    );

    $("#main").innerHTML =
      head(
        "Forum Lost & Found",
        "Laporan barang hilang aktif (maks. 3 hari) dan barang temuan resmi yang diumumkan.",
        !isLogged
          ? `<button class='btn' onclick="goLogin('Masuk untuk melaporkan kehilangan')">Laporkan Barang Hilang</button>`
          : ST.user.role === "user"
            ? `<button class='btn' onclick="nav('lapor')">Buat Laporan Baru</button>`
            : "",
      ) +
      `<div class="bar">
        <input id="sq" placeholder="Cari nama barang, merk, atau ciri deskripsi..." value="${esc(ST.q)}" oninput="ST.q=this.value;clearTimeout(window.tm);window.tm=setTimeout(()=>{V.forum();const i=$('#sq');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}},250)">
        ${sel("fc", CATS, "Semua kategori")}
        ${locFilter()}
        ${sel("fs", a ? Object.keys(S) : ["ACTIVE", "FOUND"], "Semua status", S)}
      </div>` +
      `
      <div style="margin-bottom:28px">
        <h3 class="t" style="display:flex;justify-content:space-between;align-items:center">
          <span>📦 Laporan Barang Hilang Mahasiswa (${filteredReports.length})</span>
          <span style="font-size:12px;color:var(--mute);font-weight:normal">Klik kartu untuk detail & chat admin</span>
        </h3>
        ${
          filteredReports.length
            ? `<div class="grid">${filteredReports
                .map(
                  (r) => `
                <div class="card item" onclick="detail(${r.id})">
                  <div class="ph">
                    ${r.photo ? `<img src="${r.photo}" style="width:100%;height:100%;object-fit:cover">` : ic(IC.photo)}
                    ${badge(r.status)}
                  </div>
                  <div class="b">
                    <h3>${esc(r.name)}</h3>
                    <div class="meta"><b>Kategori:</b> ${esc(r.cat)}</div>
                    <div class="meta"><b>Lokasi:</b> ${esc(r.loc)}</div>
                    <div class="meta"><b>Hilang:</b> ${fmt(r.date)}</div>
                    <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
                      <span style="font-size:11.5px;color:var(--pri)">💬 Chat Admin</span>
                      <span class="btn ghost sm" style="padding:2px 8px;font-size:11px">Detail &rarr;</span>
                    </div>
                  </div>
                </div>
              `,
                )
                .join("")}</div>`
            : `<div class="card empty">Tidak ada laporan kehilangan yang cocok dengan kriteria pencarian.</div>`
        }
      </div>

      <div style="margin-top:32px">
        <h3 class="t">🛡️ Barang Temuan Resmi Tersimpan (${approvedFound.length})</h3>
        <p style="font-size:13px;color:var(--mute);margin:-6px 0 14px">Barang yang telah diserahkan mahasiswa penemu kepada Petugas / Admin dan telah disetujui untuk diumumkan.</p>
        ${
          approvedFound.length
            ? `<div class="grid">${approvedFound
                .map(
                  (f) => `
                <div class="card item" onclick="detailFound(${f.id})">
                  <div class="ph" style="background:var(--soft)">
                    ${f.photo ? `<img src="${f.photo}" style="width:100%;height:100%;object-fit:cover">` : ic(IC.shield)}
                    ${badge(f.status)}
                  </div>
                  <div class="b">
                    <h3>${esc(f.name)}</h3>
                    <div class="meta"><b>Kategori:</b> ${esc(f.cat)}</div>
                    <div class="meta"><b>Ditemukan di:</b> ${esc(f.loc)}</div>
                    <div class="meta"><b>Penerima:</b> ${esc(f.received_by)}</div>
                    <div style="margin-top:8px;font-size:11.5px;color:var(--ret)">✓ Tersimpan di Kemahasiswaan</div>
                  </div>
                </div>
              `,
                )
                .join("")}</div>`
            : `<div class="card empty">Belum ada barang temuan yang dipublikasikan.</div>`
        }
      </div>
      `;
  },

  // 2. Mahasiswa: Buat Laporan Kehilangan
  lapor() {
    $("#main").innerHTML =
      head(
        "Laporkan Barang Hilang",
        "Laporan akan diperiksa Admin terlebih dahulu sebelum dipublikasikan ke forum (Maksimal aktif 3 hari).",
      ) +
      `
      <div class="info-banner">
        <b>💡 Catatan Penting:</b> Mahasiswa hanya dapat mengunggah <b>Laporan Barang Hilang</b>. Apabila Anda menemukan barang milik orang lain, harap serahkan langsung kepada <b>Petugas Satpam / Admin Kemahasiswaan</b> di kampus.
      </div>
      <form class="card pad form" onsubmit="event.preventDefault();sendR(this)">
        <div class="f">
          <label>Nama barang <span style="color:var(--err)">*</span></label>
          <input name="n" required placeholder="Contoh: Dompet kulit hitam">
        </div>
        <div class="f">
          <label>Kategori <span style="color:var(--err)">*</span></label>
          <select name="c">${opts(CATS)}</select>
        </div>
        <div class="f">
          <label>Warna <span style="color:var(--err)">*</span></label>
          <input name="w" required placeholder="Contoh: Hitam pekat">
        </div>
        <div class="f">
          <label>Merk / Brand (jika ada)</label>
          <input name="b" placeholder="Contoh: Eiger, Casio, Xiaomi">
        </div>
        <div class="f">
          <label>Tanggal perkiraan hilang <span style="color:var(--err)">*</span></label>
          <input type="date" name="d" required value="2026-09-30">
        </div>
        <div class="f">
          <label>Gedung <span style="color:var(--err)">*</span></label>
          <select name="g" onchange="gdg(this)">
            <option>Gedung A</option>
            <option>Gedung B</option>
          </select>
        </div>
        <div class="f">
          <label>Lokasi terakhir terlihat <span style="color:var(--err)">*</span></label>
          <select name="l" onchange="kls(this)">${locOpts("Gedung A")}</select>
        </div>
        <div class="f kn">
          <label>Nomor ruang kelas (4 digit)</label>
          <input name="kn" inputmode="numeric" autocomplete="off" required maxlength="4" minlength="4" pattern="[0-9]{4}" title="Isi 4 digit angka" placeholder="Contoh: 1305" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
        </div>
        <div class="f w">
          <label>Foto barang (opsional)</label>
          <input type="file" name="foto" accept="image/*" onchange="previewImg(this, '#preview-lapor')">
          <img id="preview-lapor" class="img-preview" style="display:none">
        </div>
        <div class="f w">
          <label>Deskripsi & ciri khusus yang hanya diketahui pemilik <span style="color:var(--err)">*</span></label>
          <textarea name="ds" required placeholder="Contoh: Di dalam dompet ada KTM atas nama Rina Marlina, stiker kecil bintang perak di pojok resleting."></textarea>
        </div>
        <div class="w" style="display:flex;gap:12px;align-items:center;margin-top:12px">
          <button class="btn">Kirim Laporan Kehilangan</button>
          <span style="font-size:12.5px;color:var(--mute)">Status laporan akan langsung diset menjadi <b>PENDING</b>.</span>
        </div>
      </form>
    `;
  },

  // 3. Mahasiswa: Laporan Saya
  saya() {
    const l = DB.reports.filter((r) => r.uid === ST.user.id);
    $("#main").innerHTML =
      head(
        "Laporan Saya",
        "Pantau status verifikasi, kecocokan temuan, dan konsultasikan via chat ke Admin.",
        `<button class='btn' onclick="nav('lapor')">Buat Laporan Baru</button>`,
      ) +
      tbl(
        ["Barang", "Lokasi", "Tanggal Lapor", "Status", "Aksi"],
        l.map(
          (r) =>
            `<tr>
              <td>
                <b>${esc(r.name)}</b>
                <div class="meta">${esc(r.cat)} &bull; ${esc(r.color)}</div>
              </td>
              <td>${esc(r.loc)}</td>
              <td>${fmt(r.date)}</td>
              <td>${badge(r.status)}</td>
              <td>
                <div class="act">
                  <button class="btn ghost sm" onclick="detail(${r.id})">Detail</button>
                  <button class="btn sm" onclick="chatAbout(${r.id})" title="Chat dengan admin mengenai laporan ini">💬 Chat Admin</button>
                </div>
              </td>
            </tr>`,
        ),
      );
  },

  // 4. Mahasiswa / Admin: Fitur Chat & Pesan Terintegrasi
  pesan() {
    const a = ST.user.role === "admin";
    const me = a ? "admin" : "user";
    const uid = a ? ST.chat : ST.user.id;
    const us = DB.users.filter((u) => u.role === "user");

    // Filter message list for active conversation
    const list = DB.msgs.filter((m) => m.uid === uid);
    const last = (id) => DB.msgs.filter((m) => m.uid === id).slice(-1)[0];
    const un = (id) =>
      DB.msgs.filter((m) => m.uid === id && m.from === "user" && !m.read).length;

    // Associated Report if context exists
    const currentReport = ST.chatReportId
      ? DB.reports.find((r) => r.id === ST.chatReportId)
      : null;

    // Sidebar for Admin
    const side = a
      ? `<div class="clist">
          <div class="clist-header">Percakapan Mahasiswa (${us.length})</div>
          ${us
            .map((u) => {
              const l = last(u.id);
              const n = un(u.id);
              const relatedMsg = DB.msgs.filter((m) => m.uid === u.id && m.rname).slice(-1)[0];
              return `
              <button class="cu ${u.id === uid ? "on" : ""}" onclick="ST.chat=${u.id};app()">
                <span>
                  <b>${esc(u.name)}</b>
                  <div class="meta">${esc(u.nim)} &bull; ${esc(u.prodi)}</div>
                  ${relatedMsg ? `<div class="item-tag">🏷️ ${esc(relatedMsg.rname)}</div>` : ""}
                  <div class="meta" style="font-size:12px;margin-top:2px">${l ? esc(l.text) : "Belum ada pesan"}</div>
                </span>
                ${n ? `<span class="cnt">${n}</span>` : ""}
              </button>
            `;
            })
            .join("")}
        </div>`
      : "";

    // Draft / Template Suggestion
    const draft = ST.draft;
    ST.draft = "";

    // Item Context Banner Header inside Chat
    const itemBanner = currentReport
      ? `
      <div class="chat-item-banner">
        <div class="chat-item-info">
          <div class="chat-item-thumb">
            ${currentReport.photo ? `<img src="${currentReport.photo}">` : ic(IC.photo)}
          </div>
          <div class="chat-item-text">
            <b>Membahas Barang: ${esc(currentReport.name)}</b>
            <span>${esc(currentReport.cat)} &bull; ${esc(currentReport.loc)} &bull; ${badge(currentReport.status)}</span>
          </div>
        </div>
        <div class="chat-item-actions">
          <button class="btn ghost sm" onclick="detail(${currentReport.id})">Lihat Detail Laporan</button>
          <button class="btn ghost sm" style="color:var(--mute)" onclick="ST.chatReportId=null;app()" title="Lepas topik barang">&times; Lepas Topik</button>
        </div>
      </div>
    `
      : "";

    // Quick Chips for Student or Admin
    const quickChips = a
      ? `
      <div class="quick-chips">
        <span class="quick-chip" onclick="quickSend('Halo, laporan Anda sudah kami periksa dan saat ini aktif di forum.')">✓ Laporan diverifikasi</span>
        <span class="quick-chip" onclick="quickSend('Barang temuan yang cocok sudah kami amankan di Kemahasiswaan. Silakan datang membawa KTM.')">🎉 Cocok, silakan ambil</span>
        <span class="quick-chip" onclick="quickSend('Mohon sebutkan ciri khusus tambahan atau bukti kepemilikan untuk barang ini.')">❓ Minta ciri khusus</span>
        <span class="quick-chip" onclick="quickSend('Petugas keamanan sedang memeriksa area penemuan terakhir.')">🔍 Sedang pencarian</span>
      </div>
    `
      : `
      <div class="quick-chips">
        <span class="quick-chip" onclick="quickSend('Halo Admin, bagaimana perkembangan pencarian barang yang saya upload ini?')">📌 Status barang</span>
        <span class="quick-chip" onclick="quickSend('Halo Admin, saya melihat barang dengan ciri mirip di forum, apakah itu barang saya?')">🔍 Tanya kecocokan</span>
        <span class="quick-chip" onclick="quickSend('Halo Admin, saya ingin datang ke kantor untuk verifikasi kepemilikan barang.')">🏢 Jadwal verifikasi</span>
        <span class="quick-chip" onclick="quickSend('Halo Admin, saya ingin menambahkan detail ciri khusus pada barang saya.')">📝 Tambah ciri khusus</span>
      </div>
    `;

    const activeUser = a ? uobj(uid) : null;
    const thread = uid
      ? `
      <div class="cth">
        <div class="who">
          <div>
            <b>${esc(a ? activeUser.name + " (" + activeUser.nim + ")" : "Admin Petugas Kemahasiswaan")}</b>
            <div style="font-size:12px;color:var(--mute);font-weight:normal">
              ${a ? esc(activeUser.prodi) : "Pusat Layanan Lost & Found Kampus"}
            </div>
          </div>
          ${currentReport ? `<span class="badge ${currentReport.status}">Topik: ${esc(currentReport.name)}</span>` : ""}
        </div>
        ${itemBanner}
        <div class="cb" id="cb">
          ${
            list.length
              ? list
                  .map(
                    (m) => `
                <div class="msg ${m.from === me ? "me" : ""}">
                  ${m.rname ? `<div class="msg-item-tag">🏷️ Terkait: ${esc(m.rname)}</div>` : ""}
                  ${esc(m.text)}
                  <time>${fmtT(m.at)}</time>
                </div>
              `,
                  )
                  .join("")
              : `<div class="empty">Belum ada percakapan. Mulai chat Anda di bawah ini terkait barang yang di-upload.</div>`
          }
        </div>
        ${quickChips}
        <form class="cf" onsubmit="event.preventDefault();sendM(this)">
          <textarea name="t" required placeholder="Ketik pesan Anda untuk Admin mengenai barang yang di-upload..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.form.requestSubmit()}">${esc(draft)}</textarea>
          <button class="btn">Kirim</button>
        </form>
      </div>
    `
      : `<div class="empty">Belum ada data mahasiswa terdaftar.</div>`;

    $("#main").innerHTML =
      head(
        "Pesan & Konsultasi Admin",
        a
          ? "Konsultasikan langsung dengan mahasiswa mengenai laporan kehilangan dan barang temuan."
          : "Hubungi Admin Kemahasiswaan mengenai status laporan atau barang yang Anda upload.",
      ) +
      `<div class="card chat ${a ? "" : "solo"}">${side}${thread}</div>`;

    const cb = $("#cb");
    if (cb) cb.scrollTop = cb.scrollHeight;
  },

  // 5. Admin: Dashboard
  dash() {
    const c = (k) => DB.reports.filter((r) => r.status === k).length;
    const pendFound = DB.found.filter((f) => f.status === "PENDING_APPROVAL").length;

    $("#main").innerHTML =
      head("Dashboard Administrator", "Ringkasan data laporan kehilangan dan barang temuan.") +
      `
      <div class="stats">
        <div class="card stat" style="--c:var(--pending)">
          <b>${c("PENDING")}</b>
          <span>Laporan Masuk (Pending)</span>
        </div>
        <div class="card stat" style="--c:var(--active)">
          <b>${c("ACTIVE")}</b>
          <span>Aktif di Forum</span>
        </div>
        <div class="card stat" style="--c:var(--pending)">
          <b>${pendFound}</b>
          <span>Temuan Perlu ACC</span>
        </div>
        <div class="card stat" style="--c:var(--found)">
          <b>${c("FOUND")}</b>
          <span>Cocok (Siap Ambil)</span>
        </div>
        <div class="card stat" style="--c:var(--ret)">
          <b>${c("RETURNED")}</b>
          <span>Sudah Dikembalikan</span>
        </div>
        <div class="card stat" style="--c:var(--exp)">
          <b>${c("EXPIRED")}</b>
          <span>Kedaluwarsa (3 Hari)</span>
        </div>
      </div>

      <div class="two">
        <div>
          <h3 class="t">Laporan Masuk Menunggu ACC</h3>
          ${tbl(
            ["Barang", "Pelapor", "Tanggal", "Aksi"],
            DB.reports
              .filter((r) => r.status === "PENDING")
              .slice(0, 5)
              .map(
                (r) => `
                <tr>
                  <td><b>${esc(r.name)}</b></td>
                  <td>${esc(uname(r.uid))}</td>
                  <td>${fmt(r.date)}</td>
                  <td><button class="btn ghost sm" onclick="detail(${r.id})">Periksa</button></td>
                </tr>
              `,
              ),
          )}
        </div>
        <div>
          <h3 class="t">Barang Temuan Masuk dari Petugas</h3>
          ${tbl(
            ["Barang", "Lokasi", "Status", "Aksi"],
            DB.found
              .filter((f) => f.status === "PENDING_APPROVAL")
              .slice(0, 5)
              .map(
                (f) => `
                <tr>
                  <td><b>${esc(f.name)}</b></td>
                  <td>${esc(f.loc)}</td>
                  <td>${badge(f.status)}</td>
                  <td><button class="btn sm" onclick="accFoundItem(${f.id})">ACC</button></td>
                </tr>
              `,
              ),
          )}
        </div>
      </div>
    `;
  },

  // 6. Admin: Verifikasi Laporan Masuk
  masuk() {
    const list = DB.reports.filter((r) => r.status === "PENDING");
    $("#main").innerHTML =
      head("Verifikasi Laporan Masuk", "Periksa validitas laporan kehilangan sebelum tayang di forum (Maksimal 3 hari).") +
      tbl(
        ["Barang", "Pelapor", "Lokasi", "Status", "Tindakan Admin"],
        list.map(
          (r) => `
          <tr>
            <td>
              <b>${esc(r.name)}</b>
              <div class="meta">${esc(r.cat)} &bull; ${esc(r.color)}</div>
            </td>
            <td>${esc(uname(r.uid))}</td>
            <td>${esc(r.loc)}</td>
            <td>${badge(r.status)}</td>
            <td>
              <div class="act">
                <button class="btn ghost sm" onclick="detail(${r.id})">Detail</button>
                <button class="btn sm" onclick="setR(${r.id}, 'ACTIVE');toast('Laporan disetujui dan aktif di forum selama 3 hari');app()">Setujui (ACC)</button>
                <button class="btn bad sm" onclick="setR(${r.id}, 'REJECTED');toast('Laporan ditolak');app()">Tolak</button>
                <button class="btn ghost sm" onclick="chatAbout(${r.id})">💬 Chat</button>
              </div>
            </td>
          </tr>
        `,
        ),
      );
  },

  // 7. Admin: Verifikasi / ACC Barang Temuan dari Petugas
  acc_temuan() {
    const list = DB.found.filter((f) => f.status === "PENDING_APPROVAL");
    $("#main").innerHTML =
      head("Verifikasi Barang Temuan (ACC)", "Barang temuan yang diserahkan penemu ke Petugas harus di-ACC Admin sebelum tampil di forum.") +
      tbl(
        ["Barang", "Kategori", "Lokasi", "Petugas Penerima", "Tanggal", "Aksi"],
        list.map(
          (f) => `
          <tr>
            <td>
              <b>${esc(f.name)}</b>
              <div class="meta">${esc(f.color || "-")} &bull; ${esc(f.brand || "-")}</div>
            </td>
            <td>${esc(f.cat)}</td>
            <td>${esc(f.loc)}</td>
            <td>${esc(f.received_by)}</td>
            <td>${fmt(f.date)}</td>
            <td>
              <div class="act">
                <button class="btn ghost sm" onclick="detailFound(${f.id})">Detail</button>
                <button class="btn sm" onclick="accFoundItem(${f.id})">Setujui (ACC)</button>
                <button class="btn bad sm" onclick="rejectFoundItem(${f.id})">Tolak</button>
              </div>
            </td>
          </tr>
        `,
        ),
      );
  },

  // 8. Admin: Catat Barang Temuan Langsung
  input_admin() {
    $("#main").innerHTML =
      head(
        "Catat Barang Temuan Langsung (Admin)",
        "Jika mahasiswa penemu menyerahkan barang langsung kepada Admin di kantor kemahasiswaan.",
      ) +
      `
      <form class="card pad form" onsubmit="event.preventDefault();submitFoundDirect(this)">
        <div class="f">
          <label>Nama barang temuan <span style="color:var(--err)">*</span></label>
          <input name="n" required placeholder="Contoh: Kunci motor Honda">
        </div>
        <div class="f">
          <label>Kategori <span style="color:var(--err)">*</span></label>
          <select name="c">${opts(CATS)}</select>
        </div>
        <div class="f">
          <label>Warna</label>
          <input name="w" placeholder="Contoh: Hitam">
        </div>
        <div class="f">
          <label>Merk</label>
          <input name="b" placeholder="Contoh: Honda">
        </div>
        <div class="f">
          <label>Gedung <span style="color:var(--err)">*</span></label>
          <select name="g" onchange="gdg(this)">
            <option>Gedung A</option>
            <option>Gedung B</option>
          </select>
        </div>
        <div class="f">
          <label>Lokasi ditemukan <span style="color:var(--err)">*</span></label>
          <select name="l" onchange="kls(this)">${locOpts("Gedung A")}</select>
        </div>
        <div class="f kn">
          <label>Nomor ruang kelas (4 digit)</label>
          <input name="kn" inputmode="numeric" autocomplete="off" required maxlength="4" minlength="4" pattern="[0-9]{4}" title="Isi 4 digit angka" placeholder="Contoh: 1305" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
        </div>
        <div class="f w">
          <label>Foto barang temuan</label>
          <input type="file" name="foto" accept="image/*" onchange="previewImg(this, '#preview-admin-found')">
          <img id="preview-admin-found" class="img-preview" style="display:none">
        </div>
        <div class="f w">
          <label>Deskripsi & kondisi barang saat diterima</label>
          <textarea name="ds" placeholder="Kondisi barang, isi, dan tempat penyimpanan di kantor kemahasiswaan..."></textarea>
        </div>
        <div class="w">
          <button class="btn">Simpan Barang Temuan (Langsung APPROVED)</button>
        </div>
      </form>
    `;
  },

  // 9. Admin: Pencocokan Barang (Smart Matching)
  cocok() {
    const rs = DB.reports.filter((r) => r.status === "ACTIVE");
    const fs = DB.found.filter((f) => f.status === "APPROVED");
    const ok = rs.length && fs.length;

    // Smart recommendations
    const matchesSuggested = [];
    rs.forEach((r) => {
      fs.forEach((f) => {
        let score = 0;
        if (r.cat === f.cat) score += 2;
        if (r.color && f.color && r.color.toLowerCase() === f.color.toLowerCase()) score += 2;
        if (r.brand && f.brand && r.brand.toLowerCase() === f.brand.toLowerCase()) score += 2;
        if (r.loc && f.loc && r.loc.split(" - ")[0] === f.loc.split(" - ")[0]) score += 1;
        if (score >= 2) {
          matchesSuggested.push({ r, f, score });
        }
      });
    });

    $("#main").innerHTML =
      head("Pencocokan Barang", "Hubungkan barang temuan dengan laporan kehilangan yang sesuai.") +
      `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">
        <div class="card pad">
          <h3 class="t">Form Hubungkan Manual</h3>
          <form onsubmit="event.preventDefault();doMatch(this)">
            <div class="f">
              <label>Pilih Barang Temuan (Tersimpan / Approved):</label>
              <select name="f" required>
                ${fs.map((f) => `<option value="${f.id}">${esc(f.name)} (${esc(f.loc)})</option>`).join("")}
              </select>
            </div>
            <div class="f">
              <label>Pilih Laporan Kehilangan (Aktif):</label>
              <select name="r" required>
                ${rs.map((r) => `<option value="${r.id}">${esc(r.name)} - ${esc(uname(r.uid))}</option>`).join("")}
              </select>
            </div>
            <button class="btn" ${ok ? "" : "disabled"}>Hubungkan dan Tandai Ditemukan (FOUND)</button>
            ${ok ? "" : `<p class="hint" style="text-align:left">Butuh minimal satu barang temuan tersimpan dan satu laporan aktif.</p>`}
          </form>
        </div>

        <div class="card pad">
          <h3 class="t">Saran Pencocokan Otomatis (${matchesSuggested.length})</h3>
          <p style="font-size:12.5px;color:var(--mute);margin:-4px 0 12px">Berdasarkan kesamaan kategori, merk, warna, dan lokasi.</p>
          ${
            matchesSuggested.length
              ? matchesSuggested
                  .map(
                    (m) => `
                <div class="match-item">
                  <div>
                    <b>${esc(m.r.name)} &harr; ${esc(m.f.name)}</b>
                    <div class="meta">${esc(m.r.cat)} &bull; ${esc(uname(m.r.uid))}</div>
                  </div>
                  <button class="btn sm" onclick="directMatch(${m.r.id}, ${m.f.id})">Cocokkan</button>
                </div>
              `,
                  )
                  .join("")
              : `<div class="empty" style="padding:20px">Belum ada saran pencocokan otomatis.</div>`
          }
        </div>
      </div>
    `;
  },

  // 10. Admin: Pengembalian Barang & Verifikasi Kepemilikan
  kembali() {
    const list = DB.reports.filter((r) => r.status === "FOUND");
    $("#main").innerHTML =
      head(
        "Pengembalian Barang",
        "Lakukan verifikasi kepemilikan sebelum barang diserahkan resmi kepada pemiliknya.",
      ) +
      tbl(
        ["Pelapor", "Barang Hilang", "Kontak / Chat", "Tindakan Verifikasi"],
        list.map((r) => {
          const u = uobj(r.uid);
          return `
          <tr>
            <td>
              <b>${esc(u.name)}</b>
              <div class="meta">NIM ${esc(u.nim)} &bull; ${esc(u.prodi)}</div>
            </td>
            <td>
              <b>${esc(r.name)}</b>
              <div class="meta">${esc(r.cat)} &bull; ${esc(r.loc)}</div>
            </td>
            <td>
              <button class="btn ghost sm" onclick="chatAbout(${r.id})">💬 Hubungi Pelapor</button>
            </td>
            <td>
              <button class="btn sm" onclick="verif(${r.id})">Verifikasi & Serahkan</button>
            </td>
          </tr>
        `;
        }),
      );
  },

  // 11. Admin: Data Mahasiswa
  users() {
    const list = DB.users.filter((u) => u.role === "user");
    $("#main").innerHTML =
      head("Data Mahasiswa Terdaftar", "Daftar akun mahasiswa dalam sistem Lost & Found.") +
      tbl(
        ["Nama Lengkap", "NIM", "Program Studi", "Total Laporan", "Aksi"],
        list.map(
          (u) => `
          <tr>
            <td><b>${esc(u.name)}</b></td>
            <td>${esc(u.nim)}</td>
            <td>${esc(u.prodi)}</td>
            <td>${DB.reports.filter((r) => r.uid === u.id).length} laporan</td>
            <td>
              <button class="btn ghost sm" onclick="ST.chat=${u.id};ST.chatReportId=null;nav('pesan')">💬 Chat Mahasiswa</button>
            </td>
          </tr>
        `,
        ),
      );
  },

  // 12. Admin: Data Petugas
  petugas_data() {
    const list = DB.users.filter((u) => u.role === "petugas");
    $("#main").innerHTML =
      head("Data Petugas Kampus", "Petugas yang berwenang menerima barang temuan di lapangan.") +
      tbl(
        ["Nama Petugas", "Peran / Bagian", "Barang Diterima"],
        list.map(
          (p) => `
          <tr>
            <td><b>${esc(p.name)}</b></td>
            <td>${esc(p.prodi)}</td>
            <td>${DB.found.filter((f) => f.received_by.includes(p.name)).length} barang</td>
          </tr>
        `,
        ),
      );
  },

  // 13. Admin: Riwayat Lengkap & Arsip
  riwayat() {
    $("#main").innerHTML =
      head(
        "Riwayat & Arsip Laporan",
        "Seluruh arsip laporan kehilangan, status kedaluwarsa 3 hari, barang ditolak, dan barang yang sudah kembali.",
      ) +
      tbl(
        ["Barang", "Pelapor", "Tanggal Lapor", "Status", "Aksi"],
        DB.reports.map(
          (r) => `
          <tr>
            <td>
              <b>${esc(r.name)}</b>
              <div class="meta">${esc(r.cat)}</div>
            </td>
            <td>${esc(uname(r.uid))}</td>
            <td>${fmt(r.date)}</td>
            <td>${badge(r.status)}</td>
            <td>
              <button class="btn ghost sm" onclick="detail(${r.id})">Detail</button>
            </td>
          </tr>
        `,
        ),
      );
  },

  // 14. Petugas: Dashboard Petugas
  dash_petugas() {
    const myFound = DB.found.filter((f) => f.received_by.includes(ST.user.name));
    const pend = myFound.filter((f) => f.status === "PENDING_APPROVAL").length;
    const apprv = myFound.filter((f) => f.status === "APPROVED" || f.status === "MATCHED").length;

    $("#main").innerHTML =
      head(
        "Dashboard Petugas Kampus",
        "Petugas berwenang mencatat barang temuan dari penemu untuk diverifikasi Admin.",
        `<button class="btn" onclick="nav('input_temuan')">Catat Barang Temuan Baru</button>`,
      ) +
      `
      <div class="stats">
        <div class="card stat" style="--c:var(--pri)">
          <b>${myFound.length}</b>
          <span>Total Diterima Petugas</span>
        </div>
        <div class="card stat" style="--c:var(--pending)">
          <b>${pend}</b>
          <span>Menunggu ACC Admin</span>
        </div>
        <div class="card stat" style="--c:var(--ret)">
          <b>${apprv}</b>
          <span>Disetujui Admin</span>
        </div>
      </div>

      <div class="info-banner">
        <b>Pedoman Petugas:</b> Sesuai aturan sistem, barang temuan yang Anda catat akan berstatus <b>PENDING_APPROVAL</b> dan akan diperiksa oleh Admin Kemahasiswaan sebelum dipublikasikan di forum.
      </div>

      <h3 class="t">Barang Terakhir yang Anda Terima</h3>
      ${tbl(
        ["Barang", "Lokasi", "Tanggal", "Status", ""],
        myFound.slice(0, 5).map(
          (f) => `
          <tr>
            <td><b>${esc(f.name)}</b></td>
            <td>${esc(f.loc)}</td>
            <td>${fmt(f.date)}</td>
            <td>${badge(f.status)}</td>
            <td><button class="btn ghost sm" onclick="detailFound(${f.id})">Detail</button></td>
          </tr>
        `,
        ),
      )}
    `;
  },

  // 15. Petugas: Input Barang Temuan
  input_temuan() {
    $("#main").innerHTML =
      head(
        "Catat Barang Temuan",
        "Barang temuan yang diserahkan mahasiswa penemu kepada petugas keamanan / kampus.",
      ) +
      `
      <form class="card pad form" onsubmit="event.preventDefault();submitFoundPetugas(this)">
        <div class="f">
          <label>Nama barang <span style="color:var(--err)">*</span></label>
          <input name="n" required placeholder="Contoh: Kunci motor Beat">
        </div>
        <div class="f">
          <label>Kategori <span style="color:var(--err)">*</span></label>
          <select name="c">${opts(CATS)}</select>
        </div>
        <div class="f">
          <label>Warna</label>
          <input name="w" placeholder="Contoh: Hitam">
        </div>
        <div class="f">
          <label>Merk</label>
          <input name="b" placeholder="Contoh: Honda">
        </div>
        <div class="f">
          <label>Gedung <span style="color:var(--err)">*</span></label>
          <select name="g" onchange="gdg(this)">
            <option>Gedung A</option>
            <option>Gedung B</option>
          </select>
        </div>
        <div class="f">
          <label>Lokasi ditemukan <span style="color:var(--err)">*</span></label>
          <select name="l" onchange="kls(this)">${locOpts("Gedung A")}</select>
        </div>
        <div class="f kn">
          <label>Nomor ruang kelas (4 digit)</label>
          <input name="kn" inputmode="numeric" autocomplete="off" required maxlength="4" minlength="4" pattern="[0-9]{4}" title="Isi 4 digit angka" placeholder="Contoh: 1305" oninput="this.value=this.value.replace(/[^0-9]/g,'')">
        </div>
        <div class="f w">
          <label>Foto barang temuan</label>
          <input type="file" name="foto" accept="image/*" onchange="previewImg(this, '#preview-petugas-found')">
          <img id="preview-petugas-found" class="img-preview" style="display:none">
        </div>
        <div class="f w">
          <label>Deskripsi & kondisi saat diserahkan</label>
          <textarea name="ds" placeholder="Kondisi barang dan nama penemu yang menyerahkan..."></textarea>
        </div>
        <div class="w" style="margin-top:10px">
          <button class="btn">Simpan Barang Temuan (Kirim ke Admin untuk ACC)</button>
        </div>
      </form>
    `;
  },

  // 16. Petugas: Riwayat Barang Diterima
  riwayat_petugas() {
    const list = DB.found.filter((f) => f.received_by.includes(ST.user.name));
    $("#main").innerHTML =
      head("Riwayat Barang Diterima", "Seluruh barang temuan yang pernah Anda terima.") +
      tbl(
        ["Barang", "Kategori", "Lokasi", "Tanggal", "Status", ""],
        list.map(
          (f) => `
          <tr>
            <td><b>${esc(f.name)}</b></td>
            <td>${esc(f.cat)}</td>
            <td>${esc(f.loc)}</td>
            <td>${fmt(f.date)}</td>
            <td>${badge(f.status)}</td>
            <td><button class="btn ghost sm" onclick="detailFound(${f.id})">Detail</button></td>
          </tr>
        `,
        ),
      );
  },

  // 17. Profil
  profil() {
    const u = ST.user;
    $("#main").innerHTML =
      head("Profil Akun", "Informasi akun pengguna Anda.") +
      `
      <div class="card pad" style="max-width:540px">
        <dl class="dl">
          <dt>Nama lengkap</dt><dd>${esc(u.name)}</dd>
          <dt>NIM / ID</dt><dd>${esc(u.nim)}</dd>
          <dt>Program studi</dt><dd>${esc(u.prodi)}</dd>
          <dt>Hak akses (Role)</dt><dd><span class="badge ACTIVE">${esc(u.role.toUpperCase())}</span></dd>
        </dl>
        <div style="margin-top:24px;display:flex;gap:10px">
          <button class="btn bad sm" onclick="logout()">Keluar Akun</button>
          <button class="btn ghost sm" onclick="resetDB()">Reset Demo Data</button>
        </div>
      </div>
    `;
  },
};

// Handlers for Forms & Actions
function previewImg(input, targetSelector) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = $(targetSelector);
      if (img) {
        img.src = e.target.result;
        img.style.display = "block";
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function sendR(f) {
  const photoEl = f.foto && f.foto.files[0];
  const saveReport = (photoData) => {
    DB.reports.unshift({
      id: Date.now(),
      uid: ST.user.id,
      name: f.n.value.trim(),
      cat: f.c.value,
      color: f.w.value.trim(),
      brand: f.b ? f.b.value.trim() : "",
      loc: locOf(f),
      date: new Date(f.d.value),
      desc: f.ds.value.trim(),
      photo: photoData || "",
      status: "PENDING",
      appr: null,
      created_at: new Date(),
    });
    saveDB();
    toast("Laporan terkirim! Menunggu verifikasi Admin.");
    nav("saya");
  };

  if (photoEl) {
    const reader = new FileReader();
    reader.onload = (e) => saveReport(e.target.result);
    reader.readAsDataURL(photoEl);
  } else {
    saveReport("");
  }
}

function submitFoundPetugas(f) {
  const photoEl = f.foto && f.foto.files[0];
  const saveFound = (photoData) => {
    DB.found.unshift({
      id: Date.now(),
      name: f.n.value.trim(),
      cat: f.c.value,
      color: f.w ? f.w.value.trim() : "",
      brand: f.b ? f.b.value.trim() : "",
      loc: locOf(f),
      date: new Date(NOW),
      desc: f.ds ? f.ds.value.trim() : "",
      photo: photoData || "",
      status: "PENDING_APPROVAL",
      received_by: `Petugas - ${ST.user.name}`,
    });
    saveDB();
    toast("Barang temuan dicatat! Menunggu verifikasi ACC Admin.");
    nav("riwayat_petugas");
  };

  if (photoEl) {
    const reader = new FileReader();
    reader.onload = (e) => saveFound(e.target.result);
    reader.readAsDataURL(photoEl);
  } else {
    saveFound("");
  }
}

function submitFoundDirect(f) {
  const photoEl = f.foto && f.foto.files[0];
  const saveFound = (photoData) => {
    DB.found.unshift({
      id: Date.now(),
      name: f.n.value.trim(),
      cat: f.c.value,
      color: f.w ? f.w.value.trim() : "",
      brand: f.b ? f.b.value.trim() : "",
      loc: locOf(f),
      date: new Date(NOW),
      desc: f.ds ? f.ds.value.trim() : "",
      photo: photoData || "",
      status: "APPROVED",
      received_by: "Admin Kemahasiswaan",
    });
    saveDB();
    toast("Barang temuan berhasil dicatat dan langsung APPROVED.");
    nav("cocok");
  };

  if (photoEl) {
    const reader = new FileReader();
    reader.onload = (e) => saveFound(e.target.result);
    reader.readAsDataURL(photoEl);
  } else {
    saveFound("");
  }
}

function accFoundItem(id) {
  const f = DB.found.find((x) => x.id === id);
  if (f) {
    f.status = "APPROVED";
    saveDB();
    toast("Barang temuan disetujui (ACC) dan siap dicocokkan.");
    app();
  }
}

function rejectFoundItem(id) {
  const f = DB.found.find((x) => x.id === id);
  if (f) {
    f.status = "REJECTED";
    saveDB();
    toast("Barang temuan ditolak.");
    app();
  }
}
const canDelete = () =>
  ST.user && (ST.user.role === "admin" );

const canDeleteFound = (f) =>
  ST.user &&
(ST.user.role === "admin" || (ST.user.role === "petugas" && f.received_by.includes(ST.user.name)));

function closeDlg(){
  const e = $("dialog");
  if (e && e.open) e.close();
}

function deleteReport(id){
  if (!canDelete()) return toast("Anda tidak memiliki izin untuk menghapus Laporan.");
  const r = DB.reports.find((x) => x.id === id);
  if (!r) return;
  if (!confirm(`Hapus Laporan "${r.name}" secara permanen?\nTindakan ini dapat dibatalkan.`)) return;
  DB.matches 
   .filter((m) => m.lost_report_id === id)
   .forEach((m) => {
    const f = DB.found.find((x) => x.id === m.found_item_id);
    if (f && f.status === "MATCHED") f.status = "APPROVED";
  });
  DB.matches = DB.matches.filter((m) => m.lost_report_id !== id);
  DB.returns = DB.returns.filter((x) => x.lost_report_id !== id);
  DB.reports = DB.reports.filter((x) => x.id !== id);
  DB.msgs.forEach((m) => {
    if (m.rid === id) m.rid = null;
  });
  if (ST.chatReportId === id) ST.chatReportId = null;
  saveDB();
  closeDlg();
  toast("Laporan Kehilangan berhasil dihapus");
  render();
}

function deleteFound(id){
  const f = DB.found.find((x) => x.id === id);
  if (!f) return;
  if (!canDeleteFound(f)) return toast("Anda tidak memiliki izin untuk menghapus barang temuan ini.");
  if (!confirm(`Hapus barang temuan "${f.name}" secara permanen?\nTindakan ini dapat dibatalkan`)) return;
  DB.matches
    .filter((m) => m.found_item_id === id)
    .forEach ((m) => {
      const r = DB.reports.find((x) => x.id === m.lost_report_id);
      if (r && r.status === "FOUND") r.status = "ACTIVE";
    });
  DB.matches = DB.matches.filter((m) => m.found_item_id !== id);
  DB.found = DB.found.filter((x) => x.id !== id);
  saveDB();
  closeDlg();
  toast("Barang temuan berhasil dihapus");
  render();
}

function doMatch(f) {
  const r = +f.r.value;
  const i = +f.f.value;
  directMatch(r, i);
}

function directMatch(rid, fid) {
  setR(rid, "FOUND");
  const f = DB.found.find((x) => x.id === fid);
  if (f) f.status = "MATCHED";

  DB.matches.push({
    id: Date.now(),
    lost_report_id: rid,
    found_item_id: fid,
    matched_by: ST.user.name,
    matched_at: new Date(),
  });
  saveDB();
  toast("Laporan dan temuan berhasil dihubungkan! Silakan hubungi pelapor.");
  app();
}

function dlg(h) {
  const e = $("dialog");
  if (e) e.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<dialog><div class="in">${h}</div></dialog>`,
  );
  $("dialog").showModal();
}

// Modal Detail Laporan Kehilangan
function detail(id) {
  const r = DB.reports.find((x) => x.id === id);
  if (!r) return;
  const isAdm = ST.user && ST.user.role === "admin";
  const isMine = ST.user && ST.user.id === r.uid;
  const expireDate = exp(r);

  dlg(`
    <div class="ph" style="border-radius:8px;margin-bottom:16px;height:160px;overflow:hidden">
      ${r.photo ? `<img src="${r.photo}" style="width:100%;height:100%;object-fit:cover">` : ic(IC.photo)}
    </div>
    ${badge(r.status)}
    <h2 style="margin-top:8px">${esc(r.name)}</h2>
    <p class="meta" style="margin:0 0 16px">${esc(r.cat)}</p>
    <dl class="dl">
      <dt>Warna</dt><dd>${esc(r.color || "-")}</dd>
      <dt>Merk</dt><dd>${esc(r.brand || "-")}</dd>
      <dt>Lokasi hilang</dt><dd>${esc(r.loc)}</dd>
      <dt>Tanggal lapor</dt><dd>${fmt(r.date)}</dd>
      <dt>Ciri & Deskripsi</dt><dd>${esc(r.desc)}</dd>
      ${isAdm ? `<dt>Pelapor</dt><dd>${esc(uname(r.uid))}</dd>` : ""}
      ${expireDate ? `<dt>Masa aktif s/d</dt><dd>${fmt(expireDate)} (Maks. 3 hari)</dd>` : ""}
    </dl>
    <div class="foot">
      <button class="btn ghost" onclick="$('dialog').close()">Tutup</button>
      ${canDelete() ? `<button class="btn bad" onclick="deleteReport(${r.id})">Hapus Laporan</button>` : ""}
      <button class="btn" onclick="chatAbout(${r.id})">
        💬 Chat Admin tentang Barang Ini
      </button>
      ${isAdm && r.status === "PENDING" ? `<button class="btn sm" onclick="setR(${r.id},'ACTIVE');$('dialog').close();toast('Laporan disetujui');app()">Setujui</button>` : ""}
      ${isAdm && r.status === "FOUND" ? `<button class="btn sm" onclick="$('dialog').close();verif(${r.id})">Verifikasi Kepemilikan</button>` : ""}
    </div>
  `);
}

// Modal Detail Barang Temuan
function detailFound(id) {
  const f = DB.found.find((x) => x.id === id);
  if (!f) return;
  dlg(`
    <div class="ph" style="border-radius:8px;margin-bottom:16px;height:160px;overflow:hidden;background:var(--soft)">
      ${f.photo ? `<img src="${f.photo}" style="width:100%;height:100%;object-fit:cover">` : ic(IC.shield)}
    </div>
    ${badge(f.status)}
    <h2 style="margin-top:8px">${esc(f.name)}</h2>
    <p class="meta" style="margin:0 0 16px">${esc(f.cat)} &bull; Ditemukan di ${esc(f.loc)}</p>
    <dl class="dl">
      <dt>Warna</dt><dd>${esc(f.color || "-")}</dd>
      <dt>Merk</dt><dd>${esc(f.brand || "-")}</dd>
      <dt>Lokasi temuan</dt><dd>${esc(f.loc)}</dd>
      <dt>Tanggal temuan</dt><dd>${fmt(f.date)}</dd>
      <dt>Penerima</dt><dd>${esc(f.received_by)}</dd>
      <dt>Kondisi</dt><dd>${esc(f.desc || "Disimpan di kantor kemahasiswaan")}</dd>
    </dl>
    <div class="foot">
      <button class="btn ghost" onclick="$('dialog').close()">Tutup</button>
      ${canDeleteFound(f) ? `<button class="btn bad" onclick="deleteFound(${f.id})">Hapus Temuan</button>` : ""}
      ${ST.user && ST.user.role === "admin" && f.status === "PENDING_APPROVAL" ? `<button class="btn sm" onclick="accFoundItem(${f.id});$('dialog').close()">Setujui (ACC)</button>` : ""}
    </div>
  `);
}

// Modal Verifikasi Kepemilikan (Checklist Sesuai README Section 8.7)
function verif(id) {
  const r = DB.reports.find((x) => x.id === id);
  if (!r) return;
  const u = uobj(r.uid);

  dlg(`
    <h2>Verifikasi Kepemilikan Barang</h2>
    <p class="meta">${esc(r.name)} &bull; Pemilik: ${esc(u.name)} (NIM: ${esc(u.nim)})</p>
    <div class="info-banner" style="margin:12px 0">
      Admin wajib memeriksa kecocokan fisik barang dan identitas sebelum barang diserahkan.
    </div>
    <div class="chk">
      <label><input type="checkbox"> 1. Detail ciri khusus barang sesuai dengan keterangan pelapor</label>
      <label><input type="checkbox"> 2. Isi dalam barang (jika ada) sesuai dengan keterangan pemilik</label>
      <label><input type="checkbox"> 3. Bukti kepemilikan diperlihatkan (KTM, foto lama, struk, atau pola kunci)</label>
      <label><input type="checkbox"> 4. Identitas mahasiswa sesuai dengan akun pelapor</label>
      <label><input type="checkbox"> 5. Pemilik menandatangani bukti penyerahan barang</label>
    </div>
    <div class="f">
      <label>Catatan penyerahan / nomor bukti</label>
      <textarea id="vnotes" placeholder="Tuliskan catatan verifikasi barang dan tanggal serah terima..."></textarea>
    </div>
    <div class="foot">
      <button class="btn ghost" onclick="$('dialog').close()">Batal</button>
      <button class="btn" onclick="submitVerifReturn(${id})">Serahkan Barang (RETURNED)</button>
    </div>
  `);
}

function submitVerifReturn(id) {
  const chks = [...document.querySelectorAll("dialog input[type=checkbox]")];
  if (!chks.every((c) => c.checked)) {
    return toast("Harap centang semua 5 poin verifikasi kepemilikan terlebih dahulu.");
  }
  const notes = $("#vnotes") ? $("#vnotes").value.trim() : "";
  const r = DB.reports.find((x) => x.id === id);
  setR(id, "RETURNED");

  DB.returns.push({
    id: Date.now(),
    lost_report_id: id,
    found_item_id: null,
    user_id: r.uid,
    verified_by: ST.user.name,
    returned_at: new Date(),
    notes: notes || "Barang diserahkan setelah verifikasi 5 poin lengkap.",
  });
  saveDB();
  $("dialog").close();
  toast("Barang telah berhasil diverifikasi dan diserahkan!");
  app();
}

// Initial Run
render();
