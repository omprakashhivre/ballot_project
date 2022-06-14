import "./Ahomepage.css";
import Button from "../UI/Button";
import Paginatnation from './Pagination'
import { Link } from "react-router-dom";
import { DropdownButton } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import Nav from "../Components/nav";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import LoadingSpinner from "../Components/LoadingSpinner";
import '../Components/spinner.css'

//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Ahomepage = ({ currentItems }) => {
  let navigate = useNavigate()
  useEffect(() => {
    const usrId = localStorage.getItem("userID")
    if (usrId == 1) {
      getAllQuery()
    }
    else {
      navigate('/')
      console.log("admin not logged in ");
    }
  }, [])



  const [loading, setLoading] = useState(false)
  const [frame, setFrame] = useState([])
  const [fframe, setFFrame] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  var array = []
  const getAllQuery = async () => {

    setLoading(true)
    console.log("getAllQuery called");
    var allQuery = await fetch("http://3.6.191.95:3000/users/getAllquery")
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      })
    // console.log(allQuery.data);
    const respQueries = allQuery.data;


    respQueries.map(async (singleQuery) => {
      // console.log(singleQuery);
      var q;

      const query = singleQuery.queryname
      const id = singleQuery.queryId
      let option = singleQuery.options
      let isExpired = new Date(singleQuery.queryenddate) < new Date() ? true : false
      q = { "id": id, "query": query, "startDate": singleQuery.queryStartDate, "endDate": singleQuery.queryenddate, "isExpired": isExpired }

      const _option = []

      option = option.map(async (singleoption) => {
        const oid = singleoption.optionId
        const optionName = singleoption.options
        let firstOption = { "optionId": oid, "optionName": singleoption.options }

        const votes = await fetch("http://3.6.191.95:3000/users/voteforsingleoption?optionId=" + oid)
          .then((resp) => resp.json())
          .then((actualData) => {
            return actualData
          })
        // console.log(votes);
        firstOption = { ...firstOption, "totalvote": votes.voteforsingleoption }
        _option.push(firstOption)
        // q = { ...q, "option": [...option, { optionId: oid, options: optionname, "totalvote": votes.voteforsingleoption }] }
        // console.log(votes);
        return firstOption
      })
      q = { ...q, "option": _option }
      // console.log(q);
      array.push(q)
      // let isvoted = false;
      // idlist.data.map((id) => id.queryId == q.id ? isvoted = true : {})
      // q = { ...q, "option" : [...option ,{...singleoption , "totalvote" : votes.data.voteforoneoption }]}


      return null;
    })

    array.sort((a, b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1)
    setTimeout(() => {
      setFrame(array)
      setFFrame(array)
      setLoading(false)
    }, 1200)

    // frame.sort((a, b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1)

    // console.log(fframe);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const removeFrame = async (id) => {
    await fetch("http://3.6.191.95:3000/users/deletequery", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: id })
    }).then((res) => res)
    toast.success('Query deleted successfully!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setFrame(frame.filter((fr) => { if (fr.id != id) return fr }));
    setFFrame(fframe.filter((fr) => { if (fr.id != id) return fr }));
  };
  
  //login pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  let currentPosts = (fframe.slice(indexOfFirstPost, indexOfLastPost))
  // console.log(currentPosts);



  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  //filter
  const handleFilter = async (e) => {
    if (e === 'a') {
      setFFrame(frame)
    }
    else if (e === "b") {
      console.log("live frames");
      setFFrame(frame.filter(function (fr) { return (new Date(fr.endDate) > new Date()) }))
      // console.log(fframe);
    }
    else if (e === 'c') {
      console.log("expires")
      setFFrame(frame.filter(function (fr) { return (new Date(fr.endDate) <= new Date()) }))
   
    }
    else if (e === "10" || e === "5" || e === "3" || e === "2") {
      console.log(e);
      setPostsPerPage(e)
    }

  }



  return (
    <>
      <Nav logedin="true" firstName="Admin" />
      <DropdownButton
        as={ButtonGroup}
        key="primary"
        id={`dropdown-variants-primary`}
        variant={"primary".toLowerCase()}
        title={
          'Filter'
        }
        style={{ position: "absolute", right: "30px", top: "25%" }}
        onSelect={handleFilter}
      >
        <Dropdown.Item eventKey="a" active setSelected>All Frames</Dropdown.Item>
        <Dropdown.Item eventKey="b">Live Frames</Dropdown.Item>
        <Dropdown.Item eventKey="c">Expired Frames</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="10">10 Frame per page</Dropdown.Item>
        <Dropdown.Item eventKey="5">5 Frame per page</Dropdown.Item>
        <Dropdown.Item eventKey="3">3 Frame per page</Dropdown.Item>
        <Dropdown.Item eventKey="2" setSelected >2 Frame per page</Dropdown.Item>
      </DropdownButton>
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
                        currElem.option.map((op) => sum = sum + parseInt(op.totalvote))
                        let isexpired = new Date(currElem.endDate) < new Date() ? true : false

                        return (

                          <div className={isexpired ? "inner_form_expired" : "inner_form"} key={currElem.id}>
                            <h3>{index + 1}) {currElem.query}</h3>
                            {/* <Overlay /> */}
                            
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



                              <div className="EditRemoveIcon_wrap">

                                <img title="delete this post"
                                  src={require("../image/remove.png")}
                                  alt="delete"
                                  onClick={() => {
                                    const options = {
                                      title: 'Delete Frame',
                                      message: `${currElem.query}`,
                                      buttons: [
                                        {
                                          label: 'Delete',
                                          onClick: () => removeFrame(currElem.id ),
                                        },
                                        {
                                          label: 'Cancel',
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
            {
              (currentPosts.length === fframe.length) ? '' :
              <Paginatnation postsPerPage={postsPerPage} totalPosts={fframe.length} paginate={paginate} style={{ position: "absolute", bottom: "20px" }} />
            }
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




}
export default Ahomepage;
