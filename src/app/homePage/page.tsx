"use client";
import style from "./homePage.module.css";
import Navbar from "../components/Navbar";
import ClientInformationTable from "../components/clientInformationTable";
import { ClientInfo } from "../components/clientInformationTable";
import { useState, useEffect } from "react";

// * Used to generate dummy list of clients, will be removed when retrieving clientlist from db
// const clientList = Array.from({ length: 62 }, (_, i) => ({
//   headOfHousehold: `Client ${i + 1}`,
//   phone: "111 - 111 - 1111",
//   address: "123 Grand Ave",
//   lastVisit: "4/22/2024",
// }));

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState(""); // * holds the current query
  const [clientList, setClientList] = useState<ClientInfo[]>([]); // State to hold the list of clients

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
  const handleSearch = () => {
    console.log("Searching for: ", searchQuery);
  };

  // * home page main container holds the client search header, add new client button, and search bar,
  // * information table is rendered by calling the clientInformationTable component
  return (
    <>
      <Navbar />
      <div className={style.homePageMainContainer}>
        <div className={style.headerBarContent}>
          <div className={style.upperRow}>
            <button className={style.addNewClientButton}>
              + Add New Client
            </button>
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
            </div>
          </div>
        </div>

        <ClientInformationTable clients={clientList} />
      </div>
    </>
  );
}
