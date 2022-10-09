const router = require('express').Router();
let Task = require('../models/task.model')

router.route('/list').get((req, res) => {
    Task.find().then(tasks => res.json(tasks)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/task/:id').get((req, res) => {
    Task.findOne({ _id: req.params.id }).then(task => res.json(task)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/emp/:id').get((req, res) => {
    Task.find({ emp: req.params.id }).then(tasks => res.json(tasks)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/graph/:id').get((req, res) => {
    Task.find({ emp: req.params.id }).then(tasks => {
        break_count = 0;
        meeting_count = 0;
        work_count = 0;
        tasks.forEach(task => {
            if (task.type == 'break') {
                break_count += task.time_taken;
            }
            else if (task.type == 'meeting') {
                meeting_count += task.time_taken;
            }
            else if (task.type == 'work') {
                work_count += task.time_taken;
            }

        });
        res.json({
            'break': Number((break_count / 60).toFixed(1)), 'meeting': Number((meeting_count / 60).toFixed(1)), 'work': Number((work_count / 60).toFixed(1))
        });
    }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;