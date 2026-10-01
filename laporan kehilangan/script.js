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
  "Fakultas Teknik",
  "Fakultas Ekonomi",
  "Perpustakaan pusat",
  "Kantin utama",
  "Masjid kampus",
  "Parkiran timur",
  "Gedung serbaguna",
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
      loc: LOCS[0],
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
      loc: LOCS[5],
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
      loc: LOCS[2],
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
      loc: LOCS[3],
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
      loc: LOCS[1],
      date: d(5),
      desc: "Tertulis nama di bagian belakang.",
      status: "RETURNED",
      appr: d(4),
    },
  ],
  found: [
    {
      id: 1,
      name: "Earbuds putih dengan case",
      cat: CATS[1],
      loc: LOCS[2],
      date: d(2),
      status: "Dicocokkan",
    },
    {
      id: 2,
      name: "Dompet hitam",
      cat: CATS[0],
      loc: LOCS[0],
      date: d(0),
      status: "Tersimpan",
    },
  ],
};

let ST = { user: null, auth: "login", view: "", q: "", fc: "", fl: "", fs: "" };

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

const nav = (v) => {
  ST.view = v;
  ST.q = ST.fc = ST.fl = ST.fs = "";
  render();
};

function render() {
  ST.user ? app() : auth();
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
<p class="hint"><a href="#/">Kembali ke halaman masuk mahasiswa</a></p></div></div>`;
    return;
  }
  const reg = ST.auth === "reg";
  $("#root").innerHTML =
    `<div class="auth"><div class="hero"><div>${logo.replace("<div", "<div style='margin-bottom:56px'")}<h1>Barang hilang kembali ke pemilik lewat satu pintu resmi.</h1><p>Laporkan kehilangan, pantau statusnya, dan ambil barang Anda setelah petugas memverifikasi kepemilikan.</p></div>
<ol class="steps"><li><em>1</em><span><b>Buat laporan</b>Isi ciri barang, lokasi, dan foto.</span></li><li><em>2</em><span><b>Diverifikasi petugas</b>Laporan tampil di forum setelah disetujui.</span></li><li><em>3</em><span><b>Ambil barang</b>Petugas menghubungi Anda bila barang cocok.</span></li></ol></div>
<div class="pane"><div class="box"><div class="tabs"><button class="${reg ? "" : "on"}" onclick="ST.auth='login';render()">Masuk</button><button class="${reg ? "on" : ""}" onclick="ST.auth='reg';render()">Daftar</button></div>
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

function app() {
  const a = ST.user.role === "admin",
    pend = DB.reports.filter((r) => r.status === "PENDING").length,
    fnd = DB.reports.filter((r) => r.status === "FOUND").length;
  const M = a
    ? [
        ["Utama"],
        ["dash", "Dashboard"],
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
        ["profil", "Profil"],
      ];
  if (!ST.view) ST.view = M.find((m) => m[1])[0];
  $("#root").innerHTML =
    `<div class="app"><aside>${logo}${M.map((m) => (m.length === 1 ? `<div class="grp">${m[0]}</div>` : `<button class="nav ${ST.view === m[0] ? "on" : ""}" onclick="nav('${m[0]}')">${m[1]}${m[2] ? `<span class="cnt">${m[2]}</span>` : ""}</button>`)).join("")}
<div class="me"><b>${ST.user.name}</b>${a ? "Admin" : "NIM " + ST.user.nim}<br><button onclick="logout()">Keluar</button></div></aside><main id="main"></main></div>`;
  V[ST.view]();
}

const head = (t, p, x = "") =>
  `<div class="head"><div><h1>${t}</h1><p>${p}</p></div>${x}</div>`;
const sel = (k, arr, ph, lab) =>
  `<select onchange="ST.${k}=this.value;V.forum()"><option value="">${ph}</option>${arr.map((o) => `<option value="${o}" ${ST[k] === o ? "selected" : ""}>${lab ? lab[o] : o}</option>`).join("")}</select>`;
const tbl = (cols, rows) =>
  `<div class="card tw"><table><thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${rows.length ? rows.join("") : `<tr><td colspan="${cols.length}" class="empty">Belum ada data.</td></tr>`}</tbody></table></div>`;

const V = {
  forum() {
    const adm = ST.user.role === "admin";
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
          (!ST.fl || r.loc === ST.fl),
      );

    $("#main").innerHTML =
      head(
        "Forum Lost & Found",
        "Laporan barang hilang yang sudah diverifikasi dan masih berlaku.",
      ) +
      `<div class="bar"><input id="sq" placeholder="Cari nama barang, merk, atau deskripsi" value="${ST.q}" oninput="ST.q=this.value;clearTimeout(window.tm);window.tm=setTimeout(()=>{V.forum();const i=$('#sq');i.focus();i.setSelectionRange(i.value.length,i.value.length)},250)">${sel("fc", CATS, "Semua kategori")}${sel("fl", LOCS, "Semua lokasi")}${sel("fs", adm ? Object.keys(S) : ["ACTIVE", "FOUND"], "Semua status", S)}</div>` +
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
<div class="f"><label>Tanggal kehilangan</label><input type="date" name="d" required value="2026-09-30"></div><div class="f"><label>Lokasi terakhir</label><select name="l">${opts(LOCS)}</select></div>
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
      `<form class="card pad form" style="margin-bottom:22px" onsubmit="event.preventDefault();const f=this;DB.found.unshift({id:Date.now(),name:f.n.value,cat:f.c.value,loc:f.l.value,date:NOW,status:'Tersimpan'});toast('Barang temuan dicatat');V.temuan()">
<div class="f"><label>Nama barang</label><input name="n" required placeholder="Contoh: Kunci motor"></div><div class="f"><label>Kategori</label><select name="c">${opts(CATS)}</select></div>
<div class="f"><label>Lokasi ditemukan</label><select name="l">${opts(LOCS)}</select></div><div class="f"><label>Foto</label><input type="file"></div>
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
            return `<tr><td>${u.name}<div class="meta">NIM ${u.nim}</div></td><td>${r.name}</td><td>Hubungi pelapor</td><td><button class="btn sm" onclick="verif(${r.id})">Verifikasi dan serahkan</button></td></tr>`;
          }),
      );
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
    loc: f.l.value,
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
<dl class="dl"><dt>Warna</dt><dd>${r.color || "-"}</dd><dt>Merk</dt><dd>${r.brand || "-"}</dd><dt>Lokasi terakhir</dt><dd>${r.loc}</dd><dt>Tanggal hilang</dt><dd>${fmt(r.date)}</dd><dt>Deskripsi</dt><dd>${r.desc}</dd>${ST.user.role === "admin" ? `<dt>Pelapor</dt><dd>${uname(r.uid)}</dd>` : ""}${r.appr ? `<dt>Berlaku sampai</dt><dd>${fmt(exp(r))}</dd>` : ""}</dl>
<div class="foot"><button class="btn ghost" onclick="$('dialog').close()">Tutup</button></div>`);
}

function verif(id) {
  const r = DB.reports.find((x) => x.id === id);
  dlg(`<h2>Verifikasi kepemilikan</h2><p class="meta">${r.name} - ${uname(r.uid)}</p><div class="chk"><label><input type="checkbox">Detail dan ciri khusus barang sesuai</label><label><input type="checkbox">Isi barang sesuai dengan keterangan pemilik</label><label><input type="checkbox">Bukti kepemilikan diperlihatkan</label><label><input type="checkbox">Informasi sesuai dengan laporan</label></div>
<div class="f"><label>Catatan petugas</label><textarea placeholder="Catatan penyerahan barang"></textarea></div>
<div class="foot"><button class="btn ghost" onclick="$('dialog').close()">Batal</button><button class="btn" onclick="if([...document.querySelectorAll('dialog input[type=checkbox]')].every(c=>c.checked)){setR(${id},'RETURNED');$('dialog').close();toast('Barang dicatat sudah dikembalikan');app()}else toast('Centang semua poin verifikasi terlebih dahulu')">Serahkan barang</button></div>`);
}

render();