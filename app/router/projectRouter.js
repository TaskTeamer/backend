const {getByUserId}=require("../repositories/projectRepository")

const getProjectByUserId=async function(req,res){
    try{
        res.send(await getByUserId(req.params.userid))
    }
    catch(error){
        res.status(400).send(error)
    }
}
module.exports={getProjectByUserId}