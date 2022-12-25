const dotenv=require('dotenv').config()
const express=require('express')
const {register,getUsers,login,getUserByUserNameController}=require("./router/userRouter")
const {getProjectByUserId,saveProjectController,deleteProjectController}=require("./router/projectRouter")
const {getTasks,updateTaskStatus,updateTaskSection,deleteTaskController,getByProjectIdController,addTask,assignUserToTask,getTaskUsersByTaskId,getTaskByProjectIdWithUserController,getActiveTask,getBacklogTask}=require("./router/taskRouter")
const {authenticateToken}=require("./middlewares/authenticate.js")
const {getAllStatus}=require("./router/statusRouter")
const db=require("./config/db")
const cors=require('cors')
const { getAllSection } = require('./router/sectionRouter')
db.connect().then("Db Connected").catch(e=>console.log(e))





const app=express()
app.use(express.json())
app.use(cors())


app.get("/users",authenticateToken,getUsers)
app.get("/users/getbyusername/:username",authenticateToken,getUserByUserNameController)
app.post("/users/login",login)
app.post("/users/register",register)

app.get("/projects/getbyuserid/:userid",authenticateToken,getProjectByUserId)
app.post("/projects",authenticateToken,saveProjectController)
app.delete("/projects/:id",authenticateToken,deleteProjectController)

app.get("/tasks",authenticateToken,getTasks)

app.get("/tasks/getbyprojectid/:projectId",authenticateToken,getByProjectIdController)
app.get("/tasks/getprojectwithuser/:projectId/active",authenticateToken,getActiveTask)
app.get("/tasks/getprojectwithuser/:projectId/backlog",authenticateToken,getBacklogTask)
app.get("/tasks/gettaskusers/:taskId",authenticateToken,getTaskUsersByTaskId)
app.get("/tasks/getprojectwithuser/:projectId",authenticateToken,getTaskByProjectIdWithUserController)
app.post("/tasks",authenticateToken,addTask)
app.post("/tasks/assignusertotask",authenticateToken,assignUserToTask)
app.put("/tasks/updatestatus",authenticateToken,updateTaskStatus)
app.put("/tasks/updatesection",authenticateToken,updateTaskSection)
app.delete("/tasks/:id",authenticateToken,deleteTaskController)

app.get("/statuses",authenticateToken,getAllStatus)

app.get("/sections",authenticateToken,getAllSection)

/*app.get("/tasks",getTasks)
app.post("/tasks",register)*/


app.listen(3000,()=>{
    console.log(process.env.DBPASSWORD)
    console.log("Server up!")
})