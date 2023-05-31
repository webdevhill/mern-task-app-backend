const Task =  require('../models/taskModel.js');


// CREATE
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
       } catch (error) {
        res.status(500).json({msg: error.message});
       }
};

// READ
const getTasks = async (req, res) =>  {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
       } catch (error) {
        res.status(500).json({msg: error.message});
       }
};

// Get a Single Task
const getTask = async (req, res) =>  {
    try {
        const { id } = req.params; 
        const task = await Task.findById(id);
        if(!task) {
            return res.status(404).json(`No task with id: ${id}`);
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

// UPDATE a Task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(
            {_id: id},
            req.body,
            {
            new: true,
            runValidators: true
            }
        )
        if(!task) {
            return res.status(404).json(`No task with id: ${id}`);
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// DELETE a Task
const deleteTask = async (req,res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if(!task) {
            return res.status(404).json(`No task with id: ${id}`);
        }
        res.status(200).send('Task Deleted');
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}