
const {getByUserId,saveProject,deleteProject,addUserToProject}=require("../repositories/projectRepository")
const httpStatus=require("http-status")


const getProjectByUserId=async function(req,res){
    try{
        res.status(httpStatus.OK).send(await getByUserId(req.params.userid))
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
const deleteProjectController=async function(req,res){
    try{
        deleteProject(req.params.id)
        res.status(httpStatus.OK).send("Deleted")

    }catch{
        res.status(httpStatus.BAD_REQUEST).send("Bad Request")
    }
}
const addUserToProjectController=async(req,res)=>{
    try{
        addUserToProject(req.body)
        res.status(httpStatus.OK).send("User Added")

    }catch{
        res.status(httpStatus.BAD_REQUEST).send("Bad Request")
    }
}
module.exports={getProjectByUserId,saveProjectController,deleteProjectController,addUserToProjectController}