import React from "react";
import "./NewClientFields.css";

interface Props {
    isSelf: boolean
}

const NewClientFields = (props: Props) => {
  return (
    <div>
      <div className="inputGroup">
        <label className="inputLabel">
          First Name <br></br>
          <input
            type="text"
            className="inputBar"
            required
          />
        </label>
      </div>
      <div className="inputGroup">
        <label className="inputLabel">
          Last Name <br></br>
          <input
            type="text"
            className="inputBar"
            required
          />
        </label>
      </div>
      <div className="inputGroup">
        <label className="inputLabel">
          {props.isSelf ? "Birth Date": "Age"} <br></br>
          <input
            type="text"
            className="inputBar"
            required
          />
        </label>
      </div>
    </div>
  );
};

export default NewClientFields;
