import React from "react";
import "./clientInformationTable.css";
import TableRow from "./tableRow";
import { ChangeEvent, useState } from "react";

type ClientInfo = {
  headOfHousehold: string;
  phone: string;
  address: string;
  lastVisit: string;
};

type ClientInformationTableProps = {
  clients: ClientInfo[];
};

const prepareClients = (clients: ClientInfo[]) => {
  const emptyClient: ClientInfo = {
    headOfHousehold: "",
    phone: "",
    address: "",
    lastVisit: "",
  };

  // TODO : Find a better way to display this error message
  const errorMessageClient: ClientInfo = {
    headOfHousehold: "No Clients Found.",
    phone: "",
    address: "",
    lastVisit: "",
  };

  // no current clients, display error message
  if (clients.length == 0) {
    clients.push();
  }
  // adds empty clients so that 11 total rows will be generated
  if (clients.length > 11) {
    const clientsToAdd = 11 - clients.length;
    for (let i = 0; i < clientsToAdd; i++) {
      clients.push(emptyClient);
    }
  }
};

const calcPages = (clients: ClientInfo[]) => {
  const numberOfPages = clients.length;
  return numberOfPages % 11;
};

const ClientInformationTable: React.FC<ClientInformationTableProps> = ({
  clients,
}) => {
  const [numPages, setNumPages] = useState(calcPages(clients));
  console.log("Num Pages: ", numPages);
  return (
    <div className="tableContainer">
      <div className="tableHeaderRow">
        <p className="info-title">Head of Household</p>
        <p className="info-title">Phone Number</p>
        <p className="info-title">Address</p>
        <p className="info-title">Last Visit</p>
      </div>
      {clients.map((client, index) => (
        <TableRow
          key={index} // It's better to use a unique ID here if available
          headOfHousehold={client.headOfHousehold}
          phone={client.phone}
          address={client.address}
          lastVisit={client.lastVisit}
        />
      ))}
    </div>
  );
};

export default ClientInformationTable;
