<<<<<<< HEAD
import { red } from "@mui/material/colors";
import { useState } from "react";
import Button from "../UI/Button";
import '../Pages/reg.css'
import { useNavigate } from "react-router-dom";


export const ResetPass = ({emailId}) => {
  let navigate = useNavigate();
  console.log(emailId);
  const [invalid,setInvalid] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const pass = e.target.password.value
    const cpass = e.target.cpassword.value

    if(pass == cpass){
    const requestOptions = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailId: emailId , password: e.target.password.value })
    }

      const response = await fetch('http://localhost:5000/users/updatepassword', requestOptions)
        .then((resp) => resp.json())
        .then((actualData) => {
          return actualData
        })

      const respdata = response
      console.log(respdata); 
      if (respdata.success === 1) {
        alert(emailId + " password updated succesfully")
        setTimeout(function() {
          navigate("/");
      
      }, 500)
      }
      else {
        alert("email not updated")
        setInvalid('invalid')
      }
    }
    else
        setInvalid('invalid')

  }

  return (
    
    <div>
    <form action="#" onSubmit={onSubmit}>
        <input type="text" placeholder="Password" required autoComplete="off"  name="password" className={invalid} />
        <input type="password" placeholder="Confirm Password" required autoComplete="off" name="cpassword"  className={invalid}/>
        <p style={{color:"red",fontSize:"20px",display:`${invalid ? "block" : "none"}`}}>something goes wrong</p>
        <Button text="Update Password">Update Password</Button>
    </form>
    </div>
  )
}
=======
import { red } from "@mui/material/colors";
import { useState } from "react";
import Button from "../UI/Button";
import '../Pages/reg.css'
import { useNavigate } from "react-router-dom";


export const ResetPass = ({emailId}) => {
  let navigate = useNavigate();
  console.log(emailId);
  const [invalid,setInvalid] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const pass = e.target.password.value
    const cpass = e.target.cpassword.value

    if(pass == cpass){
    const requestOptions = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailId: emailId , password: e.target.password.value })
    }

      const response = await fetch('http://localhost:5000/users/updatepassword', requestOptions)
        .then((resp) => resp.json())
        .then((actualData) => {
          return actualData
        })

      const respdata = response
      console.log(respdata); 
      if (respdata.success === 1) {
        alert(emailId + " password updated succesfully")
        setTimeout(function() {
          navigate("/");
      
      }, 500)
      }
      else {
        alert("email not updated")
        setInvalid('invalid')
      }
    }
    else
        setInvalid('invalid')

  }

  return (
    
    <div>
    <form action="#" onSubmit={onSubmit}>
        <input type="text" placeholder="Password" required autoComplete="off"  name="password" className={invalid} />
        <input type="password" placeholder="Confirm Password" required autoComplete="off" name="cpassword"  className={invalid}/>
        <p style={{color:"red",fontSize:"20px",display:`${invalid ? "block" : "none"}`}}>something goes wrong</p>
        <Button text="Update Password">Update Password</Button>
    </form>
    </div>
  )
}
>>>>>>> e04605f3a33ec8c101ce1515f3b3e234a3f94fff
