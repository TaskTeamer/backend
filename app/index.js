const dotenv=require('dotenv').config()
const express=require('express')
const {register,getUsers,login,getUserByUserNameController}=require("./router/userRouter")
const {getProjectByUserId,saveProjectController,deleteProjectController}=require("./router/projectRouter")
const {getTaskByTaskId,updateTaskStatus,updateTaskSection,deleteTaskController,getByProjectIdController,addTask,assignUserToTask,getTaskUsersByTaskId,getTaskByProjectIdWithUserController}=require("./router/taskRouter")
const db=require("./config/db")
const cors=require('cors')
db.connect().then("Db Connected").catch(e=>console.log(e))





const app=express()
app.use(express.json())
app.use(cors())


app.get("/users",getUsers)
app.get("/users/getbyusername/:username",getUserByUserNameController)
app.post("/users/login",login)
app.post("/users/register",register)

app.get("/projects/getbyuserid/:userid",getProjectByUserId)
app.post("/projects",saveProjectController)
app.delete("/projects/:id",deleteProjectController)


app.get("/tasks/getbyprojectid/:projectId",getByProjectIdController)
app.get("/tasks/gettaskusers/:taskId",getTaskUsersByTaskId)
app.get("/tasks/getprojectwithuser/:projectId",getTaskByProjectIdWithUserController)
app.post("/tasks",addTask)
app.post("/tasks/assignusertotask",assignUserToTask)
app.put("/tasks/updatestatus",updateTaskStatus)
app.put("/tasks/updatesection",updateTaskSection)
app.delete("/tasks/:id",deleteTaskController)

/*app.get("/tasks",getTasks)
app.post("/tasks",register)*/


app.listen(3000,()=>{
    console.log(process.env.DBPASSWORD)
    console.log("Server up!")
})