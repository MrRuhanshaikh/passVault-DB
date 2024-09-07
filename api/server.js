const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getPasswordRoutes = require('./routes/getPassword');
const updatePasswordRoutes = require('./routes/updatePassword');
const deletePasswordRoutes = require('./routes/deletePassword');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Route Handling
app.use('/api/passwords', getPasswordRoutes);
app.use('/api/passwords', updatePasswordRoutes);
app.use('/api/passwords', deletePasswordRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
