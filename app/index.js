const dotenv=require('dotenv').config()
const express=require('express')
const {register,getUsers,login,getUserByUserNameController}=require("./router/userRouter")
const {getProjectByUserId,saveProjectController,deleteProjectController}=require("./router/projectRouter")
const {getTaskByTaskId,getTasks,saveTask}=require("./router/taskRouter")
const db=require("./config/db")
db.connect().then("Db Connected").catch(e=>console.log(e))





const app=express()
app.use(express.json())

app.get("/users",getUsers)
app.get("/users/getbyusername/:username",getUserByUserNameController)
app.post("/users/login",login)
app.post("/users",register)

app.get("/projects/getbyuserid/:userid",getProjectByUserId)
app.post("/projects",saveProjectController)
app.delete("/projects/:id",deleteProjectController)

app.get("/tasks/getbyuserid/:userid",getTaskByTaskId)
/*app.get("/tasks",getTasks)
app.post("/tasks",register)*/


app.listen(3000,()=>{
    console.log(process.env.DBPASSWORD)
    console.log("Server up!")
})