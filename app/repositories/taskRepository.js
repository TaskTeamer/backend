const db=require("../config/db")

const getAll=async function(){
    return await (await db.query("select * from tasks")).rows
}
const getByTaskId = async function(taskid){
    return await ( await db.query("Select tasks.id,tasks.title,tasks.description,tasks.creator_id,tasks.create_date,tasks.end_date,tasks.status_id,tasks.section_id,tasks.project_id from tasks INNER JOIN projects ON tasks.project_id = projects.id WHERE tasks.id=1")).rows
    //return await ( await db.query('Select user_tasks.id, users.id,users.first_name,users.last_name,users.user_name,users.password,users.email,tasks.id,tasks.title,tasks.description,tasks.creator_id,tasks.create_date,tasks.end_date,tasks.status_id,tasks.section_id,tasks.project_id from tasks INNER JOIN projects ON tasks.project_id = projects.id INNER JOIN user_tasks ON tasks.id=user_tasks.task_id INNER JOIN users ON user_tasks.id = users.id WHERE tasks.id=1')).rows
}
const getByProjectId=async function(projectId){
    return await ( await db.query("select tasks.id,tasks.title,tasks.creator_id,tasks.create_date,tasks.project_id,tasks.end_date,tasks.status_id,tasks.section_id from tasks inner join projects on tasks.project_id=projects.id where project_id="+projectId)).rows
}

const saveTask=async(task)=>{
    const title=task.title
    const description=task.description;
    const creatorId=task.creatorId;
    const createDate=task.createDate;
    const endDate=task.endDate;
    const statusId=task.statusId;
    const sectionId=task.sectionId;
    const projectId=task.projectId;
    await db.query("insert into tasks (title,description,creator_id,create_date,end_date,status_id,section_id,project_id) values ($1,$2,$3,$4,$5,$6,$7,$8)",[title,description,creatorId,createDate,endDate,statusId,sectionId,projectId])

}

const save=async function(req){
    const task_id=req.body.task_id
    const title=req.body.title
    const description=req.body.description
    const creator_id=req.body.creator_id
    const create_date=req.body.create_date
    const end_date=req.body.end_date
    const status_id=req.body.status_id
    const section_id=req.body.section_id
    const project_id=req.body.project_id
    await db.query("insert into users (task_id,title,description,creator_id,create_date,end_date,status_id,section_id,project_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[task_id,description,creator_id,create_date,end_date,status_id,section_id,project_id])
    
}
const changeTaskStatus=async(statusAndTaskId)=>{
    const taskId=statusAndTaskId.taskId;
    const statusId=statusAndTaskId.statusId;
    await db.query("update tasks set status_id=$1 where id=$2",[statusId,taskId])
}
const changeTaskSection=async(sectionAndTaskId)=>{
    const taskId=sectionAndTaskId.taskId;
    const sectionId=sectionAndTaskId.sectionId;
    await db.query("update tasks set section_id=$1 where id=$2",[sectionId,taskId])

}
const deleteTask=async(taskId)=>{
    await db.query("delete from tasks where id=$1",[taskId])

}
module.exports={getAll,save,getByTaskId,changeTaskStatus,changeTaskSection,deleteTask,getByProjectId,saveTask}