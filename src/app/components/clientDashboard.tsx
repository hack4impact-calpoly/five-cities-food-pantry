import React, { useState, useEffect } from "react";
import "./clientDashboard.css";
import iClient from "../../database/clientSchema";
import HouseholdMember from "../../database/householdMemberSchema";

interface ClientDashboardProps {
  client: iClient;
}

/**
 * Calculates the age based on the provided birthdate.
 * @param {Date} birthDate - The birthdate of the client.
 * @returns {number} The age of the client in years.
 */
function calculateAge(birthDate: Date): string {
  if (typeof birthDate === "string") {
    birthDate = new Date(birthDate);
  }

  const today: Date = new Date();
  let age: number = today.getFullYear() - birthDate.getFullYear();
  const monthDifference: number = today.getMonth() - birthDate.getMonth();

  // Check if the birthdate has not occurred yet this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age.toString();
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ client }) => {
  const [checkedInState, setCheckedInState] = useState(client.isCheckedOff);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Update the checkedInState when the component mounts
  useEffect(() => {
    console.log(
      "client.checkedInState on load, setting checkedInState to this value: ",
      client.isCheckedOff
    );
    setCheckedInState(client.isCheckedOff);
  }, [client.isCheckedOff]);

  /**
   * Fired when the user clicks on the "Check In" or "Checked In" buttons.
   *
   * @param event : the button submit event
   *
   * If the user clicks the button when the checkedInState is false, this function:
   * 1. calls the appropriate function to make a PUT request to the database, updating the "isCheckedOff" state of the current client to "true".
   * 2. If the call is successful (meaning the db state is updated), then update the local state within this component.
   * 3. If the call is not successful, display an error message
   *
   * If the user clicks when the checkedInState is true, this function:
   * 1. will trigger the dialog/modal popup to appear to prompt the user to confirm their choice of checking out the user.
   *
   *
   */
  const checkInUser: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    console.log("checkedInUser called because user clicked check in button");
    if (checkedInState) {
      setIsDialogOpen(true);
    }

    if (!checkedInState) {
      const isSuccess = await updateClientIsCheckedStateInDatabase(true);

      if (isSuccess) {
        console.log("user successfully checked in, updating the state locally");
        // * if successfully checked in
        setCheckedInState(true);
      } else {
        console.log("There was an error when checking the user in");
        // TODO : error message
      }
    }
  };

  /**
   * Updates the client's "isCheckedOff" state in the database via a PUT request.
   *
   * @param {boolean} clientState - The new state to update the client's "isCheckedOff" attribute to.
   * @returns {Promise<boolean>} - Returns a boolean indicating whether the update was successful.
   *
   * This function:
   * 1. Sends a PUT request to the backend to update the "isCheckedOff" attribute of the client document.
   * 2. If the update is successful, sets the local state `checkedInState` to the provided `clientState`.
   * 3. Returns `true` if the update was successful, and `false` otherwise.
   *
   * Note: Error messages should not be displayed directly from this function. Instead, the boolean promise returned
   * can be used by the calling functions to handle success or error scenarios appropriately.
   */
  const updateClientIsCheckedStateInDatabase = async (
    clientState: boolean
  ): Promise<boolean> => {
    try {
      const response = await fetch(`/api/clients/check-in/${client._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCheckedOff: clientState }),
      });

      if (response.ok) {
        console.log(
          "the user was checked in or out successfully from the database!, now updating the local client state"
        );
        const result = await response.json();
        setCheckedInState(clientState);
        return true; // Indicate success
      } else {
        console.error("Check-in failed:", response.statusText);
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return false; // Indicate failure
    }
  };

  /**
   * Handles the confirmation of checking out the client from the modal popup.
   *
   * This function:
   * 1. Calls `updateClientIsCheckedStateInDatabase` to update the 'isCheckedOff' state in the database.
   * 2. If the update is successful, updates the local `checkedInState` to `false` and closes the dialog.
   * 3. If the update fails, does not change the local state and is intended to display an error message (to be implemented).
   *
   */
  const handleDialogConfirmCheckout = async () => {
    // Post to client updating the checkedIn to false, set success/error banner, update button text to "Check In"
    const isSuccess = await updateClientIsCheckedStateInDatabase(false);

    // * if user is successfully checked out, update state to be 'checked out' locally
    if (isSuccess) {
      console.log("client checked out successfully");
      setCheckedInState(false);
      setIsDialogOpen(false);
    } else {
      // TODO : Display error message
    }
  };

  /**
   * Handles the cancellation of checking out the client from the modal popup.
   *
   * This function:
   * 1. Closes the dialog/modal popup.
   * 2. Does not update any states.
   *
   */
  const handleDialogCancelCheckout = () => {
    console.log("checkout cancelled, dialog box closed");
    setIsDialogOpen(false);
  };

  return (
    <div className="client-profile">
      {checkedInState && (
        <div className="checkedInBanner">
          <p>
            {`${client.firstName} ${client.lastName}`} is currently checked in
          </p>
        </div>
      )}
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-modal">
            <h3 className="confirmMessage">Please Confirm.</h3>
            <p>
              Are you sure you want to check <br></br>
              <span className="bolded">{`${client.firstName} ${client.lastName}`}</span>{" "}
              out?
            </p>
            <div className="buttonsHolder">
              <button
                className="dialogButton checkOutUser"
                onClick={handleDialogConfirmCheckout}
              >
                Check Client Out
              </button>
              <button
                className="dialogButton cancelCheckOutUser"
                onClick={handleDialogCancelCheckout}
              >
                Don&apos;t Check Out
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="top-bar-button">
        <button className="back-button">← Back</button>
      </div>
      <div className="client-info">
        {/* Top Bar Holds the Client Name and Check In Button. */}
        <div className="name-and-button">
          <div className="name-and-icon">
            <h1 className="client-name">
              {`${client.firstName} ${client.lastName}`}
            </h1>
            <svg className="icon">
              <use href="/user-icons.svg#icon-pencil" />
            </svg>
          </div>
          {checkedInState ? (
            <button onClick={checkInUser} className="check-in backgroundGreen">
              Checked In
            </button>
          ) : (
            <button onClick={checkInUser} className="check-in">
              Check In
            </button>
          )}
        </div>
        <div className="client-information">
          {/* Table-Header holds the row with the table titles: members, age, phone #, address */}
          <div className="table-header">
            <div className="members">
              <h3 className="details-header">Household Member(s)</h3>
            </div>
            <div className="age">
              <h3 className="details-header">Age</h3>
            </div>
            <div className="phone-number">
              <h3 className="details-header">Phone Number</h3>
            </div>
            <div className="address">
              <h3 className="details-header">Address</h3>
            </div>
          </div>
          {/* Generate a Single Row for the client who is also the head of household in this scenario */}
          <div className="table-row">
            <div className="members">
              <p className="details-content">
                <span className="bolded">
                  {client.firstName} {client.lastName}
                </span>
              </p>
            </div>
            <div className="age">
              <p className="details-content">
                {calculateAge(client.birthDate)}
              </p>
            </div>
            <div className="phone-number">
              <p className="details-content">{client.phoneNumber}</p>
            </div>
            <div className="address">
              <p className="details-content">{client.address}</p>
            </div>
          </div>
          {/* Generates a Table Row for each household member */}
          {client.householdMem.map((member: HouseholdMember, index: number) => (
            <div key={index} className="table-row">
              <div className="members">
                <p className="details-content">
                  {member.current ? ( // Check if the member has the 'current' attribute
                    <span className="bolded">
                      `${member.firstName} ${member.lastName}`
                    </span>
                  ) : (
                    `${member.firstName} ${member.lastName}` // Render the name without bold styling if 'current' attribute is not present
                  )}
                </p>
              </div>
              <div className="age">
                <p className="details-content">
                  {calculateAge(member.birthDate)}
                </p>
              </div>
              <div className="phone-number">
                <p className="details-content">{member.phone}</p>
              </div>
              <div className="address">
                <p className="details-content">{member.address}</p>
              </div>
            </div>
          ))}
          <div className="table-header-pickup">
            <div className="members">
              <h3 className="details-header">Authorized Pickup</h3>
            </div>
          </div>
          {client.authMem ? (
            client.authMem.map((member, index) => (
              <div key={index} className="table-row">
                <div className="members">
                  <p className="details-content">
                    {member.current ? ( // Check if the member has the 'current' attribute
                      <span className="bolded">
                        `${member.firstName} ${member.lastName}`
                      </span>
                    ) : (
                      `${member.firstName} ${member.lastName}` // Render the name without bold styling if 'current' attribute is not present
                    )}
                  </p>
                </div>
                <div className="age">
                  <p className="details-content">
                    {calculateAge(member.birthDate)}
                  </p>
                </div>
                <div className="phone-number">
                  <p className="details-content">{member.phone}</p>
                </div>
                <div className="address">
                  <p className="details-content">{member.address}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="table-row-empty"></div>
          )}
        </div>
        <div className="history-and-notes-container">
          <div className="client-history">
            <h3 className="history-header">Last Visit Date(s)</h3>
            <div className="history-content">
              {client.entryDates.map((date, index) => (
                <p key={index} className="visit-date">
                  {date}
                </p>
              ))}
            </div>
          </div>
          <div className="client-notes">
            <h3 className="notes-header">Notes</h3>
            <ul className="notes-content">
              {client.notes.map((note, index) => (
                <li key={index}>
                  <p className="note">{note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
