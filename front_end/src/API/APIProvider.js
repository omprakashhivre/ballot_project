// const env = require('dotenv').config();
const nodemailer = require("nodemailer");
// const hbs = require('nodemailer-express-handlebars')



const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "ballot.project.real@gmail.com",
        pass: "kckfiwsaajbknajh"
    }
})



const  EmailSender = () => {
    function emailSend(to , sub , msg){
try {

    const receiver = to
    const subject = sub
    const bodytext = msg

    const options = {
        from: "ballot.project.real@gmail.com",
        to: receiver,
        subject: subject,
        text: bodytext,
        // template : 'emailTemplate',
        // context : {
        //     userName : 'xc'
        // }
    }
   
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log("error occurred :" + err)
            return {status:0,msg:err}
        }
        else {
            console.log("email send successsfully to ---> " + receiver);
            return {status:1,msg:info}
        }

    })
    return {status : 1 , msg : "Mail send"}
} catch (error) {
    console.log(error);
    return {status:0,msg:error}
    // Logger.error("not able to send mail to ");
}
}
return(
    <></>
)
}

export default EmailSender;

