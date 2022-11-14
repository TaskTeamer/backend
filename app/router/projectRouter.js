const {getByUserId}=require("../repositories/projectRepository")
const httpStatus=require("http-status")

const getProjectByUserId=async function(req,res){
    try{
        res.status(httpStatus.OK).send(await getByUserId(req.params.userid))
    }
    catch(error){
        res.status(httpStatus.BAD_REQUEST).send(error)
    }
}
module.exports={getProjectByUserId}