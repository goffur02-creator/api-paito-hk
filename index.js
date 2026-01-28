const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// Jalur untuk Paito 4D
app.get('/paito-hk-4d', async (req, res) => {
    try {
        const { data } = await axios.get('https://virdsam.org', { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(data);
        let hasil = [];
        $('table tr').each((i, el) => {
            const row = $(el).find('td').text().trim();
            if (row) hasil.push({ result: row.substring(0, 4) });
        });
        res.json({ status: "success", type: "HK-4D", data: hasil.slice(0, 30) });
    } catch (e) { res.status(500).json({ status: "error" }); }
});

// Jalur BARU untuk Paito 6D
app.get('/paito-hk-6d', async (req, res) => {
    try {
        // Sumber 6D biasanya berbeda, kita ambil dari sumber paito 6d virdsam
        const { data } = await axios.get('https://virdsam.org', { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(data);
        let hasil = [];
        $('table tr').each((i, el) => {
            const row = $(el).find('td').text().trim();
            if (row) {
                // Mengambil 6 angka (paito 6D)
                const cleanData = row.replace(/\s+/g, ''); // bersihkan spasi
                hasil.push({ result: cleanData.substring(0, 6) });
            }
        });
        res.json({ status: "success", type: "HK-6D", data: hasil.slice(0, 30) });
    } catch (e) { res.status(500).json({ status: "error" }); }
});

app.listen(PORT, () => console.log(`Server ON port ${PORT}`));

