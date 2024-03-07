import React from "react";
import "./clientDashboard.css"; 

interface HouseholdMember {
  name: string;
  age: number;
  phone?: string;
  address?: string;
  current?: boolean;
}

interface Client {
  name: string;
  authorizedPickup?: HouseholdMember[];
  householdMembers: HouseholdMember[];
  lastVisitDates: string[];
  notes: string[];
}

const client: Client = {
  name: "Jane Doe",
  householdMembers: [
    {
      name: "Jane Doe",
      age: 49,
      phone: "123-456-7890",
      address: "123 Grand Ave, San Luis Obispo, 93405",
      current: true,
    },
    {
      name: "Sam Doe",
      age: 20,
    },
  ],
  authorizedPickup: [
    {
      name: "John Doe",
      age: 35,
    },
  ],
  lastVisitDates: [
    "2/12/2024",
    "1/25/2024",
    "12/2/2023",
    "10/15/2023",
    "7/3/2023",
  ],
  notes: ["received gift card"],
};

const ClientDashboard = () => {
  return (
    <div className="client-profile">
      <div className="top-bar-button">
        <button className="back-button">← Back</button>
      </div>
      <div className="client-info">
        <div className="name-and-button">
          <div className="name-and-icon">
            <h1 className="client-name">{client.name} </h1>
            <svg className="icon">
              <use href="/user-icons.svg#icon-pencil" />
            </svg>
          </div>
          <button className="check-in">Check In</button>
        </div>
        <div className="client-information">
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
          {client.householdMembers.map((member, index) => (
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
              {client.lastVisitDates.map((date, index) => (
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
