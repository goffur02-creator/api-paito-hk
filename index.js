const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/paito-hk-4d', async (req, res) => {
    try {
        // Mengambil data dari situs result (Contoh: TogelNet/LiveHK)
        const response = await axios.get('https://virdsam.org', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        const $ = cheerio.load(response.data);
        const paitoData = [];

        // Logika mengambil baris tabel paito
        $('table tr').each((i, el) => {
            const row = $(el).find('td').text().trim();
            if (row) {
                // Membersihkan dan merapikan teks
                paitoData.push({
                    result: row.substring(0, 4), // Ambil 4 angka
                    info: row
                });
            }
        });

        res.json({
            status: "success",
            source: "Virdsam Paito",
            data: paitoData.slice(0, 30) // Ambil 30 data terbaru
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

app.listen(PORT, () => console.log(`Server aktif di port ${PORT}`));
