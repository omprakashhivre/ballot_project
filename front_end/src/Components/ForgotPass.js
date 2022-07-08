import emailjs from "emailjs-com";
import { ResetPass } from "./ResetPass.js";
import "../Pages/reg";
// import Button from "../UI/Button";
import Nav from "./nav";
import Upperpart from "./Upper_part";
import Container from "@mui/material/Container";
// import { Link } from "react-router-dom";
import { useState } from "react";
import "../UI/Button.css";

//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var ForgotPass = () => {
  const sendOtpButton = document.getElementById('otpbutton')
  const sendOtpInput = document.getElementById('givenEmail')

  const [otpsends, setOtpsends] = useState(false);
  const [verifyotp, setverifyotp] = useState(false);
  const [otp, setOtp] = useState(0);
  const [emailId, setemailId] = useState("");

  const [userreg, updateuserreg] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    updateuserreg({ ...userreg, [name]: value });
  };

  const sendOtp = async (givenEmail) => {
    //changes
    sendOtpButton.innerText = "Resend"
   

    const newOtp = Math.floor(Math.random() * 1000000);
    setOtp(newOtp);
    setemailId(givenEmail)
    
    console.log(otp + " == " + newOtp + " " + givenEmail);
    try {
      const user = await fetch("http://localhost:3000/users/log?email=" + givenEmail)
        .then((response) => response.json())
        .catch(xy => console.log(xy))
      console.log(user);
      if (user) {
        emailjs
          .send(
            "service_ukgndsq",
            "template_k8qpx17",
            {
              message: newOtp,
              to_email: givenEmail,
            },
            "user_NDtOXp78ookGeIZN8R3ie"
          )
        .then(function (res) {
          // console.log("status " + res.status);
          setOtpsends(true)
          toast.success('OTP send successfully on email -  ' + givenEmail, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          sendOtpInput.readOnly = true
          setOtpsends(true);
          document.getElementById("otpbutton").style.display = "none";
        });
      }
      else
        throw new Error("email not rergistered. Kindly Register...");
    } catch (error) {
      toast.warn('not able to send OTP Because, ' + error, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  };

  const verifyOtp = (otpgot) => {
    if (otp == otpgot) {
      sendOtpButton.style.display = 'none'
      toast.success('OTP Matches, PLease Update Password', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setverifyotp(true);
    } else toast.warn('Invalid OTP, Please check it again', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  };
  return (
    <>
      <Nav />
      <Container className="reg lgin">
        <Upperpart top_heading="" heading="Forgot Password" bottom_heading="Enter Registered mail /" link="Create account" href="/reg" />
        <>
          <div className="email-to-password" id="login_input">
            <div style={{ display: "flex", flexDirection: "column" }} id="">
              <input
                type="email"
                placeholder="Email"
                required
                autoComplete="off"
                value={userreg.email}
                onChange={handleInput}
                name="email"
                style={{ width: "auto", marginBottom: "20px" }}
                id="givenEmail"
              />
              <button className="reg_submit" onClick={() => sendOtp(document.getElementById("givenEmail").value)} id="otpbutton">
                Send OTP
              </button>
            </div>
            {otpsends ? (
              <>
                {verifyotp ? (
                  <ResetPass emailId={emailId} />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }} id="otpbox">
                    <input
                      required
                      type="number"
                      placeholder="Enter otp"
                      autoComplete="off"
                      onChange={handleInput}
                      name="otp"
                      id="enteredotp"
                      style={{ marginRight: "20px" }}
                    />
                    <div style={{ marginTop: '20px', width: "auto", textAlign: "center" }}>
                      <button className="reg_submit" onClick={() => verifyOtp(document.getElementById("enteredotp").value)} type='submit'>
                        Verify OTP
                      </button>
                    </div>

                  </div>
                )}{" "}
              </>
            ) : (
              ""
            )}
          </div>
        </>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default ForgotPass;