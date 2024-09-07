const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getPasswordRoutes = require('./routes/getPasswords');
const updatePasswordRoutes = require('./routes/updatePassword');
const deletePasswordRoutes = require('./routes/deletePassword');


const app = express();
const port = process.env.PORT || 3000; // Allow dynamic port assignment for Vercel

app.use(bodyParser.json());
app.use(cors());

// Route Handling
app.use('/api', getPasswordRoutes);
app.use('/api', updatePasswordRoutes);
app.use('/api', deletePasswordRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
