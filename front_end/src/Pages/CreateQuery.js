import Nav from "../Components/nav";
import "./CreateQuery.css";
import Container from "@mui/material/Container";
import Button from "../UI/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "@emotion/styled";


// import { useNavigate } from "react-router-dom";

const CreateQuery = () => {
  let navigate = useNavigate();
  const [options, addOptions] = useState([1, 2]);
  const [query_firstname, setquery_firstname] = useState('');
  const [query, setQuery] = useState({
    queryName: "",
    queryStartDate: "",
    queryEndDate: "",
  });

  const handleChange = (e) => {
    setquery_firstname(e.target.value)
  }

  const fetchFunction = async (query) => {
    console.log(query);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };
    try {
      const done = await fetch("http://localhost:5000/users/addquery", requestOptions);
      const data = await done.json();
      if (data.status) {
        const querId = data.data.insertId;
        toast.success('Query Added successfully!', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return querId;
      }
    } catch (err) {
      toast.warn('Unable to add query now!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err);
    }
  };

  const createOption = () => {
    options.length < 6 ? addOptions([...options, 1]) :
      toast.warn('Only six option allowed to add.', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // var currentTime = new Date();
    const endTime = new Date(); // The Date object returns today's timestamp
    endTime.setDate(endTime.getDate() + 2);

    var date1 = ("0" + endTime.getDate()).slice(-2)
    var month1 = ("0" + (endTime.getMonth() + 1)).slice(-2);
    var thisYear1 = endTime.getFullYear();
    let hours1 = endTime.getHours()
    let minutes1 = endTime.getMinutes()
    let seconds1 = endTime.getSeconds();


    let enddate = thisYear1 + "-" + month1 + "-" + date1 + " " + hours1 + ":" + minutes1 + ":" + seconds1

    const queryName = document.getElementById("query").value;
    const _option = []
    options.map((currElem, index) => {
      const option = document.getElementById(`${index}`).value;
      _option.push(option)
    });
    const query = { queryName: queryName, queryEndDate: enddate, "options": _option };
    // console.log(qarray);
    try {
      await fetchFunction(query);
      navigate("/homepage")

    } catch (e) {
      console.log(e);
    }
  };

  const homepage = ["Homepage", "/homepage"];
  return (
    <>
      <Nav logedin="true" firstName="A" />
      <Container className="createQuery_wrap">
        <form onSubmit={handleSubmit} className="createQuery_form">
          <p>
            Query<span>(500 characters only!)</span>
          </p>

          <input type="text" placeholder="Input your question here" id="query" required autoComplete="off" name="firstname" max={500} onChange={handleChange} />
          <div className="styled">
            <p>{query_firstname}</p>
          </div>
          
          <p>
            Options<span>(150 characters only!)</span>
          </p>
          <div className="optionsButton_wrap">
            <div className="optionWrap">
              {options.map((currElem, index) => {
                return <input type="text" placeholder="Input your option here" id={index} required autoComplete="off" name={index} key={index} max={150} />;
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


export default CreateQuery;
