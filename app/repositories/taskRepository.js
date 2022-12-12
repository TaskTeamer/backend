const db = require("../config/db")

const getByTaskId = async function(taskid){
    return await ( await db.query("Select tasks.id,tasks.title,tasks.description,tasks.creator_id,tasks.create_date,tasks.end_date,tasks.status_id,tasks.section_id,tasks.project_id from tasks INNER JOIN projects ON tasks.project_id = projects.id WHERE tasks.id=1")).rows
    //return await ( await db.query('Select user_tasks.id, users.id,users.first_name,users.last_name,users.user_name,users.password,users.email,tasks.id,tasks.title,tasks.description,tasks.creator_id,tasks.create_date,tasks.end_date,tasks.status_id,tasks.section_id,tasks.project_id from tasks INNER JOIN projects ON tasks.project_id = projects.id INNER JOIN user_tasks ON tasks.id=user_tasks.task_id INNER JOIN users ON user_tasks.id = users.id WHERE tasks.id=1')).rows
}
module.exports={getByTaskId} 
