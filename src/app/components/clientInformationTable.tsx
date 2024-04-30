import React from "react";
import style from "./clientInformationTable.module.css";
import TableRow from "./tableRow";
import PageNumberNav from "./pageNumberNav";
import { useState, useEffect } from "react";

export type ClientInfo = {
  headOfHousehold: string;
  phoneNumber: string;
  address: string;
  lastVisit: string;
};

type ClientInformationTableProps = {
  clients: ClientInfo[];
};

// * Returns a spliced version of the clientList according to the desired records per page, and currentPage set by the user
const determineClientsIndices = (
  clients: ClientInfo[],
  currentPage: number
) => {
  // * if for some reason the data isn't an array or is empty (solves slice error for empty list as well)
  if (!Array.isArray(clients) || clients.length == 0) {
    clients = [];
  }

  //* determines how many records are shown within a single page of the table, change if needed.
  const recordsPerPage = 11;
  const bottomRange = (currentPage - 1) * recordsPerPage;
  const topRange = currentPage * recordsPerPage;
  console.log("CLIENTS LIST WITHIN DETERMINE: ", clients);

  // * if records on page not exactly 11 (then extra records will need to be added), so call prepare clients
  if (clients.length < topRange) {
    return prepareClients(
      clients.slice(bottomRange, clients.length - 1),
      recordsPerPage
    );
  }
  // * if num records exact multiple, no extra records needed
  else {
    return clients.slice(bottomRange, topRange);
  }
};

// * adds empty client objects to the new client list (does not affect the database) so that each page will render a full table of records
// * otherwise, the final page will have a smaller table, which will look worse visually
const prepareClients = (
  clientList: ClientInfo[],
  recordsPerPage: number
): ClientInfo[] => {
  // * invisible unicode characters included for styling purposes, otherwise, the border-right on each cell will not look correct
  const emptyClient: ClientInfo = {
    headOfHousehold: "­",
    phoneNumber: "­",
    address: "­",
    lastVisit: "­",
  };

  // * adds empty clients to the client side list so a full page of rows will always be generated
  if (clientList.length < recordsPerPage) {
    const clientsToAdd = recordsPerPage - clientList.length;
    for (let i = 0; i < clientsToAdd; i++) {
      clientList.push(emptyClient);
    }
  }
  return clientList;
};

// * calculates the number of pages needed to properly render all records
const calcPages = (clients: ClientInfo[]): number => {
  const recordsPerPage = 11;
  return Math.ceil(clients.length / recordsPerPage);
};

const ClientInformationTable: React.FC<ClientInformationTableProps> = ({
  clients,
}) => {
  //* states defined within component or else error occurs
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState(false);
  const [numPages, setNumPages] = useState(0);

  // * useEffect handles the event that bubbles up from the pageNav component as well as setting the error message state
  useEffect(() => {
    const handlePageNumberClick = (event: CustomEvent) => {
      setCurrentPage(event.detail.pageNumber);
    };

    // * updates the number of pages state
    setNumPages(calcPages(clients));

    // ! Is there a scenario where the error message is set to true, client list then becomes not empty, but error message isn't reset?
    setErrorMessage(clients.length === 0);

    // Add event listener for the custom event
    window.addEventListener(
      "PageNumberClicked",
      handlePageNumberClick as EventListener
    );

    // Clean up the event listener
    return () => {
      window.removeEventListener(
        "PageNumberClicked",
        handlePageNumberClick as EventListener
      );
    };
  }, [clients]);

  // * an error message is conditionally rendered if the initial client list is empty
  // * within tableHeaderRow: generates the titles for each column of table
  // * determineClientIndices is called on the clients list to render the correct rows according to the page
  // * pageNumberNav component is included below the table to allow for switching of pages
  return (
    <div className={style.tableContainer}>
      {errorMessage && (
        <div className={style.errorMessage}>
          Error: There are no clients associated with this user.
        </div>
      )}
      <div className={style.tableHeaderRow}>
        <p className={style.infoTitle}>Head of Household</p>
        <p className={style.infoTitle}>Phone Number</p>
        <p className={style.infoTitle}>Address</p>
        <p className={style.infoTitle}>Last Visit</p>
      </div>
      {determineClientsIndices(clients, currentPage)?.map((client, index) => (
        <TableRow
          key={index} // It's better to use a unique ID here if available
          headOfHousehold={client.headOfHousehold}
          phoneNumber={client.phoneNumber}
          address={client.address}
          lastVisit={client.lastVisit}
        />
      ))}
      <PageNumberNav numPages={numPages} />
    </div>
  );
};

export default ClientInformationTable;
