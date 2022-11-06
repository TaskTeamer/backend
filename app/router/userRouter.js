const {save,getAll,getUserByCredentials}=require("../repositories/userRepository")
const {generateAccessToken,generateRefreshToken,hashPassword}=require("../security/helper")

const getUsers=async function(req,res){
    try {
        res.send(await getAll())
    } catch (error) {
        res.status(400).send(error)
    }
    
}
const register=async function(req,res){
    try {
        req.body.password=hashPassword(req.body.password)
        await save(req)
        res.send("User registered")
    } catch (error) {
        res.status(400).send(error)
    }
    
}
const login=(req,res)=>{
    req.body.password=hashPassword(req.body.password)
    getUserByCredentials(req.body).then(user=>{
        if(user==null) res.status(404).send({message:"User Not Found"})
        user={
            tokens:{
                accessToken:generateAccessToken(user),
                refreshToken:generateRefreshToken(user)
            }
        }
        delete user.password;
        res.status(200).send(user);
    })
}
module.exports={register,getUsers,login}