import {Request,Response} from "express"
 import { User } from "../tables/User"
import { getManager,getRepository,getTreeRepository,Equal,getCustomRepository } from "typeorm"

 const usersDetails = (req:Request , res:Response)=> {

    res.send({
        status : "success"
    })
}

export { usersDetails }