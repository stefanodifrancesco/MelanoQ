require('dotenv').config();

const app = require('./app');

const server = app.listen(5000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});