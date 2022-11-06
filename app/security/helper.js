const CryptoJS=require("crypto-js")
const JWT=require("jsonwebtoken")

const hashPassword=(password)=>{
    return CryptoJS.HmacSHA256(password,CryptoJS.HmacSHA1(password,process.env.PASSWORD_HASH).toString()).toString()
}
const generateAccessToken=(user)=>{
    return JWT.sign({name:user.email,...user},"asdsad",{expiresIn:"1w"})
}
const generateRefreshToken=(user)=>{
    return JWT.sign({name:user.email,...user},"asdsad",{expiresIn:"1w"})
}
module.exports={
    hashPassword,
    generateAccessToken,
    generateRefreshToken,

}
