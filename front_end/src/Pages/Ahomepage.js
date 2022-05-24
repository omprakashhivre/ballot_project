import "./Ahomepage.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import Nav from "../Components/nav";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { APIcontext } from "../API/APIProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import LoadingSpinner from "../Components/LoadingSpinner";
import '../Components/spinner.css'
import { confirm } from "react-confirm-box";

const Ahomepage = (props) => {
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    if (localStorage.getItem("userID") == '1') {
      console.log("admin logged");
    }
    else
      navigate("/")


  })

  const [frame, updateFrame] = useContext(APIcontext);

  // console.log(frame);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const removeFrame = async (id) => {
    await fetch("http://localhost:5000/query/deletequery", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: id })
    }).then((res) => res)
    alert("query Deleted Succesfully...")

    // const newRecord = frame.filter((currElem) => {
    //   return currElem.queryId != id;
    // });
    updateFrame(frame.filter((fr) => { if (fr.id != id) return fr }));



  };

  return (
    <>
      <Nav logedin="true" firstName="Admin" />
      <form onSubmit={handleSubmit} className="Ahomepage_form">
        <Container className="reg" id="Outer_container">
          <div id="add_frame">
            <Link to="/createquery">
              <Button text="Add new frame" display="inline" />{" "}
            </Link>
          </div>
          <Container className="Inner_container">
            {
              loading ? <LoadingSpinner /> :
                <>
                  {
                    frame.length > 0 ?
                      frame.map((currElem) => {
                        let sum = 0;
                        // console.log(currElem.id);
                        // console.log(currElem);
                        currElem.options.map((op) => sum = sum + op.totalvote)
                        return (
                          <div className="inner_form" key={currElem.id}>
                            <h3>{currElem.query}</h3>
                            {currElem.options.map((curr, index) => {

                              return (
                                <div key={currElem.optionsId}>
                                  <div className="percent_name_wrap">
                                    <span>{sum !== 0 ? Math.floor(curr.totalvote / sum * 100) : sum}%</span>
                                    <h3>{curr.optionName}</h3>
                                  </div>
                                  <div className="progress p_inline_bar">
                                    <div
                                      className="progress-bar inline-progress-bar"
                                      role="progressbar"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{ width: ((Math.floor(curr.totalvote / sum * 100))) + "%" }}
                                    ></div>
                                  </div>{" "}
                                </div>
                              );
                            })}
                            <div className="bottom_form">
                              <div className="usersPic_voteCount">
                                Total vote: {sum}
                              </div>
                              {
                                new Date(currElem.endDate) < new Date() ?
                                  <div>
                                    <h2 style={{ color: "red", textAlign: "center", marginTop: "5rem" }}>expired</h2>
                                  </div>
                                  : ""
                              }


                              <div className="EditRemoveIcon_wrap">

                                <img title="delete this post"
                                  src={require("../image/remove.png")}
                                  alt="delete"
                                  onClick={() => {
                                    const options = {
                                      title: 'Delete',
                                      message: 'Are you really want to delete this Frame',
                                      buttons: [
                                        {
                                          label: 'Yes',
                                          onClick: () => removeFrame(currElem.id)
                                        },
                                        {
                                          label: 'No',
                                          onClick: () => console.log("delete operation cancelled")
                                        }
                                      ],
                                      childrenElement: () => <div />,
                                      // customUI: ({ title, message, onClose }) => <div>Custom UI</div>,
                                      willUnmount: () => { }
                                    }
                                    confirmAlert(options)

                                  }}
                                  width={"35.063rem"}
                                  height={"35.063rem"}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }) : <h2 style={{ color: "red", textAlign: "center", marginTop: "5rem" }}>...</h2>
                  }
                </>
            }

          </Container>
        </Container>
      </form>
    </>
  );
};

export default Ahomepage;
