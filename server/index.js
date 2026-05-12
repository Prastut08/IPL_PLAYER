const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5174;
const PREDICTION_API_URL = process.env.PREDICTION_API_URL || '';
const PREDICTION_API_KEY = process.env.PREDICTION_API_KEY || '';
const PREDICTION_API_KEY_HEADER = process.env.PREDICTION_API_KEY_HEADER || 'Authorization';

if (!PREDICTION_API_URL) {
  console.warn('Warning: PREDICTION_API_URL is not set. Proxy will respond with 500 until configured.');
}

app.post('/api/predict', async (req, res) => {
  try {
    if (!PREDICTION_API_URL) return res.status(500).json({ error: 'PREDICTION_API_URL not configured' });

    const payload = req.body || {};

    const headers = { 'Content-Type': 'application/json' };
    if (PREDICTION_API_KEY) {
      // Default to Bearer token header unless user provided a different header name
      headers[PREDICTION_API_KEY_HEADER] = PREDICTION_API_KEY_HEADER.toLowerCase() === 'authorization'
        ? `Bearer ${PREDICTION_API_KEY}`
        : PREDICTION_API_KEY;
    }

    const response = await axios.post(PREDICTION_API_URL, payload, { headers });
    res.status(response.status).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const data = err.response?.data || { message: err.message };
    res.status(status).json(data);
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Prediction proxy running on http://localhost:${PORT}`);
});
