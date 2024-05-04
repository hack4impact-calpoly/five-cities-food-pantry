import React, {ChangeEvent} from "react";
import "./NewClientFields.css";
import { Member } from "app/addNewClient/page";

interface Props {
  onAction: (e:  ChangeEvent<HTMLInputElement>) => void;
  
}

const NewClientFields = ({onAction}: Props) => {
  return (
    <div>
      <div className="inputGroup">
        <label className="inputLabel">
          First Name <br></br>
          <input
            type="text"
            name="firstName"
            
            className="inputBar"
            onChange={(e) => onAction(e)}
            required
          />
        </label>
      </div>
      <div className="inputGroup">
        <label className="inputLabel">
          Last Name <br></br>
          <input
            type="text"
            name="lastName"
            //value={member.lastName}
            className="inputBar"
            onChange={(e) => onAction(e)}
            required
          />
        </label>
      </div>
      <div className="inputGroup">
        <label className="inputLabel">
          Birth Date <br></br>
          <input
            type="text"
            name="birthDate"
            //value={member.birthDate}
            className="inputBar"
            onChange={(e) => onAction(e)}
            required
          />
        </label>
      </div>
    </div>
  );
};

export default NewClientFields;
