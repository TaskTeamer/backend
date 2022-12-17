const db = require("../config/db")

const getByUserId=async function(userid){
    return await (await db.query("select team_users.user_id, projects.name,projects.team_id from team_users Inner Join teams on team_users.team_id=teams.id Inner Join projects on projects.team_id=teams.id where user_id="+userid)).rows
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
    console.log('teamId', teamId)
    console.log('project', project)
    await db.query("delete from projects where id=$1",[project.id])
    await db.query("delete from team_users where team_id=$1",[teamId])
    await db.query("delete from teams where id=$1",[teamId])
}
module.exports={getByUserId,saveProject,deleteProject}
