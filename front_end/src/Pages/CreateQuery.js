import Nav from "../Components/nav";
import "./CreateQuery.css";
import Container from "@mui/material/Container";
import Button from "../UI/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

const CreateQuery = () => {
  let navigate = useNavigate();
  const [options, addOptions] = useState([1, 2]);
  const [query, setQuery] = useState({
    queryName: "",
    queryStartDate: "",
    queryEndDate: "",
  });
  const fetchFunction = async (query) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...query }),
    };
    try {
      const done = await fetch("http://localhost:5000/Query/addquery", requestOptions);
      const data = await done.json();
      if (data.success) {
        const querId = data.data.insertId;
        return querId;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const postOptions = async (options) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...options }),
    };
    try {
      const done = await fetch("http://localhost:5000/Query/addoptions", requestOptions);
      const data = await done.json();
      if (data.success) {
        if (data.success === 1) {
          console.log(`Options ${options.options} is added to Database successfully.`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createOption = () => {
    options.length < 6 ? addOptions([...options, 1]) : alert("Only 6 Options are allowed!");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    var currentTime = new Date();
    const endTime = new Date(); // The Date object returns today's timestamp
    endTime.setDate(endTime.getDate() + 2);


    // console.log(endTime);
    var date = ("0" + currentTime.getDate()).slice(-2)
    var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
    var thisYear = currentTime.getFullYear();
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    let seconds = currentTime.getSeconds();

    var date1 = ("0" + endTime.getDate()).slice(-2)
    var month1 = ("0" + (endTime.getMonth() + 1)).slice(-2);
    var thisYear1 = endTime.getFullYear();
    let hours1 = endTime.getHours()
    let minutes1 = endTime.getMinutes()
    let seconds1 = endTime.getSeconds();

    var todaydate = thisYear + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    var enddate = thisYear1 + "-" + month1 + "-" + date1 + " " + hours1 + ":" + minutes1 + ":" + seconds1
    const queryName = document.getElementById("query").value;

    const qarray = { queryName: queryName, queryStartDate: todaydate, queryEndDate: enddate };
    // console.log(qarray);
    try {
      const queryPromise = await fetchFunction(qarray);
      const queryId = queryPromise.PromiseResult;
      // console.log(queryPromise);
      setTimeout(() => {
        options.map((currElem, index) => {
          const option = document.getElementById(`${index}`).value;
          const optionObj = { queryId: queryPromise, options: option };
          postOptions(optionObj);
        });
        alert("query added successfully")
        
        navigate("/homepage")
        window.location.reload()
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  const homepage = ["Homepage", "/homepage"];
  return (
    <>
      <Nav logedin="true" firstName="A" homepage={homepage} />
      <Container className="createQuery_wrap">
        <form onSubmit={handleSubmit} className="createQuery_form">
          <p>
            Query<span>(500 characters only!)</span>
          </p>
          <input type="text" placeholder="Input your question here" id="query" required autoComplete="off" name="firstName" />
          <p>
            Options<span>(150 characters only!)</span>
          </p>
          <div className="optionsButton_wrap">
            <div className="optionWrap">
              {options.map((currElem, index) => {
                return <input type="text" placeholder="Input your option here" id={index} required autoComplete="off" name={index} key={index} />;
              })}
            </div>
            <div onClick={createOption} id="buttonWrap">
              <Button text="Options" />
            </div>
          </div>
          <div className="submitButton">
            <Button display="none" text="Submit" />
          </div>
        </form>
      </Container>
    </>
  );
};

export default CreateQuery;
