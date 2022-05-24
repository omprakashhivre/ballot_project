import React, { createContext, useState,useEffect } from "react";
 

export const APIcontext = createContext();


export const APIProvider = props => {
  const [isLoading,setIsLoading] = useState(false)
  const local_userId = localStorage.getItem("userID")
  useEffect(() => 
   { getallQuery() }
  , [])

  const [ApiData, setApiData] = useState([
    //     {
    //       queryId: 0,
    //       query: "Which programming languages you like?",
    //       options: ["Python", "Java", "Javascript", "C#"],
    //       optionsId:['q0p0','q0p1','q0p2','q0p3'],
    //       scores: [50, 30, 82, 30],
    //       tVotes: 192,
    //     },
    //     {
    //       queryId: 1,
    //       query: "Which Company you think is best?",
    //       options: ["Google", "Oracle", "Tata", "Ford", "Infosys"],
    //       optionsId:['q0p0','q0p1','q0p2','q0p3'],
    //       scores: [75, 65, 40, 30, 60],
    //       tVotes: 270,
    //     },
    //     {
    //       queryId: 2,
    //       query: "Which programming languages you like?",
    //       options: ["Python", "Java", "Javascript", "C#"],
    //       optionsId:['q0p0','q0p1','q0p2','q0p3'],
    //       scores: [50, 30, 82, 30],
    //       tVotes: 192,
    //     },
  ]);
  

  const getallQuery = async () => {
    setIsLoading(true)

    var array = [];

    const idlist = await fetch("http://localhost:5000/vote/getidlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: local_userId })
    }).then((resp1) => resp1.json())
      .then((idlist1) => idlist1)

    // console.log(idlist.data);


    console.log("getAllQuery called");
    var allQuery = await fetch("http://localhost:5000/query/getAllquery")
      .then((resp) => resp.json())
      .then((actualData) => {
        return actualData
      })

    const respQueries = allQuery.data;


    await respQueries.map(async (singleQuery) => {
      // console.log(singleQuery);
      var q;

      const query = singleQuery.queryName
      const id = singleQuery.queryId
      q = { "id": id, "query": query , "startDate" : singleQuery.querystartdate ,"endDate" : singleQuery.queryenddate }
      

      const singlequeryoptions = await fetch("http://localhost:5000/options/getalloptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryId: id })

      })
        .then((resp) => resp.json())
        .then(async (actualData) => {
          let alloptions = []
          const opt = await actualData.data.map(async (singleoption) => {
            let firstOption = { "optionId": singleoption.optionId, "optionName": singleoption.options }

            const voteaddedoption = await fetch("http://localhost:5000/users/voteforsingleoption", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ optionId: singleoption.optionId })
            }).then((resp1) => resp1.json())
              .then((optiondata) => {
                firstOption = { ...firstOption, "totalvote": optiondata.data[0].voteforsingleoption }
              })
            alloptions.push(firstOption)
            return firstOption
          })

          let isvoted = false;
          idlist.data.map((id) => id.queryId == q.id ? isvoted = true : {})
          q = { ...q, "options": alloptions, "isUserVoted": isvoted }
          
          array.push(q)

          return actualData
        })
        array.sort((a,b) =>  new Date(a.startDate) < new Date(b.startDate) ? 1 : -1 )
      return 1;
    })
    setTimeout(() => {
      setIsLoading(false)
      setApiData(array)
    }, 2000)

    // console.log(array); 


  }


  return <APIcontext.Provider value={[ApiData, setApiData]} isLoading={isLoading}>{props.children}</APIcontext.Provider>;
};
