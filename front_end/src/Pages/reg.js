import "./reg.css";
import Button from "../UI/Button";
import Nav from "../Components/nav";
import Upperpart from "../Components/Upper_part";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var Reg = () => {
  const [invalidClass, setInvalidClass] = useState({class : "" , msg : ""})
  let navigate = useNavigate();
  // const  [c_password_error, updateC_password_error] = useState("");
  const [userReg, updateuserReg] = useState({
    fistName: "",
    lastName: "",
    emailId: "",
    password: "",
    c_password: "",
  });

  const [records, updateRecord] = useState([]);

  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + " === " + value);
    updateuserReg({ ...userReg, [name]: value });
    console.log(userReg);
    // console.log(userReg);
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(userReg);
    //validation part is here to be written
    try {
        const pass_check = userReg.password == userReg.c_password ? true : false;
      if (pass_check) {
        console.log("password matches");
        const record_with_id = { ...userReg, id: new Date().getTime().toString() };
        updateRecord([...records, record_with_id]);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName: userReg.firstName, lastName: userReg.lastName, email: userReg.emailId, password: userReg.password }),
        };

      const reg = await  fetch("http://localhost:3000/users/register", requestOptions)
          .then((response) => response.json())
          .catch(setInvalidClass({class : "invalid" , msg : "Server Not Respond..."}))

          if(reg.status === 1)
            { updateuserReg({ firstName: "", lastName: "", emailId: "", password: "", c_password: "" });
              // alert(reg.data)
              console.log(reg.data);
              toast.success(`Registered Successfully, please Login`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              navigate("/");
            }
          else{
            console.log(reg.data)
          }  

      } else {
        setInvalidClass({class : "invalid" , msg : "Password & confirm Password must match"})
        toast.warn('Passsword not matches', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
        
    } catch (error) {
      toast.error('Error : '+error, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <Nav />
      <Container className="reg">
        <Upperpart top_heading="Start for free" heading="Create new account" bottom_heading="Already a member?" link="LogIn" href="/" />
        <form action="#" onSubmit={onsubmit}>
          <div className="Initals">
            <input type="text" placeholder="First name" required autoComplete="off" value={userReg.firstName} onChange={handleInput} name="firstName" />
            <input type="text" placeholder="Last name" required autoComplete="off" value={userReg.lastName} onChange={handleInput} name="lastName" />
          </div>
          <div className="email-to-password">
            <input type="email" placeholder="Email" required autoComplete="off" value={userReg.emailId} onChange={handleInput} name="emailId" />
            {/* <Button text='Send Otp' onC
            {
              <imput type='number' min={1} max={7} required  />
              isOtpREceived ? <Button text="Verify Otp" display="block" />
               : <Button text="Resend" display="block" />
            } */}
            
            


            <input type="password" placeholder="Password" required autoComplete="off" value={userReg.password} onChange={handleInput} name="password" className={invalidClass.class} min="8" />
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              required
              value={userReg.c_password}
              onChange={handleInput}
              name="c_password"
              className={invalidClass.class}
            // style={{c_password_error}}
            />

            <p style={{ color: "red", fontSize: "20px", display: `${invalidClass.class ? '' : 'none'}` }}>{invalidClass.msg}</p>
          </div>
          <Button text="Create account" display="none" />
        </form>
      </Container>
      {/* <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </>
  );
};
export default Reg;
