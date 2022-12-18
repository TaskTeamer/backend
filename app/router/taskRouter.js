const httpStatus = require("http-status")
const {getByTaskId,getAll,changeTaskStatus,changeTaskSection,deleteTask,getByProjectId,saveTask,assignTask,findTaskUsersByTaskId,getByProjectIdWithUsers}=require("../repositories/taskRepository")

const getTaskByTaskId=async function(req,res){
    try{
        res.send(await getByTaskId(req.params.userid))
    }
    catch(error){
        res.status(400).send(error)
    }
}
const getTasks=async function(req,res){
    try {
        res.send(await getAll())
    } catch (error) {
        res.status(400).send(error)
    }
    
}
// const saveTask=async function(req,res){
//     try {
//         await save(req)
//         res.send("Task registered")
//     } catch (error) {
//         res.status(400).send(error)
//     }
    
// }
const updateTaskStatus=async function(req,res){
    try{
        await changeTaskStatus(req.body);
        res.status(httpStatus.OK).send("Status Updated")
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
const updateTaskSection=async function(req,res){
    try {
        await changeTaskSection(req.body)
        res.status(httpStatus.OK).send("Section Changed")
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
const deleteTaskController=async function(req,res){
    try{
        await deleteTask(req.params.id)
        res.status(httpStatus.OK).send("Task Deleted")
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
const getByProjectIdController=async(req,res)=>{
    try {
        res.status(httpStatus.OK).send(await getByProjectId(req.params.projectId))
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
const addTask=async(req,res)=>{
    try {
        await saveTask(req.body)
        res.status(httpStatus.OK).send("Task Saved")
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
const assignUserToTask=async(req,res)=>{
    try {
        await assignTask(req.body)
        res.status(httpStatus.CREATED).send("Task Assigned")
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
const getTaskUsersByTaskId=async(req,res)=>{
    try {
        res.status(httpStatus.OK).send(await findTaskUsersByTaskId(req.params.taskId))
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
const getTaskByProjectIdWithUserController=async(req,res)=>{
    try {
        res.status(httpStatus.OK).send(await getByProjectIdWithUsers(req.params.projectId))
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
module.exports={getTaskByTaskId,getTasks,saveTask,updateTaskStatus,updateTaskSection,deleteTaskController,getByProjectIdController,addTask,assignUserToTask,getTaskUsersByTaskId,getTaskByProjectIdWithUserController}
