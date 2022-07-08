import "./reg.css";
import Button from "../UI/Button";
import Nav from "../Components/nav";
import Upperpart from "../Components/Upper_part";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

var Login = () => {

  const [inputClass, setInputClass] = useState({class : "" , msg : ""})
  const [UserReg, updateUserReg] = useState({
    email: "",
    password: "",
  });
  const [logindata, setLoginData] = useState({})


  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    updateUserReg({ ...UserReg, [name]: value });
  };
  let navigate = useNavigate();
  function req() {
    navigate("/homepage");
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    //validation part is here to be written
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
    }


    const response = await fetch('http://localhost:3000/users/login', requestOptions)
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      }).catch(setInputClass({class : "invalid" , msg : "Not able to fetch data from server"}))

    console.log(response);
    const respdata = response.data
    




    if (response.status === 1) {
      // const user = {userID : respdata.id , email: respdata.email,
      //   firstName : respdata.firstname , lastName: respdata.lastname}
      // console.log(user);
      localStorage.setItem("userID" , respdata.id);
      localStorage.setItem("firstname" , respdata.firstname);
      localStorage.setItem("lastname" , respdata.lastname);
    
      
      setLoginData(respdata)
      console.log(respdata);
      if (respdata.id == 1)
        req();
      else
        navigate("/allframes");
    }
    else {
      setLoginData(respdata)
      setInputClass({class : "invalid" , msg : "Please enter correct Credentials"})
    }

  };



  return (
    <>
      <Nav />
      <Container className="reg lgin">
        <Upperpart top_heading="Welcome! Again" heading="Login" bottom_heading="New here?" link="Register account" href="/reg" />
        <form action="#" onSubmit={onsubmit}>
          <div className="email-to-password" id="login_input">
            <input type="email" placeholder="Email" required autoComplete="off" value={UserReg.email} onChange={handleInput} name="email" className={inputClass.class} />

            <input
              type="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={UserReg.password}
              onChange={handleInput}
              name="password"
              className={inputClass.class}
            />
            <p style={{ color: "red", fontSize: "20px", display: `${inputClass.class ? "block" : "none"}` }} >{inputClass.msg}</p>
            <Link to="/forgotpass" id="link" sx={{ color: "#0029FE", textDecoration: "none", fontSize: "1.5rem" }}>
              Forgot Password?
            </Link>
          </div>
          <Button text="LogIn" display="none" />
        </form>
      </Container>
    </>
  );
};
export default Login;
