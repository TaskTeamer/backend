const db=require("../config/db")

const getAll=async function(){
    return await (await db.query("select * from users")).rows
}
const getUserByCredentials=async(user)=>{
    email=user.email;
    password=user.password;
    let users= await (await db.query("select * from users where email=$1 and password=$2",[email,password])).rows
    return users[0]
}
const getUserByUserName=async(username)=>{
    let user=await (await db.query("select id,user_name,email from users where user_name=$1",[username])).rows
    return user[0];
}

const save=async function(req){
    const first_name=req.body.first_name
    const last_name=req.body.last_name
    const email=req.body.email
    const password=req.body.password
    const user_name=req.body.user_name
    await db.query("insert into users (first_name,last_name,email,password,user_name) values ($1,$2,$3,$4,$5)",[first_name,last_name,email,password,user_name])
    
}
module.exports={getAll,save,getUserByCredentials,getUserByUserName}