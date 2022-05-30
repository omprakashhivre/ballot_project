// const express = require("express");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const dotenv = require('dotenv')

// dotenv.config()

// const port = process.env.PORT

// const app = express();
// const bodyParser = require("body-parser");
// const usersRoutes = require("./routes/users.routes");
// const cors = require("cors")


// app.use(cors())


// const swaggerOption = {
//   swaggerDefinition: (swaggerJsdoc.Options = {
//     info: {
//       title: "Online Voting",
//       description: " Voting API ",
     
//     },
//   }),
//   apis: ["index.js", "./routes/*.js"],
// };

// const swaggerDocs = swaggerJsdoc(swaggerOption);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// app.use("/users", usersRoutes);
// app.use("/query",usersRoutes );
// app.use("/options",usersRoutes );
// app.use("/vote",usersRoutes );
// app.use("/details",usersRoutes);
// app.use("/update",usersRoutes);
// app.use("/delete",usersRoutes);

const bodyParser = require("body-parser");
import express,{Request,Response} from "express"
import { createConnection } from "typeorm";
import { router } from "./router/routes";
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT

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
// app.get("/users",(req:Request,res:Response)=>{
//   res.json({
//       "status" : "application running"
//   })
// })

app.listen(PORT,()=>{console.log('connected:'+PORT)});
 
