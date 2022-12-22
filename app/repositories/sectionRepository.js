const db=require("../config/db")

const getAll=async function(){
    return await (await db.query("select * from sections")).rows
}



module.exports={getAll}