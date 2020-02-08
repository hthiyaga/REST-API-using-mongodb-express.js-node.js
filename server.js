const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect DB
connectDB();

//Init middleware
app.use(express.json({ extend: false }));

app.get('/', (req, res) => res.send('API Running'));

//Define routes

app.use('/api/list', require('./routes/api/list'));
app.use('/api/seller', require('./routes/api/seller'));
const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
