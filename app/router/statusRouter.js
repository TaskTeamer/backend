
const {getAll}=require("../repositories/statusRepository")
const httpStatus=require("http-status")


const getAllStatus=async function(req,res){
    try{
        res.status(httpStatus.OK).send(await getAll(req.params.userid))
    }
    catch(error){

        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}
module.exports={
    getAllStatus
}