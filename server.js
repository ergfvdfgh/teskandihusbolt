/* global process */
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());



// Serve static files from dist directory
app.use(express.static('dist'));

// Fallback to index.html for SPA routing
app.use((req, res) => {
    res.sendFile('dist/index.html', { root: '.' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});