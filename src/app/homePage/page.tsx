"use client";
import style from "./homePage.module.css";
import Navbar from "../components/Navbar";
import ClientInformationTable from "../components/clientInformationTable";
import { ClientInfo } from "../components/clientInformationTable";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState(""); // holds the current query
  const [clientList, setClientList] = useState<ClientInfo[]>([]); // State to hold the list of clients
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // * initially requests the client list information from the database
  useEffect(() => {
    const getClientDocumentsFromDatabase = async () => {
      try {
        const response = await fetch("/api/clients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched clients:", data); // Check what data actually looks like
        if (response.ok) {
          setClientList(data); // Set the client list if fetch is successful
        } else {
          console.error("Failed to fetch clients");
          setClientList([]);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    getClientDocumentsFromDatabase();
  }, []); // empty dependency array makes effect run once on mount

  // * just prevents default event behavior, all search functionality is conducted when the searchQuery state is updated
  const handleSearch = (event: any) => {
    event.preventDefault();
  };

  // * updated to use .every so that the user can add all the user information into a search:
  // * ex. "f_name l_name", even "f_name l_name phoneNumber", and the result will be returned correctly
  // for each attribute of each client in clientList, if the attr. includes the searchQuery, append to filteredClients
  const filteredClients = clientList.filter((client) => {
    const terms = searchQuery.toLowerCase().trim().split(" ");
    return terms.every(
      (term) =>
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(term) ||
        client.phoneNumber.includes(term) ||
        client.address.toLowerCase().includes(term)
    );
  });

  // add event listeners for the pageNumber update event from the clientInformationTable component (child)
  // update the currentPage of this component to that of the clientInformationTable component
  useEffect(() => {
    const handlePageNumberClick = (event: CustomEvent) => {
      setCurrentPage(event.detail.newPageNumber);
    };

    // Add event listener for the custom event
    window.addEventListener(
      "SendPageNumberToMainPage",
      handlePageNumberClick as EventListener
    );

    // Clean up the event listener
    return () => {
      window.removeEventListener(
        "SendPageNumberToMainPage",
        handlePageNumberClick as EventListener
      );
    };
  }, []); // Add an empty dependency array to run this effect only once

  // triggered every time the searchQuery is updated (each keystroke)
  useEffect(() => {
    // if a search query exists but no clients found, then there is no match
    const isNoMatch = !!searchQuery && filteredClients.length === 0;

    // sets search bar error message if no match is found
    setErrorMessage(isNoMatch);
  }, [filteredClients, searchQuery]);

  // * useful for debugging, but not necessary
  // listens to updates to the currentPage state and logs the currentPage
  useEffect(() => {
    console.log("currentPage Updated within Page.tsx", currentPage);
  }, [currentPage]);

  // home page main container holds the client search header, add new client button, and search bar,
  // information table is rendered by calling the clientInformationTable component
  return (
    <>
      <Navbar />
      <div className={style.homePageMainContainer}>
        <div className={style.headerBarContent}>
          <div className={style.upperRow}>
            <a href="addNewClient" className={style.addNewClientButton}>
              + Add New Client
            </a>
          </div>
          <div className={style.bottomRow}>
            <h1 className={style.pageHeader}>Client Search</h1>
            <div className={style.searchBar}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className={style.searchInput}
                  placeholder="Search client name, number, address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className={style.searchButton}>
                  <svg className={style.icon}>
                    <use href="/user-icons.svg#icon-search-magnifying-glass" />
                  </svg>
                </button>
              </form>
              {errorMessage && (
                <div className={style.errorMessage}>
                  Error: There are no clients that fit the parameters of your
                  search.
                </div>
              )}
            </div>
          </div>
        </div>
        <ClientInformationTable
          parentCurrentPage={currentPage}
          clients={filteredClients}
        />
      </div>
    </>
  );
}
