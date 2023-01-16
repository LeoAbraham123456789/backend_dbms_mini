const Pool=require("pg").Pool;

const pool=new Pool({
    user:"bdms",
    password: "bdms",
    host: "localhost",
    port: 5432,
    database: "bdms"
});
module.exports=pool;