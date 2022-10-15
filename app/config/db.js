const Pool=require("pg").Pool
const db=new Pool({
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBDATABASE,
    host:process.env.DBHOST,
    port:process.env.DBPORT
})
module.exports=db