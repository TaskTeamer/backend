const httpStatus = require("http-status")
const {getByTaskId,getAll,save,changeTaskStatus,changeTaskSection,deleteTask}=require("../repositories/taskRepository")

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
const saveTask=async function(req,res){
    try {
        await save(req)
        res.send("Task registered")
    } catch (error) {
        res.status(400).send(error)
    }
    
}
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
module.exports={getTaskByTaskId,getTasks,saveTask,updateTaskStatus,updateTaskSection,deleteTaskController}
