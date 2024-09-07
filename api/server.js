const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getPasswordRoutes = require('./routes/getPasswords');
const updatePasswordRoutes = require('./routes/updatePassword');
const deletePasswordRoutes = require('./routes/deletePassword');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Route Handling
// Default route (optional)

app.use('/api', getPasswordRoutes);
app.use('/api', updatePasswordRoutes);
app.use('/api', deletePasswordRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
