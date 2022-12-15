const {getByTaskId,getAll,save}=require("../repositories/taskRepository")

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
module.exports={getTaskByTaskId,getTasks,saveTask}
