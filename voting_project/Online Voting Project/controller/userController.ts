import { Request, Response, response } from 'express';

import { getManager, getRepository, getTreeRepository, Equal, getCustomRepository, Timestamp, JoinColumn } from 'typeorm';
import { User } from '../model/User';
import { Query } from '../model/Query';
import { Option } from '../model/Option';
import { Vote } from '../model/Vote';
const env = require('dotenv').config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})


// const sendMail =  (req:Request, res:Response) => {
//     const to = req.body.to
//     const sub = req.body.subject
//     const body = req.body.text

//     try {

//         const receiver = to
//         const subject =  sub
//         const bodytext = body

//         console.log("yeah hey ! it works..");
//         const options = {
//             from: "xcaliusomg@gmail.com",
//             to: receiver,
//             subject: subject,
//             text: bodytext
//         }
//         transporter.sendMail(options, (err:string, info:string) => {
//             if (err) {
//                 console.log("error occurred :" + err)
//                 res.send("error : "+err)
//                 return err
//             }
//             else {
//                 console.log("email send successsfully to ---> "+receiver );
//                 res.send("success : "+info)
//                 return info
//             }

//         })
//         // const send = sendRe(receiver, subject, bodytext);
//         // res.send("mail sended !!! khoooooosh == " + send)
//     } catch (error) {
//         console.log(error);
//         // Logger.error("not able to send mail to ");
//     }

// }



const userReg = async (req: Request, res: Response) => {
    console.log("calling user Register");
    const entityManager = getManager()

    console.log(req.body);
    
    const user = new User()
    user.firstname = req.body.firstName
    user.lastname = req.body.lastName
    user.email = req.body.email
    user.password = req.body.password

    try {
        const data = await entityManager.insert(User , user)
        console.log("registered");
        await sendmail(user.email, "Registered successfully..", `hi ${user.firstname},\nCongrajulations,
        Your Account craeted successfully.\n\n\n\n...to access our services plaese login on http://localhost:3000/`)
        res.send({
            status: 1,
            message: "Registered successfully..",
            data: data
        })

    } catch (error) {
        console.log(error);
        
        res.send({
            status: 0,
            text: "User is Already Registered, please login ..",
            "error": error
        })
    }



}

const userLogin = async (req: Request, res: Response) => {
    const entityManager = getManager()
    console.log("user Login");

    try {
        const data = await entityManager
            .createQueryBuilder(User, "u")
            .select(["u"])
            .where("email = :email &&  password = :pass", { email: req.body.email, pass: req.body.password })
            .getOne()
        console.log("Login");
        if (data !== null)
            res.send({
                status: 1,
                Message: "Login successfully..",
                data: data
            })
        else {
            res.send({
                status: 0,
                Message: "Invalid Credentials.."
            })
        }
    } catch (error) {
        res.send({
            status: 0,
            text: "Oops! something went worng..",
            error: error
        })
    }
}

