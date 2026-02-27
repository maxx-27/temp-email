const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const API_URL = "https://www.1secmail.com/api/v1/";

// 1. Generate Email Baru
app.get('/gen-email', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}?action=genEmail&count=1`);
        res.json({ email: response.data[0] });
    } catch (error) {
        res.status(500).json({ error: "Gagal membuat email" });
    }
});

// 2. Cek Inbox
app.get('/get-messages', async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email dibutuhkan" });

    const [user, domain] = email.split('@');
    try {
        const response = await axios.get(`${API_URL}?action=getMessages&login=${user}&domain=${domain}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil pesan" });
    }
});

// 3. Baca Isi Email
app.get('/read-message', async (req, res) => {
    const { email, id } = req.query;
    const [user, domain] = email.split('@');
    try {
        const response = await axios.get(`${API_URL}?action=readMessage&login=${user}&domain=${domain}&id=${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Gagal membaca pesan" });
    }
});

// Middleware untuk melayani file statis (html, css, js)
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); 

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});