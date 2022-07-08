import Nav from "../Components/nav";
import "./CreateQuery.css";
import Container from "@mui/material/Container";
import Button from "../UI/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


//toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateQuery = () => {
  let navigate = useNavigate();
  const [options, addOptions] = useState([1, 2]);
  const [QueryFirstname, setQueryFirstname] = useState('');


  const handleChange = (e) => {
    setQueryFirstname(e.target.value)
  }

  const fetchFunction = async (query) => {
    console.log(query);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };
    try {
      const done = await fetch("http://localhost:3000/users/addquery", requestOptions);
      console.log(done);
      const data = await done.json();
      if (data.status) {
        // const querId = data.data.insertId;
        toast.success('Query Added successfully!', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // return querId;
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      toast.error('Unable to add query, Try again later...', {
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
      // options.length > 2 ? document.getElementById('deleteOption').style.display = 'block' :
      toast.warn('Only six option allowed to add.', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
  };
  // update
  const deleteOption = () => {
    if(options.length > 2) 
      addOptions(options.slice(0, -1)) 
      // toast.warn('Minimum 2 options Required', {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
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
    const query = { queryName: queryName, queryenddate: enddate, "options": _option };
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
            <p>{QueryFirstname}</p>
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
            {/* update */}
            <div>
              <div onClick={createOption} id="buttonWrap" style={{marginBottom:'1.5rem'}}>
                <Button text="Add Options" />
              </div>
              {
                options.length > 2 ? <div onClick={deleteOption} id="deleteOption">
                  <Button text="Remove Options" />
                </div> : <></>
              }

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
