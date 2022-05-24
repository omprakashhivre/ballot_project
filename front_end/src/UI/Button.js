import React from "react";
import "./Button.css";

const Button = (props) => {
  var text = props.text;
  var display = props.display;

  return (
    <button type="submit" className="reg_submit">
      <img src={require("../image/plus.png")} width={"30rem"} height={"30rem"} style={{ display }} alt="plus_icon" />
      {text}
    </button>
  );
};

export default Button;
