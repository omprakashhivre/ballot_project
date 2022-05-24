const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const port = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users.routes");
const cors = require("cors")

app.use(cors())

app.use(bodyParser.json());
const swaggerOption = {
  swaggerDefinition: (swaggerJsdoc.Options = {
    info: {
      title: "Online Voting",
      description: " Voting API ",
     
    },
  }),
  apis: ["index.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use("/users", usersRoutes);
app.use("/query",usersRoutes );
app.use("/options",usersRoutes );
app.use("/vote",usersRoutes );
app.use("/details",usersRoutes);
app.use("/update",usersRoutes);
app.use("/delete",usersRoutes);

app.listen(port,()=>{console.log('connected:'+port)});
 
