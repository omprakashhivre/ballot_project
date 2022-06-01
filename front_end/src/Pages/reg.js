import "./reg.css";
import Button from "../UI/Button";
import Nav from "../Components/nav";
import Upperpart from "../Components/Upper_part";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

var Reg = () => {
  const [invalid, setInvalid] = useState();
  let navigate = useNavigate();
  // const  [c_password_error, updateC_password_error] = useState("");
  const [userreg, updateuserreg] = useState({
    fistName: "",
    lastName: "",
    emailId: "",
    password: "",
    c_password: "",
  });

  const [records, updaterecord] = useState([]);

  const handleInput = (e) => {
    //checking of imput is here to pe written
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + " === " + value);
    updateuserreg({ ...userreg, [name]: value });
    console.log(userreg);
    // console.log(userreg);
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(userreg);
    //validation part is here to be written
    try {
        const pass_check = userreg.password == userreg.c_password ? true : false;
      if (pass_check) {
        console.log("password matches");
        const record_with_id = { ...userreg, id: new Date().getTime().toString() };
        updaterecord([...records, record_with_id]);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName: userreg.firstName, lastName: userreg.lastName, email: userreg.emailId, password: userreg.password }),
        };

      const reg = await  fetch("http://localhost:5000/users/register", requestOptions)
          .then((response) => response.json())
          .catch(xy => console.log(xy))

          if(reg.status === 1)
            { updateuserreg({ firstName: "", lastName: "", emailId: "", password: "", c_password: "" });
              // alert(reg.data)
              console.log(reg.data);
              navigate("/");
            }
          else{
            console.log(reg.data)
          }  

      } else {
        setInvalid('invalid')
      }
      
        
    } catch (error) {
      alert("something went wrong "+error)
    }
  };
  return (
    <>
      <Nav />
      <Container className="reg">
        <Upperpart top_heading="Start for free" heading="Create new account" bottom_heading="Already a member?" link="LogIn" href="/" />
        <form action="#" onSubmit={onsubmit}>
          <div className="Initals">
            <input type="text" placeholder="First name" required autoComplete="off" value={userreg.firstName} onChange={handleInput} name="firstName" />
            <input type="text" placeholder="Last name" required autoComplete="off" value={userreg.lastName} onChange={handleInput} name="lastName" />
          </div>
          <div className="email-to-password">
            <input type="email" placeholder="Email" required autoComplete="off" value={userreg.emailId} onChange={handleInput} name="emailId" />
            <input type="password" placeholder="Password" required autoComplete="off" value={userreg.password} onChange={handleInput} name="password" className={invalid} min="8" />
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              required
              value={userreg.c_password}
              onChange={handleInput}
              name="c_password"
              className={invalid}
            // style={{c_password_error}}
            />
            <p style={{ color: "red", fontSize: "20px", display: `${invalid ? '' : 'none'}` }}>password and conform password must match</p>
          </div>
          <Button text="Create account" display="none" />
        </form>
      </Container>
    </>
  );
};
export default Reg;