const updatePassword = async (req: Request, res: Response) => {
    const entityManager = getManager()
    console.log("updating password...");
    const given_email = req.body.email
    const given_pass = req.body.password

    try {
        console.log("pass update #121");

        const data = await entityManager.update(User, { "email": given_email }, { "password": given_pass })


        res.send({
            status: 1,
            text: "password update successfully..",
            data: data
        })
    } catch (error) {
        res.send({
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
        const email = await entityManager
            .createQueryBuilder()
            .select(["u.email", "u.firstname"])
            .from(User , 'u')
            .where("id = :id", { id: vote.userId })
            .getOne()

        const query = await entityManager
            .createQueryBuilder()
            .select("q.queryname")
            .from(Query , 'q')
            .where("queryId = :id", { id: vote.queryId })
            .getOne() 
            
            console.log(query);
         
        
        await sendmail(email?.email, "Thanks for Voting", `hi ${email?.firstname}, \n 
        Your vote successfully submitted for Query id ${vote.queryId} - ${query?.queryname}.\n Thanks for Voting...`)
       
            res.send({
                status: 1,
                text: "Vote casted successfully..",
                data: data
            })

     } catch (error) {
        res.send({
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
    qu.queryname = req.body.queryName
    qu.userId = 1
    qu.queryStartDate = new Date()
    qu.queryenddate = req.body.queryEndDate

    try {
        const data = await entityManager.insert(Query,qu)

    const options = req.body.options
    // [1,2,3] 
    const ooo = options.map(async (option: string | undefined) => {
        let op = new Option();
        op.options = option
        op.query = qu
        const saved = await entityManager.insert(Option , op)
        console.log(saved);
        return saved;
    })    
    res.send({
        "status": "one to many calling",
        "query": data,
        "options": options
    })
        
    } catch (error) {
        console.log(error);
        res.send({
            "status": 0,
            "message" : "ohhhhhho! Error came...."
        })
        
    }
    
}

const getAllquery = async (_req: Request, res: Response) => {


    console.log("getting queries .......");
    const entityManager = getManager();

    try {
        // const data = await getRepository(Query)
        //     .createQueryBuilder("query")
        //     .leftJoin("q.queryid","option")
        //     .getMany()
       const data =  await entityManager.createQueryBuilder(Query,"q")
       .innerJoinAndSelect('q.options','options')
       .getMany();
        
        res.send({
            status: 1,
            message: "got all query successfully..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const getAllOption = async (req: Request, res: Response) => {


    console.log("getting options .......");
    const entityManager = getManager();
    const key = Object.entries(req.query)
    

    try {

        let data = await entityManager
            .createQueryBuilder()
            .select(["o.options", "o.optionId"])
            .from(Option, 'o')
            .where("queryId = :id", { id: key[0][1] })
            .getMany()



        res.send(data)

    } catch (error) {
        console.log(error)
        res.send({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const getFilteredQuery = async (_req: Request, res: Response) => {


    console.log("getting only live queries .......");
    const entityManager = getManager()

    try {
        const data = await entityManager
            .createQueryBuilder()
            .select("q")
            .from(Query, 'q')
            .innerJoinAndSelect('q.options','options')
            .where("q.queryenddate > :id", { id: new Date() })
            .getMany()

        console.log("getting  live queries only..... ");


        res.send({
            status: 1,
            text: "got all query successfully..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const deleteQuery = async (req: Request, res: Response) => {


    console.log("delete query called .......");
    const entityManager = getManager()
    const del_qid = req.body.queryId

    try {
        const data = await entityManager
            .createQueryBuilder().delete().from(Query).where("queryid = :id", { id: del_qid }).execute()


        res.send({
            status: 1,
            text: "query id[" + del_qid + "] deleted successfully..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const voteForSingleOption = async (req: Request, res: Response) => {

    const entityManager = getManager();
    // const optionid = req.body.optionId
    const key = Object.entries(req.query)

    try {
        const data = await entityManager.createQueryBuilder(Vote, "vote")
            .select('COUNT(`voteid`)', 'voteforsingleoption')
            .where("optionid = :id", { id: key[0][1] })
            .getRawOne();


        res.send(data)
    } catch (error) {
        console.log(error)
        res.send({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}
const pages = async (req: Request, res: Response) => {



    console.log("getting pages .......");



    const entityManager = getManager();



    const queryDetails = await getRepository(Query).createQueryBuilder('data')



    try {

        const data = await queryDetails



            .orderBy("queryId", "ASC")



            .limit(2)



            .offset(0)



            .getMany();



        //...Enter more of your queries here... add relationships etc. THEN:



        console.log("getting all ..... ");



        res.json({



            status: 1,



            text: "got all  successfully..",



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
    // const queryid = req.boFvdy.queryid
    const key = Object.entries(req.query)

    try {
        const data = await entityManager.createQueryBuilder(Vote, "vote")
            .select('COUNT(`voteid`)', 'voteforonequery')
            .where("queryid = :id", { id: key[0][1] })
            .getRawOne();


        res.send({
            status: 1,
            text: "total vote for one option..",
            data: data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const sendmail = (_to: any, _subject: any, _text: any) => {
    try {

        const receiver = _to
        const subject = _subject
        const bodytext = _text

        // console.log("yeah hey ! it works..");
        const options = {
            from: "ballot.project.real@gmail.com",
            to: receiver,
            subject: subject,
            text: bodytext
        }
       
        transporter.sendMail(options, (err: string, info: string) => {
            if (err) {
                console.log("error occurred :" + err)
                return err
            }
            else {
                console.log("email send successsfully to ---> " + receiver);
                return info
            }

        })
        return "check your inbox, email sended successfully..."
        // const send = sendRe(receiver, subject, bodytext);
        // res.send("mail sended !!! khoooooosh == " + send)
    } catch (error) {
        console.log(error);
        // Logger.error("not able to send mail to ");
    }
}

const getIdList = async (req: Request, res: Response) => {

    const entityManager = getManager();
    // const queryid = req.body.queryid
    const key = Object.entries(req.query)

    try {
        const data = await entityManager.createQueryBuilder(Vote, "vote")
            .select('vote.queryId')
            .where("userId = :id", { id: key[0][1] })
            .getMany();


        res.send(data)
    } catch (error) {
        console.log(error)
        res.send({
            status: 0,
            text: "Oops! something went wrong..",
            error: error
        })
    }
}

const Log =  async (req: Request, res: Response) => {

    const entityManager = getManager();
    const key = Object.entries(req.query)
    console.log(key);
    
    try {
        const data = await entityManager.createQueryBuilder(User, "vote")
        .select('vote.id')
        .where("email = :id", { id: key[0][1] })
        .getOne();
        
        res.send( data)
    } catch (error) {
        console.log(error)
        res.send({
            status: 0,
            text: "No such user found ...... ",
            error: error
        })
    }
}



export {
    addQuery, userReg, userLogin, castVote, getAllquery,
    getAllOption, getFilteredQuery, updatePassword, deleteQuery, voteForSingleOption, totalVote,getIdList,Log
}