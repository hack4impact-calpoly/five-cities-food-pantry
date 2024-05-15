import React from "react";
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
  return (
    <div className="client-profile">
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
          <button className="check-in">Check In</button>
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
          {client.authorizedPickup ? (
            client.authorizedPickup.map((member, index) => (
              <div key={index} className="table-row">
                <div className="members">
                  <p className="details-content">
                    {member.current ? ( // Check if the member has the 'current' attribute
                      <span className="bolded">{member.name}</span>
                    ) : (
                      member.name // Render the name without bold styling if 'current' attribute is not present
                    )}
                  </p>
                </div>
                <div className="age">
                  <p className="details-content">{member.age}</p>
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
