const db = require("../config/db")

const getByUserId=async function(userid){
    return await (await db.query("select team_users.user_id, projects.name,projects.team_id from team_users Inner Join teams on team_users.team_id=teams.id Inner Join projects on projects.team_id=teams.id where user_id=4")).rows
}
module.exports={getByUserId}