const bodyParser = require("body-parser");
import express,{Request,Response} from "express"
import { createConnection } from "typeorm";
import { router } from "./router/Routes";

const app = express();
// Enables CORS
const cors = require('cors');
app.use(cors({ origin: true }));


app.use(bodyParser.json());
const PORT = process.env.PORT

// app.use(cors)
app.use('/users',router)

createConnection({
  type:"mysql",
  host:process.env.DATABASEHOST,
  username:process.env.DATABASEUSER,
  password:process.env.DATABASEPASSWORD,
  database:process.env.DATABASENAME,
  synchronize:true,
  // entities:[user],
  entities:["./model/*.ts"],
  // logging:true
}).then(()=>{console.log("db connect");
}).catch((e)=>{
  console.log(e);
  
})

app.listen(PORT,()=>{console.log('connected:'+PORT)});
 
