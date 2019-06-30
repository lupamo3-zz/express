'use strict'
const Task = require('../model/appModel.js');

exports.list_all_tasks = function(req, res) {
    Task.getAllTask(function(err, task) {

        console.log('controller')
        if (err)
            res.send(err);
            console.log('res', task);
        res.send(task);
    });
};

exports.list_all_people = function(req, res) {
    Task.getAllPeople(function(err, task) {

        console.log('controller')
        if (err)
            res.send(err);
            console.log('res', task);
        res.send(task);
    });
};



exports.read_a_task = function(req, res) {
    Task.getTaskById(req.params.taskId, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  };
  
  
exports.delete_a_task = function(req, res) {


Task.remove( req.params.taskId, function(err, task) {
    if (err)
        res.send(err);
    res.json({ message: 'Task successfully deleted' });
});
};