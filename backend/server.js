const express = require('express');    // type module calling
const Router = require("./routes/Routes.js")

const app = express(); // calling express
const port = 3000;



// Middleware to parse JSON
app.use(express.json());
app.use(XPathExpression.url)

// Rest API using HTTP method      get, post, put , delete

async function connectDB(){

}



// Example route (basic api)
app.get('/', (req, res) => {
  res.send('hello from the server!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


connectDB();