const NOW = new Date(2026, 8, 30);
const S = {
  PENDING: "Menunggu verifikasi",
  ACTIVE: "Aktif di forum",
  FOUND: "Barang ditemukan",
  RETURNED: "Sudah dikembalikan",
  REJECTED: "Ditolak",
  EXPIRED: "Kedaluwarsa",
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

const ic = (p) => `<svg class="i" viewBox="0 0 24 24">${p}</svg>`;

const IC = {
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  off: '<path d="M3 3l18 18M10.6 6.1A10 10 0 0112 6c6.5 0 10 6 10 6a17 17 0 01-3.2 3.9M6.5 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7c1.6 0 3-.4 4.3-1M9.9 9.9a3 3 0 004.2 4.2"/>',
  photo:
    '<path d="M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6"/><circle cx="9" cy="9.5" r="1"/>',
  logo: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
};

const logo = `<div class="logo"><i>${ic(IC.logo)}</i>Lost & Found Kampus</div>`;

let DB = {
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
      id: 9,
      name: "Petugas Kemahasiswaan",
      nim: "-",
      prodi: "-",
      role: "admin",
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
    },
  ],
  msgs: [],
  found: [
    {
      id: 1,
      name: "Earbuds putih dengan case",
      cat: CATS[1],
      loc: "Gedung B - Perpustakaan",
      date: d(2),
      status: "Dicocokkan",
    },
    {
      id: 2,
      name: "Dompet hitam",
      cat: CATS[0],
      loc: "Gedung A - Ruang kelas 305",
      date: d(0),
      status: "Tersimpan",
    },
  ],
};

let ST = {
  user: null,
  auth: "login",
  view: "",
  q: "",
  fc: "",
  fl: "",
  fs: "",
  chat: null,
  draft: "",
  showFilters: false,
};

const $ = (s) => document.querySelector(s);
const uname = (id) => (DB.users.find((u) => u.id === id) || {}).name || "-";
const badge = (s) => `<span class="badge ${s}">${S[s]}</span>`;
const opts = (a) => a.map((c) => `<option>${c}</option>`).join("");

function toast(m) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = m;
  document.body.append(t);
  setTimeout(() => t.remove(), 2600);
}

function setR(id, st) {
  const r = DB.reports.find((x) => x.id === id);
  if (r) {
    r.status = st;
    if (st === "ACTIVE") r.appr = new Date(NOW);
  }
}

const exp = (r) => {
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
  const f = e.form,
    on = /Ruang kelas$/.test(e.value),
    n = e.value.startsWith("Gedung A") ? 4 : 3;
  f.querySelector(".kn").style.display = on ? "" : "none";
  f.querySelector(".kn label").textContent = `Nomor ruang kelas (${n} digit)`;
  f.kn.required = on;
  f.kn.maxLength = n;
  f.kn.minLength = n;
  f.kn.pattern = `[0-9]{${n}}`;
  f.kn.title = `Isi ${n} digit angka`;
  f.kn.placeholder = n === 4 ? "Contoh: 1305" : "Contoh: 305";
  if (!on) f.kn.value = "";
}

function toggleMobileMenu() {
  const el = $("#appAside");
  const bd = $("#navBackdrop");
  if (el) el.classList.toggle("open");
  if (bd) bd.classList.toggle("show");
}

function closeMobileMenu() {
  const el = $("#appAside");
  const bd = $("#navBackdrop");
  if (el) el.classList.remove("open");
  if (bd) bd.classList.remove("show");
}

const nav = (v) => {
  closeMobileMenu();
  ST.view = v;
  ST.q = ST.fc = ST.fl = ST.fs = ST.fg = "";
  ST.showFilters = false;
  render();
};

function render() {
  if (ST.user) return app();
  const h = location.hash;
  h === "#/masuk" || h === "#/admin" ? auth() : beranda();
}

function beranda() {
  $("#root").innerHTML =
    `<header class="pub-nav">
      <div class="pub-nav-inner">
        ${logo}
        <div class="pub-nav-actions">
          <button type="button" class="btn ghost sm" onclick="location.hash='#/admin'">Petugas</button>
          <button type="button" class="btn sm" onclick="goLogin()">Masuk / Daftar</button>
        </div>
      </div>
    </header>
    <main id="main" style="margin:0 auto"></main>`;
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
  const i = $("#" + id),
    s = i.type === "password";
  i.type = s ? "text" : "password";
  b.innerHTML = ic(s ? IC.off : IC.eye);
  b.setAttribute(
    "aria-label",
    s ? "Sembunyikan kata sandi" : "Tampilkan kata sandi",
  );
}

