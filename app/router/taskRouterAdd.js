const {save,getAll}=require("../repositories/taskRepositoryAdd")

const getTasks=async function(req,res){
    try {
        res.send(await getAll())
    } catch (error) {
        res.status(400).send(error)
    }
    
}
const register=async function(req,res){
    try {
        await save(req)
        res.send("Task registered")
    } catch (error) {
        res.status(400).send(error)
    }
    
}
module.exports={register,getTasks}