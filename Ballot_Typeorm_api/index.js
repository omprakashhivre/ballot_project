import express,{Request,Response} from "express"
import { createConnection } from "typeorm";
import { router } from "./routes/routes";
// import { User } from "./entity/User";

const app = express();
const PORT = 5002;


app.use('/',router)
//we get connection from ormconfig.json file similarly we can get it from .ts file and .env file also
createConnection({
    type:"mysql",
    host:"localhost",
    username:"root",
    password:"password",
    database:"ballot_by_orm",
    synchronize:true,
    // entities:[user],
    entities:["./tables/*.ts"],
    // logging:true
}).then(()=>{console.log("db connect");
}).catch((e)=>{
    console.log("Error : "+e);
    
})

app.get("/test",(req,res)=>{
    res.json({
        "status" : "application running"
    })
})

app.listen(PORT,()=>{
    console.log("server is running on "+PORT)
})
