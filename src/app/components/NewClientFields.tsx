import React, { ChangeEvent } from "react";
import "./NewClientFields.css";

interface Props {
  onAction: (e: ChangeEvent<HTMLInputElement>) => void;
  isClient: boolean;
}

const NewClientFields = ({ onAction, isClient }: Props) => {
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
      {isClient ? (
        <div>
          <div className="inputGroup">
            <label className="inputLabel">
              Email <br></br>
              <input
                type="text"
                name="email"
                className="inputBar"
                onChange={(e) => onAction(e)}
                required
              />
            </label>
          </div>
          <div className="inputGroup">
            <label className="inputLabel">
              Phone Number <br></br>
              <input
                type="text"
                name="phoneNumber"
                className="inputBar"
                onChange={(e) => onAction(e)}
                required
              />
            </label>
          </div>
          <div className="inputGroup">
            <label className="inputLabel">
              Address <br></br>
              <input
                type="text"
                name="address"
                className="inputBar"
                onChange={(e) => onAction(e)}
                required
              />
            </label>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewClientFields;
