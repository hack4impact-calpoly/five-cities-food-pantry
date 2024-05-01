import React from "react";
import "./NewClientFields.css";


const NewClientFields = () => {
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
          Birth Date <br></br>
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
