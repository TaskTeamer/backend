const {save,getAll}=require("../repositories/userRepository")

const getUsers=async function(req,res){
    try {
        res.send(await getAll())
    } catch (error) {
        res.status(400).send(error)
    }
    
}
const register=async function(req,res){
    try {
        await save(req)
        res.send("User registered")
    } catch (error) {
        res.status(400).send(error)
    }
    
}
module.exports={register,getUsers}