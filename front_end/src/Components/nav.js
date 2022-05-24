<<<<<<< HEAD
import "./nav.css";
import { Link } from "react-router-dom";

var Nav = (props) => {
  var logedin;
  var firstName;
  var lastName;
  var ishomepage = false;
  props.homepage === undefined ? (ishomepage = false) : (ishomepage = true);
  props.logedin === undefined ? (logedin = false) : (logedin = true);
  props.firstName === undefined ? (firstName = " ") : (firstName = props.firstName);
  props.lastName === undefined ? (lastName = " ") : (lastName = props.lastName);
  var pp = firstName.split("")[0].toUpperCase() + lastName.split("")[0].toUpperCase();
  return (
    <nav className="navbar-light fluid">
      <div className="display">
        <div className="img-size"></div>
        <span className=" header">Ballot</span>
      </div>
      {logedin ? (
        <div id="imgSpan_wrap">
          {ishomepage ? (
            <Link to={props.homepage[1]} className="logoutSpan">
              {props.homepage[0]}
            </Link>
          ) : (
            <span></span>
          )}
          <span id="profile_pic">{pp}</span>
          <Link to={"/"} className="logoutSpan" onClick={()=>{localStorage.clear()}}>
            <span>logout</span>
          </Link>
        </div>
      ) : (
        <span></span>
      )}
    </nav>
  );
};
export default Nav;

// navbar-expand-lg
// navbar
// container
// navbar-brand
=======
import "./nav.css";
import { Link } from "react-router-dom";

var Nav = (props) => {
  var logedin;
  var firstName;
  var lastName;
  var ishomepage = false;
  props.homepage === undefined ? (ishomepage = false) : (ishomepage = true);
  props.logedin === undefined ? (logedin = false) : (logedin = true);
  props.firstName === undefined ? (firstName = " ") : (firstName = props.firstName);
  props.lastName === undefined ? (lastName = " ") : (lastName = props.lastName);
  var pp = firstName.split("")[0].toUpperCase() + lastName.split("")[0].toUpperCase();
  return (
    <nav className="navbar-light fluid">
      <div className="display">
        <div className="img-size"></div>
        <span className=" header">Ballot</span>
      </div>
      {logedin ? (
        <div id="imgSpan_wrap">
          {ishomepage ? (
            <Link to={props.homepage[1]} className="logoutSpan">
              {props.homepage[0]}
            </Link>
          ) : (
            <span></span>
          )}
          <span id="profile_pic">{pp}</span>
          <Link to={"/"} className="logoutSpan" onClick={()=>{localStorage.clear()}}>
            <span>logout</span>
          </Link>
        </div>
      ) : (
        <span></span>
      )}
    </nav>
  );
};
export default Nav;

// navbar-expand-lg
// navbar
// container
// navbar-brand
>>>>>>> e04605f3a33ec8c101ce1515f3b3e234a3f94fff
