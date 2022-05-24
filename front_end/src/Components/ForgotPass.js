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
// import {  useNavigate } from "react-router-dom";

var ForgotPass = () => {
  const [otpsends, setotpsends] = useState(false);
  const [verifyotp, setverifyotp] = useState(false);
  const [otp, setotp] = useState(0);
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
  // let navigate = useNavigate();
  // function req() {
  //   navigate("/");
  // }
  // const onsubmit = (e) => {
  //   e.preventDefault();
  //   //validation part is here to be written
  //   updateuserreg({ email: "", password: "" });
  //   console.log(userreg);
  //   //req();
  // };
  const sendOtp = (givenemail) => {
    const newotp = Math.floor(Math.random() * 1000000);
    setotp(newotp);
    setemailId(givenemail)
    console.log(otp + " == " + newotp + " " + givenemail);
    try {
      emailjs
        .send(
          "service_ukgndsq",
          "template_k8qpx17",
          {
            message: newotp,
            to_email: givenemail,
          },
          "user_NDtOXp78ookGeIZN8R3ie"
        )
        .then(function (res) {
          console.log("status " + res.status);
          alert("OTP send");
          setotpsends(true);
          document.getElementById("otpbutton").style.display = "none";
        });
    } catch (error) {
      alert("not able to send OTP check email and try again ", error);
    }
  };

  const verifyOtp = (otpgot) => {
    if (otp == otpgot) {
      alert(otp + " -- >otp matches");
      setverifyotp(true);
    } else alert("invalid otp");
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
                id="givenemail"
              />
              <button className="reg_submit" onClick={() => sendOtp(document.getElementById("givenemail").value)} id="otpbutton">
                Send Otp
              </button>
            </div>
            {otpsends ? (
              <>
                {verifyotp ? (
                  <ResetPass  emailId = {emailId} />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }} id="otpbox">
                    <input
                      type="number"
                      placeholder="Enter otp"
                      required
                      autoComplete="off"
                      onChange={handleInput}
                      name="otp"
                      id="enteredotp"
                      style={{ marginRight: "20px" }}
                    />
                    <button className="reg_submit" onClick={() => verifyOtp(document.getElementById("enteredotp").value)}>
                      Verify OTP
                    </button>
                  </div>
                )}{" "}
              </>
            ) : (
              ""
            )}
          </div>
        </>
      </Container>
    </>
  );
};
export default ForgotPass;
