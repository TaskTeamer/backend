const db=require("../config/db")

const getAll=async function(){
    return await (await db.query("select * from tasks")).rows
}

const save=async function(req){
    const task_id=req.body.task_id
    const title=req.body.title
    const description=req.body.description
    const creator_id=req.body.creator_id
    const create_date=req.body.create_date
    const end_date=req.body.end_date
    const status_id=req.body.status_id
    const section_id=req.body.section_id
    const project_id=req.body.project_id
    await db.query("insert into users (task_id,title,description,creator_id,create_date,end_date,status_id,section_id,project_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",[task_id,description,creator_id,create_date,end_date,status_id,section_id,project_id])
    
}
module.exports={getAll,save}