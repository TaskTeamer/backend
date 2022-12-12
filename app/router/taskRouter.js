const {getByTaskId}=require("../repositories/taskRepository")

const getTaskByTaskId=async function(req,res){
    try{
        res.send(await getByTaskId(req.params.userid))
    }
    catch(error){
        res.status(400).send(error)
    }
}
module.exports={getTaskByTaskId}