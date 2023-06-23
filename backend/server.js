const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB.js');
const Task = require('./models/taskModel.js');
const taskRoutes = require('./routes/taskRoutes.js')

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://mern-task-app-1b6x-api.onrender.com");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })
app.use(
    cors({
    origin: ['http://localhost:3000/', 'https://mern-task-app-1b6x.onrender.com'],
    credentials: true,
}));
app.use('/api/tasks', taskRoutes);



// Routes
app.get('/', (req, res) => {
    res.send('Home page');
})

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is runnning on port ${PORT}`)
        });
    } catch (error) {
        console.log(error)
    }
};

startServer();
