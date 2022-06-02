import "./framestyle.css";
import "../Pages/Ahomepage.css";
import "../Pages/Ahomepage.css"
import Container from "@mui/material/Container";
import { useState } from 'react'
export const Frame = ({ vote, setVote, index }) => {
  console.log(vote);
  const [timer, setTimer] = useState('')
  const [frameExpired, setFrameExpired] = useState(false)


  const options = vote.option
  var sum = 0
  options.map((op) => sum = sum + parseInt(op.totalvote))


  // const enddate = new Date(vote.endDate);

  // if (!vote.isUserVoted)
  //   setInterval(() => {
  //     const currentDate = new Date();
  //     var delta = Math.abs(enddate - currentDate) / 1000;

  //     // calculate (and subtract) whole days
  //     var days = Math.floor(delta / 86400);
  //     delta -= days * 86400;

  //     // calculate (and subtract) whole hours
  //     var hours = Math.floor(delta / 3600) % 24;
  //     delta -= hours * 3600;

  //     // calculate (and subtract) whole minutes
  //     var minutes = Math.floor(delta / 60) % 60;
  //     delta -= minutes * 60;

  //     // what's left is seconds
  //     var seconds = (delta % 60).toFixed(0);

  //     setTimer(days + "D " + hours + "H " + minutes + "M " + seconds)
  //     if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
  //       setFrameExpired(true)
  //     }
  //   }, 1000)

  if (frameExpired) {
    return (

      <Container className="single-frame Ahomepage_form inner_form">
        {
          vote.isUserVoted ? "" :
            <h4 style={{ color: "red", textAlign: "center", marginTop: "5rem", fontFamily: "Poppins", fontWeight: "bold", textAlign: "right", marginTop: "0%" }}>Time left : {1}</h4>
        }

        <h3 className="frame-query">{vote.query}</h3>
        {
          vote.option.map((opt, index) => {
            return (
              <>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "", padding: "0%" }}>
                  {vote.isUserVoted ? (
                    <>
                      <h5 className="frame-query" style={{ fontSize: "24px", marginRight: "40px" }}>
                        {sum != 0 ? ((opt.totalvote / sum) * 100).toFixed(0) : 0}%
                      </h5>
                    </>
                  ) : (
                    <input type="radio" name="inputoption" value={opt.optionId} style={{ color: "blue", width: "30px", height: "50px", marginRight: "30px" }} />
                  )}

                  <h3 className="frame-query" style={{ fontSize: "32px" }}>
                    {opt.optionName}{" "}
                  </h3>
                  <br></br>
                </div>
                {vote.isUserVoted ? (
                  <>
                    <div className="progress p_inline_bar">
                      <div
                        className="progress-bar inline-progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${sum != 0 ? ((opt.totalvote / sum) * 100).toFixed(0) : 0}%` }}
                      ></div>
                    </div>

                  </>
                ) : (
                  ""
                )}
              </>
            );
          })
        }
        <div style={{ display: "flex", displayDirection: "row" }}>
          <p className="total-votes">Total votes: {sum}</p>
          {
            vote.isUserVoted ? <p style={{ float: "right", marginLeft: "max", color: "red", fontSize: "medium" }}>already voted</p>
              :
              <>
                {/* <p style={{display:"inline-grid",color:"red",fontSize:"20px"}}> query end on :  {vote.endDate}</p> */}
                <button className="button-btn " style={{ float: "right", marginLeft: "30%" }} onClick={() => {
                  try {
                    const choosedoption = document.querySelector('input[name="inputoption"]:checked').value
                    setVote(vote.id, choosedoption)
                  } catch (error) {
                    alert("please choose any option to proceed - " + error)
                  }

                }
                }>Vote</button>
              </>
          }
        </div>
      </Container >
    )
  }
  else {
    return (
      <div className={vote.isexpired ? "inner_form_expired" : "inner_form"} key={vote.id}>
        <h3>{index + 1}) {vote.query}</h3>
        <div style={{ borderRadius: "10px", padding: "10px", backgroundColor: "#d5d6f2" }}>
          {vote.option.map((curr, index) => {

            return (
              <div key={curr.optionId} style={{ backgroundColor: "#d5d6f2", padding: "2px", marginTop: "2px" }}>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "", padding: "0%" }}>
                  {vote.isUserVoted ? (
                    <>
                      <h5 className="frame-query" style={{ fontSize: "24px", marginRight: "40px" }}>
                        {sum != 0 ? ((curr.totalvote / sum) * 100).toFixed(0) : 0}%
                      </h5>
                    </>
                  ) : (
                    <input type="radio" name="inputoption" value={curr.optionId} style={{ color: "blue", width: "30px", height: "50px", marginRight: "30px" }} />
                  )}

                  <h3 className="frame-query" style={{ fontSize: "32px" }}>
                    {curr.optionName}{" "}
                  </h3>
                  <br></br>
                </div>
                {
                  vote.isUserVoted ? 
                    <div className="progress p_inline_bar">
                      <div
                        className="progress-bar inline-progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: ((Math.ceil(curr.totalvote / sum)) * 100) + "%" }}
                      ></div>
                    </div> : ''
                }
              </div>
            );
          })}
        </div>
        <div className="bottom_form">
          <div className="usersPic_voteCount">
            Total vote: {sum}
          </div>
          {
            vote.isUserVoted ? ' ' :
              <>
                {/* <p style={{display:"inline-grid",color:"red",fontSize:"20px"}}> query end on :  {vote.endDate}</p> */}
                <button className="button-btn " style={{ float: "right", marginLeft: "30%" }} onClick={() => {
                  try {
                    const choosedoption = document.querySelector('input[name="inputoption"]:checked').value
                    setVote(vote.id, choosedoption)
                  } catch (error) {
                    console.log( error)
                  }

                }
                }>Vote</button>
              </>
          }
        </div>
      </div>
    );

  }


};
