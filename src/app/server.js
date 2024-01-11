const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./datenbank');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/feiertage', async (req, res) => {
    try {
        const feiertag = req.body;
        const { name, datum } = feiertag;
        const insertQuery = 'INSERT INTO feiertage (name, datum) VALUES ($1, $2) RETURNING *';
        const values = [name, datum];
        const result = await pool.query(insertQuery, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
