
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
        await saveProject(req.body)
        res.status(httpStatus.CREATED).send("Created")

    }catch(e){
        res.status(httpStatus.BAD_REQUEST).send(e)
    }
}
const deleteProjectController=async function(req,res){
    try{
        await deleteProject(req.params.id)
        res.status(httpStatus.OK).send("Deleted")

    }catch(e){
        res.status(httpStatus.BAD_REQUEST).send(e)
    }
}
const addUserToProjectController=async(req,res)=>{
    try{
        await addUserToProject(req.body)
        res.status(httpStatus.OK).send("User Added")

    }catch{
        res.status(httpStatus.BAD_REQUEST).send("Bad Request")
    }
}
module.exports={getProjectByUserId,saveProjectController,deleteProjectController,addUserToProjectController}