import  express, { Router }  from "express";
import {usersDetails} from "../controller/userController"
// import { relationHome,queryBuilderDemo } from "../controller/RelationUser";

const router = express.Router()

 router.get("/users",usersDetails)
 

 export {router}