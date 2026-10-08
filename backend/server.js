const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sajikan file frontend secara statis (opsional, jika ingin frontend & backend jalan di 1 port)
app.use(express.static(path.join(__dirname, '../frontend')));

// ==========================================
// 1. ROUTE KATEGORI
// ==========================================
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// 2. ROUTE LAPORAN KEHILANGAN (LOST REPORTS)
// ==========================================
// Ambil semua laporan aktif untuk forum (atau semua laporan untuk admin)
app.get('/api/reports', async (req, res) => {
  try {
    const { status, user_id } = req.query;
    let query = `
      SELECT r.*, c.name AS category_name, u.name AS user_name, u.nim, u.prodi 
      FROM lost_reports r
      JOIN categories c ON r.category_id = c.id
      JOIN users u ON r.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    }
    if (user_id) {
      query += ' AND r.user_id = ?';
      params.push(user_id);
    }

    query += ' ORDER BY r.created_at DESC';

    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Tambah laporan kehilangan baru
app.post('/api/reports', async (req, res) => {
  try {
    const {
      user_id,
      category_id,
      item_name,
      color,
      brand,
      building,
      lost_location,
      classroom_number,
      lost_date,
      description,
      photo,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO lost_reports 
      (user_id, category_id, item_name, color, brand, building, lost_location, classroom_number, lost_date, description, photo, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
      [
        user_id,
        category_id,
        item_name,
        color,
        brand || '',
        building,
        lost_location,
        classroom_number || null,
        lost_date,
        description,
        photo || '',
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Laporan berhasil dibuat, menunggu verifikasi Admin.',
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// 3. ROUTE BARANG TEMUAN (FOUND ITEMS)
// ==========================================
app.get('/api/found', async (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT f.*, c.name AS category_name 
      FROM found_items f
      JOIN categories c ON f.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND f.status = ?';
      params.push(status);
    }

    query += ' ORDER BY f.created_at DESC';

    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Tambah barang temuan (oleh Petugas atau Admin)
app.post('/api/found', async (req, res) => {
  try {
    const {
      category_id,
      item_name,
      color,
      brand,
      building,
      found_location,
      classroom_number,
      found_date,
      description,
      photo,
      received_by_id,
      received_by_name,
      role, // 'petugas' atau 'admin'
    } = req.body;

    // Jika Admin mencatat langsung, langsung APPROVED. Jika Petugas, PENDING_APPROVAL.
    const status = role === 'admin' ? 'APPROVED' : 'PENDING_APPROVAL';
    const approved_by_id = role === 'admin' ? received_by_id : null;
    const approved_at = role === 'admin' ? new Date() : null;

    const [result] = await db.query(
      `INSERT INTO found_items 
      (category_id, item_name, color, brand, building, found_location, classroom_number, found_date, description, photo, status, received_by_id, received_by_name, approved_by_id, approved_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        category_id,
        item_name,
        color || '',
        brand || '',
        building,
        found_location,
        classroom_number || null,
        found_date,
        description || '',
        photo || '',
        status,
        received_by_id,
        received_by_name,
        approved_by_id,
        approved_at,
      ]
    );

    res.status(201).json({
      success: true,
      message: role === 'admin' ? 'Barang temuan berhasil dicatat (APPROVED).' : 'Barang temuan berhasil dicatat, menunggu ACC Admin.',
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==========================================
// 4. ROUTE AUTH (LOGIN & REGISTER)
// ==========================================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, nim, password } = req.body;

    let query = '';
    let param = '';

    if (nim) {
      query = 'SELECT * FROM users WHERE nim = ? AND role = "user"';
      param = nim;
    } else if (username) {
      query = 'SELECT * FROM users WHERE username = ?';
      param = username;
    } else {
      return res.status(400).json({ success: false, message: 'NIM atau username wajib diisi.' });
    }

    const [users] = await db.query(query, [param]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Akun tidak ditemukan.' });
    }

    const user = users[0];
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Kata sandi salah.' });
    }

    // Hapus field password saat respon
    delete user.password;

    res.json({
      success: true,
      message: 'Login berhasil.',
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, nim, prodi, password } = req.body;
    if (!name || !nim || !prodi || !password) {
      return res.status(400).json({ success: false, message: 'Lengkapi seluruh data pendaftaran.' });
    }

    // Cek apakah NIM sudah ada
    const [existing] = await db.query('SELECT id FROM users WHERE nim = ?', [nim]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'NIM sudah terdaftar.' });
    }

    const [result] = await db.query(
      'INSERT INTO users (name, nim, prodi, password, role) VALUES (?, ?, ?, ?, "user")',
      [name, nim, prodi, password]
    );

    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil.',
      user: { id: result.insertId, name, nim, prodi, role: 'user' },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` Server API Express.js berjalan!`);
  console.log(` Port    : http://localhost:${PORT}`);
  console.log(` Frontend: http://localhost:${PORT}/index.html`);
  console.log(`=========================================`);
});
