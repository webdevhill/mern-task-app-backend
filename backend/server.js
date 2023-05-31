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
app.use(cors({
    origin: ['http://localhost:5000/']
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