const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Employee = require("./models/employee.model");
const Task = require("./models/task.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
    res.json({ message: "Application is running." });
});

const employeesRouter = require('./routes/employee');
app.use('/employee', employeesRouter);


app.post('/employee/login', async (req, res) => {
    const user = await Employee.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    // console.log(user);
    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: req.body.role
        }, 'seceret123',
            { expiresIn: '5h' })
        if (user.role === "admin") {
            adminFlag = 1;
        }
        else if (user.role === "emp") {
            adminFlag = 0;
        }
        return res.json({ status: 'ok', user: token, isAdmin: adminFlag });
    }
    else {
        res.json({ status: "not ok" });
    }
})

const tasksRouter = require('./routes/task');
app.use('/task', tasksRouter);

app.post('/task/add', async (req, res) => {
    try {
        const task = await Task.create({
            description: req.body.description,
            type: req.body.type,
            start_time: req.body.start_time,
            time_taken: req.body.time_taken,

            emp: req.body.emp,

        })
        res.json({ status: "ok" })
    }
    catch (err) {
        res.json({ status: 'error', error: err })
    }

});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})