/* global process */
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Simple proxy endpoint for nekosapi
app.use('/nekosapi', async (req, res) => {
    try {
        const apiUrl = `https://api.nekosapi.com${req.url}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            return res.status(response.status).send(await response.text());
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Proxy error', details: error.message });
    }
});

// Serve static files from dist directory
app.use(express.static('dist'));

// Fallback to index.html for SPA routing
app.use((req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`NekosAPI proxy available at /nekosapi/*`);
});