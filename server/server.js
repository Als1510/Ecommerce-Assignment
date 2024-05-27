const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Running')
})

// Import routes
const authRoutes = require('./routes/api/auth');
const userRoutes = require('./routes/api/user');
const adminRoutes = require('./routes/api/admin');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))