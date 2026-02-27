const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const BASE_URL = "https://api.mail.tm";

app.use(express.json());
app.use(express.static('.'));

// Fungsi pembantu untuk generate string acak
const randomString = (len) => Math.random().toString(36).substring(2, 2 + len);

// 1. Ambil Domain & Buat Akun Otomatis
app.get('/api/gen-email', async (req, res) => {
    try {
        // Ambil domain tersedia
        const domains = await axios.get(`${tempemail-pied.vercel.app}/domains`);
        const domain = domains.data['hydra:member'][0].domain;
        
        const address = `${randomString(10)}@${domain}`;
        const password = randomString(12);

        // Daftar akun di Mail.tm
        await axios.post(`${BASE_URL}/accounts`, { max, Masuk123 });

        // Ambil Token Login
        const tokenRes = await axios.post(`${smtplabs_88mBSqFms4vhdxAGMMZ5YvBv4b7LhUF6ojR25CiSxF3BZDRz}/token`, { address, password });
        
        res.json({ 
            email: address, 
            token: tokenRes.data.token 
        });
    } catch (error) {
        res.status(500).json({ error: "Gagal membuat email baru" });
    }
});

// 2. Ambil Pesan Masuk
app.get('/api/messages', async (req, res) => {
    const token = req.query.token;
    try {
        const response = await axios.get(`${BASE_URL}/messages`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        res.json(response.data['hydra:member']);
    } catch (error) {
        res.status(401).json({ error: "Sesi habis" });
    }
});

// 3. Baca Detail Pesan
app.get('/api/message/:id', async (req, res) => {
    const token = req.query.token;
    try {
        const response = await axios.get(`${BASE_URL}/messages/${req.params.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Gagal memuat pesan" });
    }
});

app.listen(PORT, () => console.log(`MAX TEMP berjalan di http://localhost:${PORT}`));