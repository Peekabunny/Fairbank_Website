const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});