const dotenv=require('dotenv').config()
const express=require('express')
const {register,getUsers}=require("./router/userRouter")
const {getProjectByUserId}=require("./router/projectRouter")
const db=require("./config/db")
db.connect().then("Db Connected").catch(e=>console.log(e))





const app=express()
app.use(express.json())

app.get("/users",getUsers)
app.post("/users",register)
app.get("/projects/getbyuserid/:userid",getProjectByUserId)

app.listen(3000,()=>{
    console.log(process.env.DBPASSWORD)
    console.log("Server up!")
})