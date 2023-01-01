const db = require("../config/db")

const getByUserId=async function(userid){
    return await (await db.query("select projects.id,team_users.user_id, users.user_name,projects.name,projects.team_id from team_users Inner Join teams on team_users.team_id=teams.id Inner Join projects on projects.team_id=teams.id inner join users on team_users.user_id=users.id where user_id="+userid)).rows
}
const saveProject=async(project)=>{

    let teamName=project.teamName;
    let ownerId=project.ownerId;
    let newTeam= (await db.query("insert into teams (name,owner_id) values ($1,$2) RETURNING *",[teamName,ownerId])).rows
    console.log('newTeam', newTeam)
    let myQuery=""
    project.team.map(async t=>{
        myQuery+= "("+t +","+newTeam[0].id+")"+","
        
    })

    db.query("insert into team_users (user_id,team_id) values "+ myQuery.substring(0,myQuery.length-1))
    await db.query("insert into projects (name,team_id,creator_id) values ($1,$2,$3)",[project.name,newTeam[0].id,ownerId])

}

const deleteProject=async(id)=>{
    let projects=await (await db.query("select * from projects where id=$1",[id])).rows
    project=projects[0];
    teamId=project.team_id;
    let taskUserDeleteQuery=""
    let alltasks=await (await db.query("select * from tasks where project_id=$1",[project.id])).rows
    alltasks.map(t=>{
        taskUserDeleteQuery+=" task_id="+t.id+" or"
    })
    let taskUserDeleteNewQuery="delete from user_tasks where "+taskUserDeleteQuery.substring(0,taskUserDeleteQuery.length-2)
    if(alltasks.length!==0){
        await db.query(taskUserDeleteNewQuery)
    }
    console.log('teamId', teamId)
    console.log('project', project)    
    await db.query("delete from tasks where project_id=$1",[project.id])
    await db.query("delete from projects where id=$1",[project.id])
    await db.query("delete from team_users where team_id=$1",[teamId])
    await db.query("delete from teams where id=$1",[teamId])
}
const addUserToProject=async(data)=>{
    let userName=data.userName;
    let projectId=data.projectId;
    let project=await (await db.query("select * from projects where projectId="+projectId)).rows[0]
    let user=await db.query("select * from users where user_name="+userName)[0]
    return await db.query("insert into team_users (user_id,team_id) values ($1,$2)",[user.id,project.team_id])
}
module.exports={getByUserId,saveProject,deleteProject,addUserToProject}
