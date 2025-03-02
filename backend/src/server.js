require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Роут для задач
app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('ToDo Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
