import Nav from "./nav";
import React from 'react'
import { Frame } from './Frame'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import LoadingSpinner from "./LoadingSpinner";
import Container from "@mui/material/Container";
import '../Pages/Ahomepage.css'
import Pagination from "../Pages/Pagination";

//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Vote = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userID")) {
      if (localStorage.getItem("userID") == 1) {
        console.log("admin logged");
        navigate("/homepage")
      }
      else if (localStorage.getItem("userID") > 1)
        console.log("user logged");
      getallQuery()
    }
    else
      navigate("/")
  }, [1])

  const local_userId = localStorage.getItem("userID")
  const [frame, setFrame] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [fframe, setFFrame] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);


  const getallQuery = async () => {
    setIsLoading(true)

    var array = [];

    const idlist = await fetch("http://3.6.191.95:3000/users/getidlist?userId=" + local_userId)
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      })
    console.log("getAllQuery called");
    var allQuery = await fetch("http://3.6.191.95:3000/users/getfilteredquery")
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      })
      console.log(allQuery);

    const respQueries = allQuery.data;

    respQueries.map(async (singleQuery) => {
      var q;
      const query = singleQuery.queryname
      const id = singleQuery.queryId
      let option = singleQuery.options
      q = { "id": id, "query": query, "startDate": singleQuery.querystartdate, "endDate": singleQuery.queryenddate, isExpired: false }

      const _option = []

      option.map(async (singleoption) => {
        const oid = singleoption.optionId
        let firstOption = { "optionId": oid, "optionName": singleoption.options }

        const votes = await fetch("http://3.6.191.95:3000/users/voteforsingleoption?optionId=" + oid)
          .then((resp) => resp.json())
          .then((actualData) => {
            return actualData
          })

        firstOption = { ...firstOption, "totalvote": votes.voteforsingleoption }
        _option.push(firstOption)
        return firstOption
      })

      // console.log(_option);
      let isvoted = false;
      await idlist.map((single) => {
        // eslint-disable-next-line no-unused-expressions
        single.queryId == id ? isvoted = true : isvoted
      })
      q = { ...q, "option": _option, "isUserVoted": isvoted }


      // console.log(q);
      array.push(q)
      return null;
    })
    // console.log(array);
    array.sort((a, b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1)

    setTimeout(() => {
      setFrame(array)
      // setFFrame(array)
      setIsLoading(false)
      console.log(frame);
    }, 1200)
    // console.log(array)


  }

  const setVote = (qid, optionId) => {
    // console.log(local_userId + " == " + "qid == " + qid + " option == " + optionId);
    // console.log("query id " + qid + " optionId " + optionId);
    setFrame(frame.map((vote) => (vote.id == qid ? { ...vote, option: vote.option.map((opt) => opt.optionId == optionId ? { ...opt, totalvote: opt.totalvote + 1 } : opt), isUserVoted: true } : vote)));
    // console.log(data);
    fetch("http://3.6.191.95:3000/users/castvote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: qid, optionId: optionId, userId: local_userId })
    })
    toast.success('Thanks for voting...!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //pagination 
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = (frame.slice(indexOfFirstPost, indexOfLastPost))

  return (
    <>
      <Nav logedin="" firstName={localStorage.getItem("firstname") || "X"} lastName={localStorage.getItem("lastname") || "X"}/>

      <form onSubmit={handleSubmit} className="Ahomepage_form">
        <Container className="reg" id="Outer_container">
          <Container className="Inner_container">

            {
              isLoading ? <LoadingSpinner /> :
                <>
                  {
                    frame.length > 0 ?
                      currentPosts.map((vote, index) => {
                        if (new Date(vote.endDate) > new Date())
                          return <Frame key={vote.id} index={index+indexOfFirstPost} vote={vote} setVote={setVote} />

                      }
                      ) : <h2 style={{ color: "red", textAlign: "center", marginTop: "5rem" , fontFamily:"Poppins" }}>currently no active ballots for vote...</h2>
                  }
                </>

            }
          </Container>
        </Container>
      </form>
      {
       fframe.length <= currentPosts.length ?
        <Pagination postsPerPage={postsPerPage} totalPosts={frame.length} paginate={paginate} style={{ position: "absolute", bottom: "20px" }} /> :
        <></>

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
  )
}

export default Vote
