import Nav from "./nav";
import React from 'react'
import { Frame } from './Frame'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import LoadingSpinner from "./LoadingSpinner";
import Container from "@mui/material/Container";
import '../Pages/Ahomepage.css'

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

  // const getallQuery = async () => {
  //   setIsLoading(true)

  //   var array = [];

  //   const idlist = await fetch("http://localhost:5000/users/getidlist?userId="+ local_userId)

  //   // console.log(idlist.data);


  //   console.log("getAllQuery called");
  //   var allQuery = await fetch("http://localhost:5000/query/getfilteredquery")
  //     .then((resp) => resp.json())
  //     .then((actualData) => {
  //       return actualData
  //     })

  //   const respQueries = allQuery.data;


  //   await respQueries.map(async (singleQuery) => {
  //     var q;

  //     const query = singleQuery.queryName
  //     const id = singleQuery.queryId
  //     q = { "id": id, "query": query, "startDate": singleQuery.querystartdate, "endDate": singleQuery.queryenddate }


  //     const singlequeryoptions = await fetch("http://localhost:5000/options/getalloptions", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ queryId: id })

  //     })
  //       .then((resp) => resp.json())
  //       .then(async (actualData) => {
  //         let alloptions = []
  //         const opt = await actualData.data.map(async (singleoption) => {
  //           let firstOption = { "optionId": singleoption.optionId, "optionName": singleoption.options, "querystartdate": singleoption.querystartdate, "queryenddate": singleoption.queryenddate }

  //           const voteaddedoption = await fetch("http://localhost:5000/users/voteforsingleoption", {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({ optionId: singleoption.optionId })
  //           }).then((resp1) => resp1.json())
  //             .then((optiondata) => {
  //               firstOption = { ...firstOption, "totalvote": optiondata.data[0].voteforsingleoption }
  //             })
  //           alloptions.push(firstOption)
  //           return firstOption
  //         })

  //         let isvoted = false;
  //         idlist.data.map((id) => id.queryId == q.id ? isvoted = true : {})
  //         q = { ...q, "options": alloptions, "isUserVoted": isvoted }
  //         array.push(q)

  //         return actualData
  //       })
  //     array.sort((a, b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1)
  //     return 1;
  //   })
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     setData(array)


  //   }, 1500)
  //   console.log(array)


  // }

  const getallQuery = async () => {
    setIsLoading(true)

    var array = [];

    const idlist = await fetch("http://localhost:5000/users/getidlist?userId=" + local_userId)
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      })

    // console.log(idlist.data);


    console.log("getAllQuery called");
    var allQuery = await fetch("http://localhost:5000/users/getfilteredquery")
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      })

    const respQueries = allQuery.data;

    respQueries.map(async (singleQuery) => {
      console.log(singleQuery);
      var q;

      const query = singleQuery.queryname
      const id = singleQuery.queryId
      let option = singleQuery.options
      q = { "id": id, "query": query, "startDate": singleQuery.queryStartDate, "endDate": singleQuery.queryenddate, isExpired: false }

      const _option = []

      let option_1 = option.map(async (singleoption) => {
        const oid = singleoption.optionId
        let firstOption = { "optionId": oid, "optionName": singleoption.options }

        const votes = await fetch("http://localhost:5000/users/voteforsingleoption?optionId=" + oid)
          .then((resp) => resp.json())
          .then((actualData) => {
            return actualData
          })
        firstOption = { ...firstOption, "totalvote": votes.voteforsingleoption }
        _option.push(firstOption)
        return firstOption
      })
      console.log(_option);
      let isvoted = false;
      idlist.map((id) => id.queryId == id ? isvoted = true : {})
      q = { ...q, "option": _option, "isUserVoted": isvoted }
      console.log(q);
      array.push(q)
      return null;
    })
    console.log(array);
    // array.sort((a, b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1)
    setTimeout(() => {
      setFrame(array)
      setIsLoading(false)
    }, 1000)
    console.log(array)


  }

  const setVote = (qid, optionId) => {
    console.log(local_userId + " == " + "qid == "+qid +" option == "+optionId);
    console.log("query id " + qid + " optionId " + optionId);
    setFrame(frame.map((vote) => (vote.id === qid ? { ...vote, option: vote.option.map((opt) => opt.optionId == optionId ? { ...opt, totalvote: opt.totalvote + 1 } : opt), isUserVoted: true } : vote)));
    // console.log(data);
    fetch("http://localhost:5000/users/castvote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: qid, optionId: optionId, userId: local_userId })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Nav logedin="" firstName={localStorage.getItem("firstname") || "xx"} lastName={localStorage.getItem("lastname") || "xx"} />

      <form onSubmit={handleSubmit} className="Ahomepage_form">
      <Container className="reg" id="Outer_container">
        <Container className="Inner_container">
          {
            isLoading ? <LoadingSpinner /> :
              <>
                {
                  frame.length > 0 ?
                    frame.map((vote, index) => {
                      if (new Date(vote.endDate) > new Date())
                        return <Frame key={vote.id} index={index} vote={vote} setVote={setVote} />

                    }
                    ) : <h2 style={{ color: "red", textAlign: "center", marginTop: "5rem" }}>currently no active ballots for vote...</h2>
                }
              </>

          }
        </Container>
      </Container>
          </form>

    </>
  )
}

export default Vote
