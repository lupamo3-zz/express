'user strict'

const sql = require('./db.js')

//Task object constructor
const Task = function(){
};

Task.getTaskById = function (taskId, result) {
    sql.query("Select * from task where task_id = ? ", taskId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Task.getAllTask = function (result) {
    sql.query("Select * from task", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('tasks : ', res);  

             result(null, res);
            }
        });   
};


Task.getAllPeople = function (result) {
    sql.query("Select * from personnel", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('tasks : ', res);  

             result(null, res);
            }
        });   
};


Task.remove = function(id, result){
 sql.query("DELETE FROM task WHERE task_id = ?", [id], function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
           
             result(null, res);
            }
        }); 
};

module.exports= Task;