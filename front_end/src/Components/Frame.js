import "./framestyle.css";
import "../Pages/Ahomepage.css";
import Container from "@mui/material/Container";
import {useState} from 'react'
export const Frame = ({ vote, setVote, index }) => {

  const [timer,setTimer] = useState('')


  const options = vote.options
  var sum = 0
  options.map((op) => sum = sum + op.totalvote)


  const enddate = new Date(vote.endDate);

  if(!vote.isUserVoted)
  var interval = setInterval(() => {
    const currentDate = new Date();
  var delta = Math.abs(enddate - currentDate) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60;

  setTimer(days + "D " + hours + "H " + minutes + "M " + seconds.toFixed(0))
  },1000)
  

  return (
    <Container className="single-frame Ahomepage_form inner_form">
      {
        vote.isUserVoted ? "" :
        <h4 style={{ color: "red", textAlign: "center", marginTop: "5rem", fontFamily: "Poppins", fontWeight: "bold", textAlign: "right", marginTop: "0%" }}>Time left : {timer}</h4>
      }

      <h3 className="frame-query">{vote.query}</h3>
      {
        options.map((opt, index) => {


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
                  {/* <div id="progress">
                  <div id="progress-bar" style={{ width: `${((opt[1] / sum) * 100).toFixed(1)}%` }}></div>
                </div> */}
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
  );
};
