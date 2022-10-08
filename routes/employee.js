const router = require('express').Router();
let Employee = require('../models/employee.model')
const jwt = require("jsonwebtoken");


router.route('/list').get((req, res) => {
    Employee.find().then(employees => res.json(employees)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Employee.findOne({ employee_no: req.params.id }).then(employee => res.json(employee)).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;