function auth() {
  if (location.hash === "#/admin") {
    $("#root").innerHTML =
      `<div class="adm"><div class="card">${logo}<h2 style="margin:0 0 4px;font-size:22px">Masuk petugas</h2><p class="sub">Khusus admin dan pihak kampus.</p>
<form onsubmit="event.preventDefault();doAdmin()"><div class="f"><label>Nama pengguna</label><input id="au" placeholder="Masukkan nama pengguna" autocomplete="off"></div>
<div class="f"><label>Kata sandi</label>${pw("ap")}</div><button class="btn block">Masuk ke panel admin</button></form>
<p class="hint"><a href="#/masuk">Kembali ke halaman masuk mahasiswa</a></p></div></div>`;
    return;
  }
  const reg = ST.auth === "reg";
  $("#root").innerHTML =
    `<div class="auth"><div class="hero"><div>${logo.replace("<div", "<div style='margin-bottom:56px'")}<h1>Barang hilang kembali ke pemilik lewat satu pintu resmi.</h1><p>Laporkan kehilangan, pantau statusnya, dan ambil barang Anda setelah petugas memverifikasi kepemilikan.</p></div>
<ol class="steps"><li><em>1</em><span><b>Buat laporan</b>Isi ciri barang, lokasi, dan foto.</span></li><li><em>2</em><span><b>Diverifikasi petugas</b>Laporan tampil di forum setelah disetujui.</span></li><li><em>3</em><span><b>Ambil barang</b>Petugas menghubungi Anda bila barang cocok.</span></li></ol></div>
<div class="pane"><div class="box"><button type="button" class="btn ghost sm" style="margin-bottom:16px" onclick="location.hash='#/'">&larr; Kembali ke beranda</button><div class="tabs"><button class="${reg ? "" : "on"}" onclick="ST.auth='login';render()">Masuk</button><button class="${reg ? "on" : ""}" onclick="ST.auth='reg';render()">Daftar</button></div>
<h2>${reg ? "Buat akun mahasiswa" : "Selamat datang"}</h2><p class="sub">${reg ? "Satu NIM hanya dapat memiliki satu akun." : "Masuk menggunakan NIM dan kata sandi Anda."}</p>
<form onsubmit="event.preventDefault();doAuth()">${reg ? `<div class="f"><label>Nama lengkap</label><input id="rn" placeholder="Masukkan nama lengkap" autocomplete="off"></div>` : ""}
<div class="f"><label>NIM</label><input id="nim" inputmode="numeric" placeholder="Masukkan NIM" autocomplete="off"></div>
${reg ? `<div class="f"><label>Program studi</label><input id="rp" placeholder="Masukkan program studi" autocomplete="off"></div>` : ""}
<div class="f"><label>Kata sandi</label>${pw("pw")}</div><button class="btn block">${reg ? "Daftar" : "Masuk"}</button></form>
<p class="hint">Petugas kampus? <a href="#/admin">Masuk sebagai admin</a></p></div></div></div>`;
}

function doAuth() {
  const nim = $("#nim").value.trim(),
    p = $("#pw").value;
  if (ST.auth === "reg") {
    const n = $("#rn").value.trim(),
      pr = $("#rp").value.trim();
    if (!n || !nim || !pr || !p)
      return toast("Lengkapi semua data pendaftaran.");
    if (DB.users.some((u) => u.nim === nim))
      return toast("NIM sudah terdaftar. Silakan masuk.");
    const u = { id: Date.now(), name: n, nim, prodi: pr, role: "user" };
    DB.users.push(u);
    ST.user = u;
    ST.view = "forum";
    toast("Akun berhasil dibuat.");
    return render();
  }
  if (!nim || !p) return toast("Isi NIM dan kata sandi.");
  const u = DB.users.find((x) => x.nim === nim && x.role === "user");
  if (!u) return toast("NIM belum terdaftar. Silakan daftar terlebih dahulu.");
  ST.user = u;
  ST.view = "forum";
  render();
}

function doAdmin() {
  const u = $("#au").value.trim(),
    p = $("#ap").value;
  if (!u || !p) return toast("Isi nama pengguna dan kata sandi.");
  if (u !== "admin" || p !== "admin123")
    return toast("Nama pengguna atau kata sandi salah.");
  ST.user = DB.users[3];
  ST.view = "dash";
  render();
}

