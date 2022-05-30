import  express  from "express";
import { addQuery, userLogin, userReg,getAllquery,getAllOption,updatePassword,
    getFilteredQuery,deleteQuery,voteForSingleOption,totalVote,castVote } from "../controller/userController";


const router = express.Router()

// user actions 
router.post("/register", userReg);
router.post("/login", userLogin);
// router.get("/getAllUsers", usersController.getAllUsers);
router.put("/updatepassword", updatePassword);

//query actions
router.post("/addquery",addQuery)
router.get("/getAllquery", getAllquery);
router.get("/getalloptions", getAllOption);
router.get("/getFilteredQuery", getFilteredQuery);
router.delete("/deletequery", deleteQuery);

// vote actions
router.get("/voteforsingleoption", voteForSingleOption);
router.get("/totalVote", totalVote);
router.post("/castvote", castVote);


// nodemailer APi
// router.post("/sendmail",sendMail);

// router.get("/gettotalvotes", usersController.gettotalvotes);
// router.post("/getIdlist", usersController.getIdlist);
// router.delete("/deletequery", usersController.deletequery);


 export {router}