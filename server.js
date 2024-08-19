const WebTorrent = require('webtorrent-hybrid');
const express = require('express');
const path = require('path');

const app = express();
const client = new WebTorrent();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API to add a torrent
app.get('/add-torrent', (req, res) => {
    const magnetURI = req.query.magnet;
    if (!magnetURI) {
        return res.status(400).send('Magnet URI is required');
    }

    client.add(magnetURI, (torrent) => {
        console.log(`Torrent added: ${torrent.name}`);
        torrent.on('done', () => {
            console.log(`Torrent download complete: ${torrent.name}`);
        });

        res.send('Torrent added');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
