"use client";
import Link from "next/link";
import style from "./homePage.module.css";
import Image from "next/image";
import Navbar from "../components/Navbar";
import ClientInformationTable from "../components/clientInformationTable";

import { ChangeEvent, useState } from "react";
// import { useRouter } from "next/navigation"; // used for navigating the user to a new page

const clientList = [
  {
    headOfHousehold: "Jane Doe",
    phone: "123-456-7890",
    address: "123 Grand Ave",
    lastVisit: "1/1/2024",
  },
  {
    headOfHousehold: "John Smith",
    phone: "234-567-8901",
    address: "456 Maple St",
    lastVisit: "1/2/2024",
  },
  {
    headOfHousehold: "Alice Johnson",
    phone: "345-678-9012",
    address: "789 Oak Dr",
    lastVisit: "1/3/2024",
  },
  {
    headOfHousehold: "Michael Brown",
    phone: "456-789-0123",
    address: "101 Pine Ln",
    lastVisit: "1/4/2024",
  },
  {
    headOfHousehold: "Emily Davis",
    phone: "567-890-1234",
    address: "202 Birch Rd",
    lastVisit: "1/5/2024",
  },
  {
    headOfHousehold: "David Wilson",
    phone: "678-901-2345",
    address: "303 Cedar Blvd",
    lastVisit: "1/6/2024",
  },
  {
    headOfHousehold: "Sophia Martinez",
    phone: "789-012-3456",
    address: "404 Elm St",
    lastVisit: "1/7/2024",
  },
  {
    headOfHousehold: "James Taylor",
    phone: "890-123-4567",
    address: "505 Fir Trl",
    lastVisit: "1/8/2024",
  },
  {
    headOfHousehold: "Emma Thomas",
    phone: "901-234-5678",
    address: "606 Grove Way",
    lastVisit: "1/9/2024",
  },
  {
    headOfHousehold: "Logan Garcia",
    phone: "012-345-6789",
    address: "707 Hilltop Ter",
    lastVisit: "1/10/2024",
  },
];

export default function HomePage() {
  //   const router = useRouter(); // router initialization to be able to redirect user to clientPage on successful login

  const [searchQuery, setSearchQuery] = useState("");

  // runs when the user makes a search
  const handleSearch = () => {
    console.log("Searching for: ", searchQuery);
  };

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
