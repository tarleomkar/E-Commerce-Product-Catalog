const express = require('express');
const app = express();

// Basic route to display "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
