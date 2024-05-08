"use client";
import style from "./homePage.module.css";
import Navbar from "../components/Navbar";
import ClientInformationTable from "../components/clientInformationTable";
import { ClientInfo } from "../components/clientInformationTable";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState(""); // * holds the current query
  const [clientList, setClientList] = useState<ClientInfo[]>([]); // State to hold the list of clients
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // * makes a GET request for all of the clients in the database
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

  // * runs when user submits a search bar request
  const handleSearch = (event: any) => {
    event.preventDefault();
    setCurrentPage(1);
    console.log("Searching for: ", searchQuery);
  };

  const filteredClients = clientList.filter(client =>
    client.firstName.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()) ||
    client.lastName.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()) ||
    client.phoneNumber.trim().includes(searchQuery.trim()) ||
    client.address.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
  );

  useEffect(() => {
    const isNoMatch = !!searchQuery && filteredClients.length === 0;
    setErrorMessage(isNoMatch);
    if (searchQuery) setCurrentPage(1);
  }, [filteredClients, searchQuery]);
  
  // * home page main container holds the client search header, add new client button, and search bar,
  // * information table is rendered by calling the clientInformationTable component
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
                  Error: There are no clients that fit the parameters of your search.
                </div>
              )}
            </div>
          </div>
        </div>
        <ClientInformationTable clients={filteredClients} />
      </div>
    </>
  );
}
