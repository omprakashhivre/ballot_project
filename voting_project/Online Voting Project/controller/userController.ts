import { Request, Response, response } from 'express';

import { getManager, getRepository, getTreeRepository, Equal, getCustomRepository, Timestamp } from "typeorm"
import { User } from '../model/User';
import { Query } from '../model/Query';
import { Option } from '../model/Option';
import { Vote } from '../model/Vote';
require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "xcaliusomg@gmail.com",
        pass: process.env.PASS
    }
})

const sendMail =  (req:Request, res:Response) => {
    const to = req.body.to
    const sub = req.body.subject
    const body = req.body.text
       
    try {
        
        const receiver = to
        const subject =  sub
        const bodytext = body

        console.log("yeah hey ! it works..");
        const options = {
            from: "xcaliusomg@gmail.com",
            to: receiver,
            subject: subject,
            text: bodytext
        }
        transporter.sendMail(options, (err:string, info:string) => {
            if (err) {
                console.log("error occurred :" + err)
                res.send("error : "+err)
                return err
            }
            else {
                console.log("email send successsfully to ---> "+receiver );
                res.send("success : "+info)
                return info
            }

        })
        // const send = sendRe(receiver, subject, bodytext);
        // res.send("mail sended !!! khoooooosh == " + send)
    } catch (error) {
        console.log(error);
        // Logger.error("not able to send mail to ");
    }

}





const userReg = async (req: Request, res: Response) => {
    console.log("calling user Register");
    const entityManager = getManager()


    const user = new User()
    user.firstname = req.body.firstname
    user.lastname = req.body.lastname
    user.email = req.body.email
    user.password = req.body.password

    try {
        const data = await entityManager.save(user)
        console.log("registered");

        res.json({
            status: 1,
            text: "Registered successfully..",
            data: data
        })
    } catch (error) {
        res.json({
            status: 0,
            text: "Oops! something went worng..",
            error: error
        })
    }



}

const userLogin = async (req: Request, res: Response) => {
    const entityManager = getManager()
    console.log("user Login");

    try {
        const data = await entityManager.find(User, { where: { "email": req.body.email, "password": req.body.password } })
        console.log("Login");

        res.json({
            status: 1,
            text: "Login successfully..",
            data: data
        })
    } catch (error) {
        res.json({
            status: 0,
            text: "Oops! something went worng..",
            error: error
        })
    }
}

const updatePassword = async (req: Request, res: Response) => {
    const entityManager = getManager()
    console.log("updating password...");
    const given_email =req.body.email
    const given_pass = req.body.password

    try {
        console.log("pass update #121");
        
        const data = await entityManager.update(User,{"email" : given_email},{"password" : given_pass})
       

        res.json({
            status: 1,
            text: "password update successfully..",
            data: data
        })
    } catch (error) {
        res.json({
            status: 0,
            text: "Oops! something went worng..",
            error: error
        })
    }
}

const castVote = async (req: Request, res: Response) => {
    const entityManager = getManager()
    console.log("vote added .......");

    const vote = new Vote()
    vote.userId = req.body.userId
    vote.queryId = req.body.queryId
    vote.optionId = req.body.optionId

    try {
        console.log("vote casting ..... ");
        const data = await entityManager.insert(Vote, vote)

        res.json({
            status: 1,
            text: "Vote casted successfully..",
            data: data
        })
    } catch (error) {
        res.json({
            status: 0,
            text: "Oops! something went worng..",
            error: error
        })
    }
}

const addQuery = async (req: Request, res: Response) => {
    const entityManager = getManager()
    console.log("user function calling calling......");
    console.log(req.body);

    let qu = new Query();
    qu.queryname = req.body.queryname
    qu.userId = 1
    qu.queryStartDate = new Date()
    qu.queryenddate = req.body.queryenddate
    const data = await entityManager.save(qu)

    const options = req.body.options
    // [1,2,3] 
    const ooo = options.map(async (option: string | undefined) => {
        let op = new Option();
        op.options = option
        op.query = qu
        const saved = await entityManager.save(op)
        console.log(saved);
        return saved;
    })
    res.json({
        "status": "one to many calling",
        "query": data,
        "options": ooo

    })
}

const getAllquery = async (req: Request, res: Response) => {


    console.log("getting queries .......");
    const entityManager = getManager();

    try {
        // const data = await getRepository(Query)
        //     .createQueryBuilder("query")
        //     .leftJoin("q.queryid","option")
        //     .getMany()

        const data = await entityManager.find(Query)

        console.log("getting all ..... ");
        

        res.json({
            status: 1,
            text: "got all query successfully..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const getAllOption = async (req: Request, res: Response) => {


    console.log("getting options .......");
    const entityManager = getManager();
    const queryId = req.body.queryId

    try {
        // const data = await getRepository(Query)
        //     .createQueryBuilder("query")
        //     .leftJoin("q.queryid","option")
        //     .getMany()

        const data = await entityManager
        .createQueryBuilder()
        .select(["o.options","o.optionId"])
        .from(Option,'o')
        .where("queryId = :id",{id : queryId})
        .getMany()

        console.log("getting all options..... ");
        

        res.json({
            status: 1,
            text: "got all query successfully..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const getFilteredQuery = async (req: Request, res: Response) => {


    console.log("getting only live queries .......");
    const entityManager = getManager()

    try {
        const data = await entityManager
        .createQueryBuilder()
        .select(["q.queryname","q.queryId","q.queryEndDate"])
        .from(Query,'q')
        .where("queryenddate > :id",{id : new Date()})
        .getMany()

        console.log("getting  live queries only..... ");
        

        res.json({
            status: 1,
            text: "got all query successfully..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const deleteQuery  = async (req: Request, res: Response) => {


    console.log("delete query called .......");
    const entityManager = getManager()
    const del_qid  = req.body.queryId

    try {
        const data = await entityManager
        .createQueryBuilder().delete().from(Query).where("queryid = :id", { id: del_qid }).execute()
        

        res.json({
            status: 1,
            text: "query id["+del_qid+"] deleted successfully..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const voteForSingleOption = async (req: Request, res: Response) => {

    const entityManager = getManager();
    const optionid = req.body.optionId
    
    try {
         const data = await entityManager.createQueryBuilder(Vote,"vote")
         .select('COUNT(`voteid`)', 'voteforoneoption')
         .where("optionid = :id",{id : optionid})
         .getRawOne();
         
      
         res.json({
            status: 1,
            text: "total vote for one option..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const totalVote = async (req: Request, res: Response) => {

    const entityManager = getManager();
    const queryid = req.body.queryid
    
    try {
         const data = await entityManager.createQueryBuilder(Vote,"vote")
         .select('COUNT(`voteid`)', 'voteforonequery')
         .where("queryid = :id",{id : queryid})
         .getRawOne();
         
      
         res.json({
            status: 1,
            text: "total vote for one option..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.json({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

export { addQuery, userReg, userLogin, castVote, getAllquery,
    getAllOption ,getFilteredQuery,updatePassword,deleteQuery,voteForSingleOption,totalVote,sendMail}