const express = require("express");
const app = express();
const cors=require("cors");
const pool=require("./db");
const bodyParser = require("body-parser");
// const pool2=require("./db");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
    return res.status(200).json({
      title: "Express Testing",
      message: "The app is working properly!",
    });
  });

app.post("/insert", async(req,res)=>{
    try{
        const {name,pass,age,bdgp,ph_num,hght,wght,last_don,status} = req.body;
        const newTodo=await pool.query(
            "INSERT INTO donors VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",[name,pass,age,bdgp,ph_num,hght,wght,last_don,status]
        );
        res.json(newTodo.rows[0])
    }catch(err){
        console.error(err.message);
    }
});
// app.get('/', function (req, res) {
//     // res.render('index', {});
//     // res.send("hello");
//     console.log("hiii");
//   });



app.post("/log_insert",async(req,res)=>{
    try{
        const {username} = req.body;
        const newTodo=await pool.query(
            "INSERT INTO login VALUES($1)",[username]
        );
        res.json(newTodo.rows[0])
    }catch(err){
        console.error(err.message);
    }
});

app.post("/sponsor/insert",async(req,res)=>{
    try{
        const {name, district, contactnumber,amount} = req.body;
        const newTodo=await pool.query(
            "INSERT INTO sponsors VALUES($1, $2, $3, $4)",[name, district, contactnumber,amount]
        );
        res.json(newTodo.rows[0])
    }catch(err){
        console.error(err.message);
    }
});


app.post("/hospital/insert",async(req,res)=>{
    try{
        const {name, pass, contactnumber, district} = req.body;
        const newTodo=await pool.query(
            "INSERT INTO hospital VALUES($1, $2, $3, $4)",[name,pass, contactnumber,district]
        );
        res.json(newTodo.rows[0])
    }catch(err){
        console.error(err.message);
    }
});


app.put("/edit",async(req,res)=>{
    try{
        const {name,pass,age,bdgp,ph_num,place,hght,wght,last_don,status} = req.body;
        const newTodo=await pool.query(
            "update donors set name=$2, age=$1, bdgp=$3, ph_num=$4,place=$5,hght=$6,wght=$7,last_don=$8,status=$9 where pass=$10",[age,name,bdgp,ph_num,place,hght,wght,last_don,status,pass]
            );console.log(req.body)
        res.json(newTodo.rows[0])
        console.log("hello")
        console.log(newTodo.rows[0]);
    }catch(err){
        console.log(err.message);
    }
})

app.get("/select/:bdgp",async(req,res)=>{
    try{
        console.log(req.params)
        const bdgp=req.params;
        console.log(typeof(bdgp));
        const result=await pool.query(
            "select * from donors where bdgp=$1",[bdgp.bdgp]
        );
        res.json(result.rows);
        // console.log(result.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

app.get("/select",async(req,res)=>{
    console.log("hiii");
    try{
        const result=await pool.query(
            "select * from donors"
        );
        res.json(result.rows);
        
        // console.log(result.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

app.get("/check/:name",async(req,res)=>{
    try{
        const name=req.params;
        const result=await pool.query(
            "select * from donors where name=$1",[name.name]
        );
        res.json(result.rows);
    }catch(err){
        console.log(err.message);
    }
})



app.delete("/delete/:pass",async(req,res)=>{
    try{
        const {pass}=req.params;
        const result=await pool.query(
            "delete from donors where pass=$1",[pass]
        );
        res.json("Deleted Successfully");
    }catch(err){
        console.log(err.message);
    }
})

app.listen(5000, () => {
    console.log("server started");
}
);