function logout() {
  const a = ST.user.role === "admin";
  ST.user = null;
  ST.view = "";
  ST.auth = "login";
  location.hash = a ? "#/admin" : "#/";
  render();
}

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const fmtT = (x) =>
  new Date(x).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

function unread() {
  const a = ST.user.role === "admin";
  return DB.msgs.filter(
    (m) =>
      !m.read &&
      (a ? m.from === "user" : m.from === "admin" && m.uid === ST.user.id),
  ).length;
}

function markRead() {
  const a = ST.user.role === "admin",
    uid = a ? ST.chat : ST.user.id;
  DB.msgs.forEach((m) => {
    if (m.uid === uid && m.from === (a ? "user" : "admin")) m.read = true;
  });
}

function sendM(f) {
  const t = f.t.value.trim();
  if (!t) return;
  const a = ST.user.role === "admin";
  DB.msgs.push({
    id: Date.now(),
    uid: a ? ST.chat : ST.user.id,
    from: a ? "admin" : "user",
    text: t,
    at: new Date(),
    read: false,
  });
  app();
  const i = $(".cf textarea");
  if (i) i.focus();
}

function chatWith(uid, rid) {
  const r = DB.reports.find((x) => x.id === rid);
  ST.chat = uid;
  ST.draft = r ? `Mengenai laporan "${r.name}": ` : "";
  const e = $("dialog");
  if (e && e.open) e.close();
  nav("pesan");
}

