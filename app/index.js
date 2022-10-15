const dotenv=require('dotenv').config()
const express=require('express')
const {save,getAll}=require("./repositories/userRepository")
const db=require("./config/db")
db.connect().then("Db Connected").catch(e=>console.log(e))





const app=express()
app.use(express.json())

app.get("/users",getAll)
app.post("/users",save)

app.listen(3000,()=>{
    console.log(process.env.DBPASSWORD)
    console.log("Server up!")
})