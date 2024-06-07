import React, { useState, useEffect } from "react";
import style from "./clientInformationTable.module.css";
import TableRow from "./tableRow";
import PageNumberNav from "./pageNumberNav";

export type ClientInfo = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  entryDates: Date[];
  isFlagged: boolean;
  flagNotes: string;
};

type ClientInformationTableProps = {
  clients: ClientInfo[];
  parentCurrentPage: number;
};

// * Returns a spliced version of the clientList according to the desired records per page, and currentPage set by the user
const determineClientsIndices = (
  clients: ClientInfo[],
  currentPage: number
) => {
  // * if for some reason the data isn't an array or is empty (solves slice error for empty list as well)
  if (!Array.isArray(clients) || clients.length === 0) {
    clients = [];
  }

  //* determines how many records are shown within a single page of the table, change if needed.
  const recordsPerPage = 11;
  const bottomRange = (currentPage - 1) * recordsPerPage;
  const topRange = currentPage * recordsPerPage;

  // * if records on page not exactly 11 (then extra records will need to be added), so call prepare clients
  if (clients.length < topRange) {
    return prepareClients(
      clients.slice(bottomRange, clients.length),
      recordsPerPage
    );
  } else {
    // * if num records exact multiple, no extra records needed
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
    _id: "",
    firstName: "­",
    lastName: "",
    phoneNumber: "­",
    address: "­",
    entryDates: [],
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
  parentCurrentPage,
}) => {
  //* states defined within component or else error occurs
  const [currentPage, setCurrentPage] = useState(parentCurrentPage);
  const [errorMessage, setErrorMessage] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [clientList, setClientList] = useState<ClientInfo[]>([]);

  // * Syncs page state with with the parent component (page.tsx)
  useEffect(() => {
    setCurrentPage(parentCurrentPage);
  }, [parentCurrentPage]);

  // * Sync client state with parent component (page.tsx), and handles updating page #
  useEffect(() => {
    setClientList(clients);

    // * how many pages should be rendered based on (possibly new) # of clients
    const totalNumPages = calcPages(clients);
    setNumPages(totalNumPages);

    // * if the current page is greater than the number of pages calculated, current Page should be set to the total number of pages
    // * also check if clients.length is 0 to prevent this logic from running before the client list is retrieeved from the db
    if (currentPage > totalNumPages && clients.length != 0) {
      setCurrentPage(totalNumPages);
      const newEvent = new CustomEvent("SendPageNumberToMainPage", {
        detail: { newPageNumber: totalNumPages },
      });
      window.dispatchEvent(newEvent);
    }

    setErrorMessage(clients.length === 0);
  }, [clients]);

  // * handles page number click event from pageNumberNav
  const handlePageNumberClick = (event: CustomEvent) => {
    const newPageNumber = event.detail.pageNumber;
    setCurrentPage(newPageNumber);

    // * creates an event that bubbles up to page.tsx to change which range of records is shown (based on selected page)
    const newEvent = new CustomEvent("SendPageNumberToMainPage", {
      detail: { newPageNumber },
    });

    window.dispatchEvent(newEvent);
  };

  // * add event listeners to listen for PageNumberClicked from pageNumberNav (child component)
  useEffect(() => {
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
  }, []);

  // * an error message is conditionally rendered if the initial client list is empty
  // * within tableHeaderRow: generates the titles for each column of table
  // * determineClientIndices is called on the clients list to render the correct rows according to the page
  // * pageNumberNav component is included below the table to allow for switching of pages
  return (
    <div className={style.tableContainer}>
      <div className={style.tableHeaderRow}>
        <p className={style.infoTitle}>Head of Household</p>
        <p className={style.infoTitle}>Phone Number</p>
        <p className={style.infoTitle}>Address</p>
        <p className={style.infoTitle}>Last Visit</p>
      </div>
      {determineClientsIndices(clients, currentPage)?.map((client, index) => (
        <TableRow
          key={index} // It's better to use a unique ID here if available
          clientId={client._id}
          headOfHousehold={`${client.firstName} ${client.lastName}`}
          phoneNumber={client.phoneNumber}
          address={client.address}
          entryDates={client.entryDates} // need to fix and calculate
          isFlagged={client.isFlagged}
        />
      ))}
      {errorMessage && (
        <div className={style.errorMessage}>
          Error: There are no clients associated with this user.
        </div>
      )}
      <PageNumberNav parentCurrentPage={currentPage} numPages={numPages} />
    </div>
  );
};

export default ClientInformationTable;