function app() {
  const a = ST.user.role === "admin",
    pend = DB.reports.filter((r) => r.status === "PENDING").length,
    fnd = DB.reports.filter((r) => r.status === "FOUND").length;
  if (ST.view === "pesan") {
    if (a && !ST.chat)
      ST.chat = (DB.users.find((u) => u.role === "user") || {}).id;
    markRead();
  }
  const unr = unread();
  const M = a
    ? [
        ["Utama"],
        ["dash", "Dashboard"],
        ["pesan", "Pesan", unr],
        ["Laporan"],
        ["masuk", "Laporan masuk", pend],
        ["forum", "Forum"],
        ["Barang"],
        ["temuan", "Barang ditemukan"],
        ["cocok", "Pencocokan"],
        ["kembali", "Pengembalian", fnd],
        ["Data"],
        ["users", "Data user"],
        ["riwayat", "Riwayat"],
      ]
    : [
        ["forum", "Forum Lost & Found"],
        ["lapor", "Laporkan barang hilang"],
        ["saya", "Laporan saya"],
        ["pesan", "Pesan", unr],
        ["profil", "Profil"],
      ];
  if (!ST.view) ST.view = M.find((m) => m[1])[0];

  const bottomNav = !a ? `
    <nav class="bottom-nav" aria-label="Navigasi Bawah">
      <button type="button" class="b-nav-item ${ST.view === 'forum' ? 'active' : ''}" onclick="nav('forum')">
        <svg class="i" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Forum</span>
      </button>
      <button type="button" class="b-nav-item ${ST.view === 'lapor' ? 'active' : ''}" onclick="nav('lapor')">
        <svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        <span>Lapor</span>
      </button>
      <button type="button" class="b-nav-item ${ST.view === 'saya' ? 'active' : ''}" onclick="nav('saya')">
        <svg class="i" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span>Laporan</span>
      </button>
      <button type="button" class="b-nav-item ${ST.view === 'pesan' ? 'active' : ''}" onclick="nav('pesan')">
        <svg class="i" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <span>Pesan</span>
        ${unr ? `<span class="cnt-badge">${unr}</span>` : ""}
      </button>
      <button type="button" class="b-nav-item" onclick="toggleMobileMenu()">
        <svg class="i" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        <span>Menu</span>
      </button>
    </nav>` : '';

  $("#root").innerHTML =
    `<div class="app">
      <!-- Topbar Header untuk Layar Sedang & Kecil (Tablet & Mobile) -->
      <header class="app-topbar">
        <button type="button" class="btn-menu-toggle" aria-label="Buka Menu" onclick="toggleMobileMenu()">
          <svg class="i" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div class="topbar-logo-wrap">${logo}</div>
        <div class="topbar-right">
          <span class="user-chip"><b>${ST.user.name}</b></span>
          <button type="button" class="btn ghost sm btn-logout-top" onclick="logout()">Keluar</button>
        </div>
      </header>

      <!-- Backdrop overlay saat drawer menu terbuka di layar kecil/sedang -->
      <div id="navBackdrop" class="nav-backdrop" onclick="closeMobileMenu()"></div>

      <aside id="appAside">
        <div class="aside-header">
          ${logo}
          <button type="button" class="btn-close-aside" aria-label="Tutup Menu" onclick="closeMobileMenu()">
            <svg class="i" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="aside-nav-list">
          ${M.map((m) => (m.length === 1 ? `<div class="grp">${m[0]}</div>` : `<button class="nav ${ST.view === m[0] ? "on" : ""}" onclick="nav('${m[0]}')">${m[1]}${m[2] ? `<span class="cnt">${m[2]}</span>` : ""}</button>`)).join("")}
        </div>
        <div class="me">
          <b>${ST.user.name}</b>${a ? "Admin Petugas" : "NIM " + ST.user.nim}<br>
          <button type="button" onclick="logout()">Keluar</button>
        </div>
      </aside>

      <main id="main"></main>
      ${bottomNav}
    </div>`;
  V[ST.view]();
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
const tbl = (cols, rows) => {
  const labeledRows = rows.map((row) => {
    let colIdx = 0;
    return row.replace(/<td\b([^>]*)>/gi, (match, attrs) => {
      const colName = cols[colIdx++] || "";
      return `<td data-label="${esc(colName)}"${attrs}>`;
    });
  });
  return `<div class="card tw"><table><thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${labeledRows.length ? labeledRows.join("") : `<tr><td colspan="${cols.length}" class="empty">Belum ada data.</td></tr>`}</tbody></table></div>`;
};

const V = {
  forum() {
    const adm = !!ST.user && ST.user.role === "admin";
    const l = DB.reports
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

    const activeFilters = (ST.fc ? 1 : 0) + (ST.fg ? 1 : 0) + (ST.fl ? 1 : 0) + (ST.fs ? 1 : 0);

    $("#main").innerHTML =
      head(
        "Forum Lost & Found",
        "Laporan barang hilang yang sudah diverifikasi dan masih berlaku.",
        ST.user
          ? ""
          : "<button class='btn' onclick=\"goLogin('Silakan masuk untuk melaporkan barang hilang.')\">Laporkan barang</button>",
      ) +
      `<div class="bar">
        <div class="bar-search-row">
          <div class="search-wrap">
            <svg class="search-ic i" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
            <input id="sq" placeholder="Cari nama barang, merk, atau deskripsi" value="${esc(ST.q)}" oninput="ST.q=this.value;clearTimeout(window.tm);window.tm=setTimeout(()=>{V.forum();const i=$('#sq');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}},250)">
            ${ST.q ? `<button type="button" class="btn-clear-search" aria-label="Hapus pencarian" onclick="ST.q='';V.forum()">&times;</button>` : ''}
          </div>
          <button type="button" class="btn-filter-toggle ${ST.showFilters ? 'open' : ''} ${activeFilters ? 'has-active' : ''}" onclick="ST.showFilters=!ST.showFilters;V.forum()">
            <svg class="i" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span>Filter</span>
            ${activeFilters ? `<span class="filter-count">${activeFilters}</span>` : ''}
          </button>
        </div>
        <div class="bar-filters-panel ${ST.showFilters ? 'open' : ''}">
          <div class="filter-field">${sel("fc", CATS, "Semua kategori")}</div>
          <div class="filter-field-loc">${locFilter()}</div>
          <div class="filter-field">${sel("fs", adm ? Object.keys(S) : ["ACTIVE", "FOUND"], "Semua status", S)}</div>
          ${activeFilters ? `<button type="button" class="btn-reset-filter" onclick="ST.fc=ST.fg=ST.fl=ST.fs='';V.forum()">Reset Filter</button>` : ''}
        </div>
      </div>` +
      (l.length
        ? `<div class="grid">${l.map((r) => `<div class="card item" onclick="detail(${r.id})"><div class="ph">${ic(IC.photo)}${badge(r.status)}</div><div class="b"><h3>${r.name}</h3><div class="meta">${r.cat}</div><div class="meta">${r.loc}</div><div class="meta">Hilang ${fmt(r.date)}</div></div></div>`).join("")}</div>`
        : `<div class="card empty">Tidak ada laporan yang sesuai dengan pencarian.</div>`);
  },
  lapor() {
    $("#main").innerHTML =
      head(
        "Laporkan barang hilang",
        "Laporan diperiksa petugas sebelum tampil di forum.",
      ) +
      `<form class="card pad form" onsubmit="event.preventDefault();sendR(this)"><div class="f"><label>Nama barang</label><input name="n" required placeholder="Contoh: Dompet kulit"></div><div class="f"><label>Kategori</label><select name="c">${opts(CATS)}</select></div>
<div class="f"><label>Warna</label><input name="w" required placeholder="Contoh: Hitam"></div><div class="f"><label>Merk (jika ada)</label><input name="b" placeholder="Contoh: Eiger"></div>
<div class="f"><label>Tanggal kehilangan</label><input type="date" name="d" required value="2026-09-30"></div><div class="f"><label>Gedung</label><select name="g" onchange="gdg(this)"><option>Gedung A</option><option>Gedung B</option></select></div><div class="f"><label>Lokasi terakhir</label><select name="l" onchange="kls(this)">${locOpts("Gedung A")}</select></div><div class="f kn"><label>Nomor ruang kelas (4 digit)</label><input name="kn" inputmode="numeric" autocomplete="off" required maxlength="4" minlength="4" pattern="[0-9]{4}" title="Isi 4 digit angka" placeholder="Contoh: 1305" oninput="this.value=this.value.replace(/[^0-9]/g,'')"></div>
<div class="f w"><label>Foto barang</label><input type="file" accept="image/*"></div><div class="f w"><label>Deskripsi dan ciri khusus</label><textarea name="ds" required placeholder="Tuliskan ciri khas yang hanya diketahui pemilik"></textarea></div>
<div class="w"><button class="btn">Kirim laporan</button></div></form>`;
  },
  saya() {
    const l = DB.reports.filter((r) => r.uid === ST.user.id);
    $("#main").innerHTML =
      head(
        "Laporan saya",
        "Pantau status dan riwayat laporan Anda.",
        "<button class='btn' onclick=\"nav('lapor')\">Buat laporan baru</button>",
      ) +
      tbl(
        ["Barang", "Lokasi", "Tanggal hilang", "Status", ""],
        l.map(
          (r) =>
            `<tr><td><b>${r.name}</b><div class="meta">${r.cat}</div></td><td>${r.loc}</td><td>${fmt(r.date)}</td><td>${badge(r.status)}</td><td><button class="btn ghost sm" onclick="detail(${r.id})">Detail</button></td></tr>`,
        ),
      );
  },
  profil() {
    const u = ST.user;
    $("#main").innerHTML =
      head("Profil", "Data akun Anda.") +
      `<div class="card pad" style="max-width:520px"><dl class="dl"><dt>Nama lengkap</dt><dd>${u.name}</dd><dt>NIM</dt><dd>${u.nim}</dd><dt>Program studi</dt><dd>${u.prodi}</dd><dt>Role</dt><dd>Mahasiswa</dd></dl></div>`;
  },
  dash() {
    const c = (k) => DB.reports.filter((r) => r.status === k).length;
    $("#main").innerHTML =
      head("Dashboard", "Ringkasan laporan yang masuk ke sistem.") +
      `<div class="stats">${[
        ["Menunggu verifikasi", c("PENDING"), "var(--pending)"],
        ["Aktif di forum", c("ACTIVE"), "var(--active)"],
        ["Siap dikembalikan", c("FOUND"), "var(--found)"],
        ["Sudah dikembalikan", c("RETURNED"), "var(--ret)"],
      ]
        .map(
          (s) =>
            `<div class="card stat" style="--c:${s[2]}"><b>${s[1]}</b><span>${s[0]}</span></div>`,
        )
        .join("")}</div>
<div class="two"><div><h3 class="t">Perlu diverifikasi</h3>${tbl(
        ["Barang", "Pelapor"],
        DB.reports
          .filter((r) => r.status === "PENDING")
          .map((r) => `<tr><td>${r.name}</td><td>${uname(r.uid)}</td></tr>`),
      )}</div>
<div><h3 class="t">Barang temuan terbaru</h3>${tbl(
        ["Barang", "Status"],
        DB.found.map((f) => `<tr><td>${f.name}</td><td>${f.status}</td></tr>`),
      )}</div></div>`;
  },
  masuk() {
    $("#main").innerHTML =
      head(
        "Laporan masuk",
        "Periksa laporan sebelum dipublikasikan ke forum.",
      ) +
      tbl(
        ["Barang", "Pelapor", "Lokasi", "Status", ""],
        DB.reports
          .filter((r) => r.status === "PENDING")
          .map(
            (r) =>
              `<tr><td><b>${r.name}</b><div class="meta">${r.cat}</div></td><td>${uname(r.uid)}</td><td>${r.loc}</td><td>${badge(r.status)}</td><td><div class="act"><button class="btn ghost sm" onclick="detail(${r.id})">Detail</button><button class="btn sm" onclick="setR(${r.id},'ACTIVE');toast('Laporan disetujui dan tampil di forum');app()">Setujui</button><button class="btn bad sm" onclick="setR(${r.id},'REJECTED');toast('Laporan ditolak');app()">Tolak</button></div></td></tr>`,
          ),
      );
  },
  temuan() {
    $("#main").innerHTML =
      head(
        "Barang ditemukan",
        "Catat barang yang diserahkan penemu ke petugas.",
      ) +
      `<form class="card pad form" style="margin-bottom:22px" onsubmit="event.preventDefault();const f=this;DB.found.unshift({id:Date.now(),name:f.n.value,cat:f.c.value,loc:locOf(f),date:NOW,status:'Tersimpan'});toast('Barang temuan dicatat');V.temuan()">
<div class="f"><label>Nama barang</label><input name="n" required placeholder="Contoh: Kunci motor"></div><div class="f"><label>Kategori</label><select name="c">${opts(CATS)}</select></div>
<div class="f"><label>Gedung</label><select name="g" onchange="gdg(this)"><option>Gedung A</option><option>Gedung B</option></select></div><div class="f"><label>Lokasi ditemukan</label><select name="l" onchange="kls(this)">${locOpts("Gedung A")}</select></div><div class="f kn"><label>Nomor ruang kelas (4 digit)</label><input name="kn" inputmode="numeric" autocomplete="off" required maxlength="4" minlength="4" pattern="[0-9]{4}" title="Isi 4 digit angka" placeholder="Contoh: 1305" oninput="this.value=this.value.replace(/[^0-9]/g,'')"></div><div class="f"><label>Foto</label><input type="file"></div>
<div class="f w"><label>Deskripsi</label><textarea name="ds" placeholder="Kondisi dan ciri barang saat diterima"></textarea></div><div class="w"><button class="btn">Simpan barang temuan</button></div></form>` +
      tbl(
        ["Barang", "Kategori", "Lokasi", "Tanggal", "Status"],
        DB.found.map(
          (f) =>
            `<tr><td><b>${f.name}</b></td><td>${f.cat}</td><td>${f.loc}</td><td>${fmt(f.date)}</td><td>${f.status}</td></tr>`,
        ),
      );
  },
  cocok() {
    const rs = DB.reports.filter((r) => r.status === "ACTIVE"),
      fs = DB.found.filter((f) => f.status === "Tersimpan"),
      ok = rs.length && fs.length;
    $("#main").innerHTML =
      head(
        "Pencocokan barang",
        "Hubungkan barang temuan dengan laporan yang sesuai.",
      ) +
      `<form class="card pad" style="max-width:640px" onsubmit="event.preventDefault();doMatch(this)"><div class="f"><label>Barang temuan</label><select name="f">${fs.map((f) => `<option value="${f.id}">${f.name} (${f.loc})</option>`).join("")}</select></div>
<div class="f"><label>Laporan kehilangan</label><select name="r">${rs.map((r) => `<option value="${r.id}">${r.name} -${uname(r.uid)}</option>`).join("")}</select></div>
<button class="btn" ${ok ? "" : "disabled"}>Hubungkan dan tandai ditemukan</button>${ok ? "" : `<p class="hint" style="text-align:left">Butuh minimal satu barang temuan tersimpan dan satu laporan aktif.</p>`}</form>`;
  },
  kembali() {
    $("#main").innerHTML =
      head(
        "Pengembalian barang",
        "Verifikasi kepemilikan sebelum barang diserahkan.",
      ) +
      tbl(
        ["Pelapor", "Barang", "Kontak", ""],
        DB.reports
          .filter((r) => r.status === "FOUND")
          .map((r) => {
            const u = DB.users.find((x) => x.id === r.uid) || {};
            return `<tr><td>${u.name}<div class="meta">NIM ${u.nim}</div></td><td>${r.name}</td><td><button class="btn ghost sm" onclick="chatWith(${r.uid},${r.id})">Hubungi pelapor</button></td><td><button class="btn sm" onclick="verif(${r.id})">Verifikasi dan serahkan</button></td></tr>`;
          }),
      );
  },
  pesan() {
    const a = ST.user.role === "admin",
      me = a ? "admin" : "user",
      uid = a ? ST.chat : ST.user.id,
      us = DB.users.filter((u) => u.role === "user"),
      list = DB.msgs.filter((m) => m.uid === uid),
      last = (id) => DB.msgs.filter((m) => m.uid === id).slice(-1)[0],
      un = (id) =>
        DB.msgs.filter((m) => m.uid === id && m.from === "user" && !m.read)
          .length;
    const side = a
      ? `<div class="clist-wrapper"><div class="clist-mobile-header"><span class="clist-label"><svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;vertical-align:-2px"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Kontak:</span><select class="clist-select" onchange="ST.chat=Number(this.value);app()">${us
          .map((u) => {
            const n = un(u.id);
            return `<option value="${u.id}" ${u.id === uid ? "selected" : ""}>${esc(u.name)}${n ? ` (${n} pesan baru)` : ""}</option>`;
          })
          .join("")}</select></div><div class="clist">${us
          .map((u) => {
            const l = last(u.id),
              n = un(u.id);
            return `<button class="cu ${u.id === uid ? "on" : ""}" onclick="ST.chat=${u.id};app()"><span><b>${esc(u.name)}</b><div class="meta">${l ? esc(l.text) : "Belum ada pesan"}</div></span>${n ? `<span class="cnt">${n}</span>` : ""}</button>`;
          })
          .join("")}</div></div>`
      : "";
    const draft = ST.draft;
    ST.draft = "";
    const thread = uid
      ? `<div class="cth"><div class="who">${esc(a ? uname(uid) : "Petugas Kemahasiswaan")}</div><div class="cb" id="cb">${
          list.length
            ? list
                .map(
                  (m) =>
                    `<div class="msg ${m.from === me ? "me" : ""}">${esc(m.text)}<time>${fmtT(m.at)}</time></div>`,
                )
                .join("")
            : `<div class="empty">Belum ada pesan. Mulai percakapan di bawah.</div>`
        }</div><form class="cf" onsubmit="event.preventDefault();sendM(this)"><textarea name="t" required placeholder="Tulis pesan" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();this.form.requestSubmit()}">${esc(draft)}</textarea><button class="btn">Kirim</button></form></div>`
      : `<div class="empty">Belum ada mahasiswa terdaftar.</div>`;
    $("#main").innerHTML =
      head(
        "Pesan",
        a
          ? "Balas pesan dari mahasiswa atau mulai percakapan baru."
          : "Hubungi petugas kemahasiswaan terkait laporan Anda.",
      ) + `<div class="card chat ${a ? "" : "solo"}">${side}${thread}</div>`;
    const cb = $("#cb");
    if (cb) cb.scrollTop = cb.scrollHeight;
  },
  users() {
    $("#main").innerHTML =
      head("Data user", "Akun mahasiswa terdaftar.") +
      tbl(
        ["Nama", "NIM", "Program studi", "Laporan"],
        DB.users
          .filter((u) => u.role === "user")
          .map(
            (u) =>
              `<tr><td>${u.name}</td><td>${u.nim}</td><td>${u.prodi}</td><td>${DB.reports.filter((r) => r.uid === u.id).length}</td></tr>`,
          ),
      );
  },
  riwayat() {
    $("#main").innerHTML =
      head("Riwayat", "Semua laporan, termasuk yang sudah kedaluwarsa.") +
      tbl(
        ["Barang", "Pelapor", "Tanggal hilang", "Status", ""],
        DB.reports.map(
          (r) =>
            `<tr><td>${r.name}</td><td>${uname(r.uid)}</td><td>${fmt(r.date)}</td><td>${badge(r.status)}</td><td><button class="btn ghost sm" onclick="detail(${r.id})">Detail</button></td></tr>`,
        ),
      );
  },
};

function sendR(f) {
  DB.reports.unshift({
    id: Date.now(),
    uid: ST.user.id,
    name: f.n.value,
    cat: f.c.value,
    color: f.w.value,
    brand: f.b.value,
    loc: locOf(f),
    date: new Date(f.d.value),
    desc: f.ds.value,
    status: "PENDING",
  });
  toast("Laporan terkirim, menunggu verifikasi admin");
  nav("saya");
}

function doMatch(f) {
  const r = +f.r.value,
    i = +f.f.value;
  setR(r, "FOUND");
  DB.found.find((x) => x.id === i).status = "Dicocokkan";
  toast("Laporan dihubungkan. Hubungi pelapor.");
  app();
}

// ===== FITUR HAPUS LAPORAN (Admin & Petugas) =====
const canDelete = () =>
  !!ST.user && (ST.user.role === "admin");

function closeDlg() {
  const e = $("dialog");
  if (e && e.open) e.close();
}

function deleteReport(id, ok) {
  if (!canDelete()) return toast("Anda tidak memiliki izin menghapus laporan.");
  const r = DB.reports.find((x) => x.id === id);
  if (!r) return;

  // Panggilan pertama: tampilkan dialog konfirmasi
  if (!ok) {
    dlg(`<h2>Hapus laporan?</h2>
      <p class="meta">"${esc(r.name)}" milik ${esc(uname(r.uid))} akan dihapus permanen dan tidak dapat dibatalkan.</p>
      <div class="foot">
        <button class="btn ghost" onclick="closeDlg()">Batal</button>
        <button class="btn bad" onclick="deleteReport(${id}, true)">Ya, Hapus</button>
      </div>`);
    return;
  }

  // Panggilan kedua (sudah dikonfirmasi): hapus
  DB.reports = DB.reports.filter((x) => x.id !== id);
  closeDlg();
  toast("Laporan berhasil dihapus.");
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

function detail(id) {
  const r = DB.reports.find((x) => x.id === id);
  if (!r) return;
  dlg(`<div class="ph" style="border-radius:8px;margin-bottom:16px">${ic(IC.photo)}</div>${badge(r.status)}<h2 style="margin-top:8px">${r.name}</h2><p class="meta" style="margin:0 0 16px">${r.cat}</p>
<dl class="dl"><dt>Warna</dt><dd>${r.color || "-"}</dd><dt>Merk</dt><dd>${r.brand || "-"}</dd><dt>Lokasi terakhir</dt><dd>${r.loc}</dd><dt>Tanggal hilang</dt><dd>${fmt(r.date)}</dd><dt>Deskripsi</dt><dd>${r.desc}</dd>${ST.user && ST.user.role === "admin" ? `<dt>Pelapor</dt><dd>${uname(r.uid)}</dd>` : ""}${r.appr ? `<dt>Berlaku sampai</dt><dd>${fmt(exp(r))}</dd>` : ""}</dl>
<div class="foot"><button class="btn ghost" onclick="$('dialog').close()">Tutup</button>${canDelete() ? `<button class="btn bad" onclick="deleteReport(${r.id})">Hapus laporan</button>` : ""}${ST.user && (ST.user.role === "admin" || ST.user.id === r.uid) ? `<button class="btn" onclick="chatWith(${r.uid},${r.id})">${ST.user.role === "admin" ? "Hubungi pelapor" : "Hubungi admin"}</button>` : ""}</div>`);
}

function verif(id) {
  const r = DB.reports.find((x) => x.id === id);
  dlg(`<h2>Verifikasi kepemilikan</h2><p class="meta">${r.name} - ${uname(r.uid)}</p><div class="chk"><label><input type="checkbox">Detail dan ciri khusus barang sesuai</label><label><input type="checkbox">Isi barang sesuai dengan keterangan pemilik</label><label><input type="checkbox">Bukti kepemilikan diperlihatkan</label><label><input type="checkbox">Informasi sesuai dengan laporan</label></div>
<div class="f"><label>Catatan petugas</label><textarea placeholder="Catatan penyerahan barang"></textarea></div>
<div class="foot"><button class="btn ghost" onclick="$('dialog').close()">Batal</button><button class="btn" onclick="if([...document.querySelectorAll('dialog input[type=checkbox]')].every(c=>c.checked)){setR(${id},'RETURNED');$('dialog').close();toast('Barang dicatat sudah dikembalikan');app()}else toast('Centang semua poin verifikasi terlebih dahulu')">Serahkan barang</button></div>`);
}

render();
