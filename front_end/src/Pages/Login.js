import "./reg.css";
import Button from "../UI/Button";
import Nav from "../Components/nav";
import Upperpart from "../Components/Upper_part";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

var Login = () => {

  const [inputClass, setInputClass] = useState()
  const [userreg, updateuserreg] = useState({
    emailId: "",
    password: "",
  });
  const [logindata, setlogindata] = useState({})


  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    updateuserreg({ ...userreg, [name]: value });
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
      body: JSON.stringify({ emailId: e.target.emailId.value, password: e.target.password.value })
    }


    const response = await fetch('http://localhost:5000/users/login', requestOptions)
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      })

      console.log(response);
    const respdata = response
    




    if (respdata.success === 1) {

      //storing data in local
      console.log(respdata.data[0]);
      const user = {userID : respdata.data[0].userId , emailId: respdata.data[0].emailId,
        firstName : respdata.data[0].firstname , lastName: respdata.data[0].lastname}
        console.log(user);
      localStorage.setItem("userID" , respdata.data[0].userId);
      localStorage.setItem("firstname" , respdata.data[0].firstName);
      localStorage.setItem("lastname" , respdata.data[0].lastName);
    
      
      setlogindata(respdata.data[0])
      console.log(logindata);
      if (respdata.data[0].userId == 1)
        req();
      else
        navigate("/allframes");
    }
    else {
      setlogindata(respdata)
      setInputClass("invalid")
    }

  };



  return (
    <>
      <Nav />
      <Container className="reg lgin">
        <Upperpart top_heading="Welcome! Again" heading="Login" bottom_heading="New here?" link="Register account" href="/reg" />
        <form action="#" onSubmit={onsubmit}>
          <div className="email-to-password" id="login_input">
            <input type="email" placeholder="Email" required autoComplete="off" value={userreg.emailId} onChange={handleInput} name="emailId" className={inputClass} />

            <input
              type="password"
              placeholder="Password"
              required
              autoComplete="off"
              value={userreg.password}
              onChange={handleInput}
              name="password"
              className={inputClass}
            />
            <p style={{ color: "red", fontSize: "20px", display: `${inputClass ? "block" : "none"}` }} >invalid credentials</p>
            <Link to="/forgotpass" id="link" sx={{ color: "#0029FE", textDecoration: "none", fontSize: "1.5rem" }}>
              Forget Password?
            </Link>
          </div>
          <Button text="LogIn" display="none" />
        </form>
      </Container>
    </>
  );
};
export default Login;
