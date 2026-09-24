import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNtkplZTaCjRiRHofsfIgGINhX3W2ZF0HgV6xHdG0JzsLi8I8KbwG-dpH2TY_DtKa3/exec";

app.use(express.json());
app.use(express.text({ type: ['text/*', 'application/json'] }));
app.use(express.static(__dirname));

// Server-side proxy for Google Apps Script GET (fetches data following 302 redirects with no CORS issues)
app.get('/api/sheet', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Upstream error: ${response.statusText}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Server-side proxy for Google Apps Script POST (writes data following redirects)
app.post('/api/sheet', async (req, res) => {
  try {
    const bodyPayload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: bodyPayload
    });

    const text = await response.text();
    try {
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch {
      res.send(text);
    }
  } catch (err) {
    console.error("Proxy POST error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

