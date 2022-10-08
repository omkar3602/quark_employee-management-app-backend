const mongoose = require("mongoose");
const Employee = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    doj: { type: String, required: true },

    password: { type: String, required: true },
    role: { type: String, required: true },
},
    { collection: 'employee' })
const model = mongoose.model('Employee', Employee);

module.exports = model;