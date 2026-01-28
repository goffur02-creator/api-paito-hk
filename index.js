const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/paito-hk-4d', (req, res) => {
    // Ini data contoh agar tidak error saat di-tes
    const dataPaito = [
        { "date": "2023-10-25", "result": "1234" },
        { "date": "2023-10-24", "result": "5678" }
    ];
    res.json({ status: "success", data: dataPaito });
});

app.listen(PORT, () => console.log(`Server nyala di port ${PORT}`));

