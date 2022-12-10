const {save,getAll,getUserByCredentials}=require("../repositories/userRepository")
const {generateAccessToken,generateRefreshToken,hashPassword}=require("../security/helper")
const httpStatus=require("http-status")


const getUsers=async function(req,res){
    try {
        res.send(await getAll())
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
    
}
const register=async function(req,res){
    try {
        req.body.password=hashPassword(req.body.password)
        await save(req)
        res.status(httpStatus.CREATED).send({message:"User registered"})
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).send(error)
    }
    
}
const login=(req,res)=>{
    req.body.password=hashPassword(req.body.password)
    getUserByCredentials(req.body).then(user=>{
        if(user==null) res.status(httpStatus.NOT_FOUND).send({message:"User Not Found"})
        user={
            tokens:{
                accessToken:generateAccessToken(user),
                refreshToken:generateRefreshToken(user)
            }
        }
        delete user.password;
        res.status(httpStatus.OK).send(user);
    })
}
module.exports={register,getUsers,login}