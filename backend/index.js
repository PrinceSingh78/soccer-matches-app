const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/competitions/CL/matches', {
      headers: {
        'X-Auth-Token': '0bd9cbaf486b44a5acb47c9beaa335a3'
      }
    });

    res.json(response.data.matches); // Send only the matches 
  } catch (err) {
    console.error('API Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at: http://localhost:${PORT}`);
});
