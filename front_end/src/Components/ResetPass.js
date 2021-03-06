import { useState } from "react";
import Button from "../UI/Button";
import '../Pages/reg.css'
import { useNavigate } from "react-router-dom";
//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ResetPass = ({emailId}) => {
  let navigate = useNavigate();
  const [invalid,setInvalid] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const pass = e.target.password.value
    const cpass = e.target.cpassword.value

    if(pass == cpass){
    const requestOptions = {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailId , password: e.target.password.value })
    }

      const response = await fetch('http://localhost:3000/users/updatepassword', requestOptions)
        .then((resp) => resp.json())
        .then((actualData) => {
          return actualData
        })

      const respData = response
      console.log(respData); 
      if (respData.status === 1) {
        toast.success('Password Updated Successfully..', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setTimeout(function() {
          navigate("/");
      
      }, 500)
      }
      else {
        // update
        toast.error('Something went wrong, Try again', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setInvalid('invalid')
      }
    }
    else
        setInvalid('invalid')

  }

  return (
    
    <div>
    <form action="#" onSubmit={onSubmit}>
      {/* update */}
        <input type="text" placeholder="New Password" required autoComplete="off"  name="password" className={invalid} min='8' />
        <input type="password" placeholder="Confirm New Password" required autoComplete="off" name="cpassword"  className={invalid}/>
        <p style={{color:"red",fontSize:"20px",display:`${invalid ? "block" : "none"}`}}>something goes wrong</p>
        <div style={{marginTop:'15px',textAlign:'center'}}>
        <Button text="Update Password">Update Password</Button>
        </div>
    </form>
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
    </div>
  )
}
