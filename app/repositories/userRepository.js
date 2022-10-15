const db=require("../config/db")

const getAll=async function(req,res){
    res.send((await (await db.query("select * from users")).rows))
}

const save=async function(req,res){
    const first_name=req.body.first_name
    const last_name=req.body.last_name
    const email=req.body.email
    const password=req.body.password
    const user_name=req.body.user_name
    await db.query("insert into users (first_name,last_name,email,password,user_name) values ($1,$2,$3,$4,$5)",[first_name,last_name,email,password,user_name])
    res.send("User Saved")
}
module.exports={getAll,save}