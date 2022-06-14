// import React, { createContext, useState, useEffect } from "react";


// export const APIcontext = createContext();


// export const APIProvider = props => {
//   const [isLoading, setIsLoading] = useState(false)
//   const local_userId = localStorage.getItem("userID")
//   // useEffect(() => { getallQuery() }
//   //   , [1])

//   const [ApiData, setApiData] = useState([]);

//   var array = [];
//   const getallQuery = async () => {
//     setIsLoading(true)

//     console.log("getAllQuery called");
//     var allQuery = await fetch("http://3.6.191.95:3000/users/getAllquery")
//       .then((resp) => resp.json())
//       .then((actualData) => {
//         return actualData
//       })
//       console.log(allQuery.data);
//     const respQueries = allQuery.data;


//     respQueries.map(async (singleQuery) => {
//       // console.log(singleQuery);
//       var q;

//       const query = singleQuery.queryname
//       const id = singleQuery.queryId
//       let option = singleQuery.options
//       q = { "id": id, "query": query, "startDate": singleQuery.queryStartDate, "endDate": singleQuery.queryenddate , "option" : option }


      
//       option =  option.map(async (singleoption) => {
//         const oid = singleoption.optionId
//         const optionname = singleoption.options
//         let firstOption = { "optionId": oid , "optionName": singleoption.options }

//         const votes = await fetch("http://3.6.191.95:3000/users/voteforsingleoption?optionid=" + oid)
//         console.log(votes);

//         q = { ...q, "option" : [...option ,{optionId : oid , options : optionname , "totalvote" : votes.data.voteforoneoption }]}

//         return firstOption
//       })

//       // let isvoted = false;
//       // idlist.data.map((id) => id.queryId == q.id ? isvoted = true : {})
//       // q = { ...q, "option" : [...option ,{...singleoption , "totalvote" : votes.data.voteforoneoption }]}

//       array.push(q)
  
//       return null;
//     })



//     array.sort((a, b) => new Date(a.startDate) < new Date(b.startDate) ? 1 : -1)
//     return 1;
//   }
//   console.log(array);

//   setTimeout(() => {
//     setIsLoading(false)
//     setApiData(array)
//   }, 2000)

// return <APIcontext.Provider value={[ApiData, setApiData]} isLoading={isLoading}>{props.children}</APIcontext.Provider>;
// }
