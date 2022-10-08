const router = require('express').Router();
let Task = require('../models/task.model')

router.route('/list').get((req, res) => {
    Task.find().then(tasks => res.json(tasks)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/task/:id').get((req, res) => {
    Task.findOne({ _id: req.params.id }).then(task => res.json(task)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/emp/:id').get((req, res) => {
    Task.find({ emp: req.params.id }).then(task => res.json(task)).catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;