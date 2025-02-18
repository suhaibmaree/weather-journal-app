const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Add this line

let projectData = {};
const app = express();

// Middleware (keep your original code)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Fix static file serving (change to your actual folder name)
app.use(express.static(path.join(__dirname, 'website'))); // Keep 'website' if that's your folder name

// Add CORS preflight handling (keep your original routes)
app.options('*', cors());

// Keep your original POST route
app.post('/add', (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

// Keep your original GET route
app.get('/all', (req, res) => {
  res.send(projectData);
});

// Keep your server startup
const port = 8080;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));