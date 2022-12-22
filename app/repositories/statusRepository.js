const db=require("../config/db")

const getAll=async function(){
    return await (await db.query("select * from statuses")).rows
}



module.exports={getAll}