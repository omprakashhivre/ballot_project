import "./Ahomepage.css";
import Button from "../UI/Button";
import ReactPaginate from 'react-paginate'
import Paginatnation from './Pagination'
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom'
import Nav from "../Components/nav";
import Container from "@mui/material/Container";
// import { useContext } from "react";
// import { APIcontext } from "../API/APIProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import LoadingSpinner from "../Components/LoadingSpinner";
import '../Components/spinner.css'
import { confirm } from "react-confirm-box";
import { style } from "@mui/system";


const Ahomepage = ({ currentItems }) => {

  useEffect(() => {
    getAllQuery()
    if (localStorage.getItem("userID") == 1) {
      console.log("admin logged");

    }
    else
      navigate("/")
  }, [1])

  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [frame, setFrame] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const getAllQuery = async () => {
    const array = []
    setLoading(true)
    console.log("getAllQuery called");
    var allQuery = await fetch("http://localhost:5000/users/getAllquery")
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      })
    console.log(allQuery.data);
    const respQueries = allQuery.data;


    respQueries.map(async (singleQuery) => {
      // console.log(singleQuery);
      var q;

      const query = singleQuery.queryname
      const id = singleQuery.queryId
      let option = singleQuery.options
      q = { "id": id, "query": query, "startDate": singleQuery.queryStartDate, "endDate": singleQuery.queryenddate }

      const _option = []

      option = option.map(async (singleoption) => {
        const oid = singleoption.optionId
        const optionName = singleoption.options
        let firstOption = { "optionId": oid, "optionName": singleoption.options }

        const votes = await fetch("http://localhost:5000/users/voteforsingleoption?optionId=" + oid)
          .then((resp) => resp.json())
          .then((actualData) => {
            return actualData
          })
        console.log(votes);
        firstOption = { ...firstOption, "totalvote": votes.voteforsingleoption }
        _option.push(firstOption)
        // q = { ...q, "option": [...option, { optionId: oid, options: optionname, "totalvote": votes.voteforsingleoption }] }
        console.log(votes);
        return firstOption
      })
      q = { ...q, "option": _option }
      console.log(q);
      array.push(q)
      // let isvoted = false;
      // idlist.data.map((id) => id.queryId == q.id ? isvoted = true : {})
      // q = { ...q, "option" : [...option ,{...singleoption , "totalvote" : votes.data.voteforoneoption }]}


      return null;
    })

    array.sort((a, b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1)
    setTimeout(() => {
      setFrame(array)
      setLoading(false)
    }, 1000)

    // frame.sort((a, b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1)

    console.log(frame);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const removeFrame = async (id) => {
    await fetch("http://localhost:5000/users/deletequery", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: id })
    }).then((res) => res)
    alert("query Deleted Succesfully...")
    setFrame(frame.filter((fr) => { if (fr.id != id) return fr }));
  };







  //login pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = frame.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
    return (
      <>
        <Nav logedin="true" firstName="Admin" />
        <div style={{ width: "1max", height: "50px", backgroundColor: "white", borderRadius: "20px" }}></div>
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
                        currentPosts.map((currElem, index) => {
                          let sum = 0;
                          // console.log(currElem.id);
                          // console.log(currElem);
                          currElem.option.map((op) => sum = sum + parseInt(op.totalvote))
                          let isexpired = new Date(currElem.endDate) < new Date() ? true : false

                          return (

                            <div className={isexpired ? "inner_form_expired" : "inner_form"} key={currElem.id}>
                              <h3>{index + 1}) {currElem.query}</h3>
                              <div style={{ borderRadius: "10px", padding: "10px", backgroundColor: "#d5d6f2" }}>
                                {currElem.option.map((curr, index) => {

                                  return (
                                    <div key={currElem.optionsId} style={{ backgroundColor: "#d5d6f2", padding: "2px", marginTop: "2px" }}>
                                      <div className="percent_name_wrap">
                                        <span>{sum != 0 ? (Math.round(curr.totalvote / sum) * 100).toFixed() : sum}%</span>
                                        <h3>{curr.optionName.trim()}</h3>
                                      </div>
                                      <div className="progress p_inline_bar">
                                        <div
                                          className="progress-bar inline-progress-bar"
                                          role="progressbar"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                          style={{ width: ((Math.ceil(curr.totalvote / sum)) * 100) + "%" }}
                                        ></div>
                                      </div>{" "}
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="bottom_form">
                                <div className="usersPic_voteCount">
                                  Total vote: {sum}
                                </div>
                                {/* {
                                new Date(currElem.endDate) < new Date() ?
                                  <div>
                                    <h2 style={{ color: "red", textAlign: "center", marginTop: "5rem" }}>expired</h2>
                                  </div>
                                  : ""
                              } */}


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
        <Paginatnation postsPerPage={postsPerPage} totalPosts={frame.length} paginate={paginate} style={{position:"absolute",right:"30px"}} />

        
        

      </>
    );




  }




  export default Ahomepage;
