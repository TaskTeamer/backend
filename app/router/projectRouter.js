const {getByUserId,saveProject}=require("../repositories/projectRepository")
const httpStatus=require("http-status")


const getProjectByUserId=async function(req,res){
    try{
        res.send(await getByUserId(req.params.userid))
    }
    catch(error){
        res.status(httpStatus.NOT_FOUND).send(error)
    }
}
const saveProjectController=async function(req,res){
    try{
        saveProject(req.body)
        res.status(httpStatus.CREATED).send("Created")

    }catch{
        res.status(httpStatus.BAD_REQUEST).send("Bad Request")
    }
}
module.exports={getProjectByUserId,saveProjectController}