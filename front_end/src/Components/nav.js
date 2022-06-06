import "./nav.css";
import { Link } from "react-router-dom";

var Nav = (props) => {
  var isAdmin = localStorage.getItem("userID") == 1 ? true : false;
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
      {isAdmin ?
        <Link to={'/homepage'}><div style={{ display: "inline-flex" }} >
          <div className="img-size">
          </div>
          <span className=" header">Ballot</span>
        </div>
        </Link> :
        <Link to={'/allframes'}><div style={{ display: "inline-flex" }} >
          <div className="img-size">
          </div>
          <span className=" header">Ballot</span>
        </div>
        </Link>
      }
    
      {logedin ? (
        <div id="imgSpan_wrap">
          {/* {ishomepage ? (
            <Link to={props.homepage[1]} className="logoutSpan">
              {props.homepage[0]}
            </Link>
          ) : (
            <span></span>
          )} */}
          <span id="profile_pic">{pp}</span>
          <Link to={"/"} className="logoutSpan" onClick={() => { localStorage.clear() }}>
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
