const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/bye', (req, res) => {
    res.send('Bye World!');
  });

app.listen(5000, () => console.log('Server started on port 5000'));