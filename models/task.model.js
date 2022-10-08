const mongoose = require("mongoose");
const Task = new mongoose.Schema({
    description: { type: String, required: true },
    type: { type: String, required: true },
    start_time: { type: String, required: true },
    time_taken: { type: String, required: true },

    emp: { type: String, required: true },
},
    { collection: 'task' })
const model = mongoose.model('Task', Task);
module.exports = model;