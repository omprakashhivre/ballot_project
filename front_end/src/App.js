import "./App.css";
import Reg from "./Pages/reg";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Pages/Login";
import Ahomepage from "./Pages/Ahomepage";
import CreateQuery from "./Pages/CreateQuery";
import Vote from "./Components/Vote";
import ForgotPass from "./Components/ForgotPass";
import { useEffect } from "react";

// rafce


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    // getallQuery()
  }, [])

  // const [optData, setoptData] = useState([])
  // const [checkmate, setcheckmate] = useState(false)
  // var votes = [];
  // const [ballot, setBallot] = useState([])
  // const [loggedIn, setLoggedIn] = useState({ emailId: "" })

  // const addinballot = (q) => {
  //   ballot.map((bal) => {
  //     if (bal.id === q.id) {
  //       setcheckmate(true)
  //     }
  //   })

  //   if (!checkmate) {
  //     setcheckmate(false)
  //     setBallot([...ballot, q])
  //     console.log(ballot);
  //   }
  // }

  // const getallQuery = async () => {
  //   var array = [];

  //   console.log("getAllQuery called");
  //   var allQuery = await fetch("http://3.6.191.95:3000/query/getAllquery")
  //     .then((resp) => resp.json())
  //     .then((actualData) => {
  //       return actualData
  //     })

  //   const respQueries = allQuery.data;


  //   await respQueries.map(async (singleQuery) => {
  //     var q;

  //     const query = singleQuery.queryName
  //     const id = singleQuery.queryId
  //     q = { "id": id, "query": query }
  //     const singlequeryoptions = await fetch("http://3.6.191.95:3000/options/getalloptions", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ queryId: id })

  //     })
  //       .then((resp) => resp.json())
  //       .then(async (actualData) => {
  //         let alloptions = []
  //         const opt = await actualData.data.map(async (singleoption) => {
  //           let firstOption = { "optionId": singleoption.optionId, "optionName": singleoption.options }

  //           const voteaddedoption = await fetch("http://3.6.191.95:3000/users/voteforsingleoption", {
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
  //         q = { ...q, "options": alloptions, "isUserVoted": false }
  //         array.push(q)
  //         return actualData
  //       })

  //     return 1;
  //   })
  //   console.log(array);
  //   setBallot(array)
  //   console.log(ballot);

  // }


  return (
    <div className="background">
      {/* <APIProvider> */}
        <Routes>
          <Route path="/reg" exact element={<Reg />} />
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Ahomepage />} />
          <Route path="/createquery" element={<CreateQuery />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/allframes" element={<Vote />} />
        </Routes>
      {/* </APIProvider> */}
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
    </div>
    
   
  );

}

export default App;
