"use client";
import Link from "next/link";
import style from "./homePage.module.css";
import Image from "next/image";
import Navbar from "../components/Navbar";

import { ChangeEvent, useState } from "react";
// import { useRouter } from "next/navigation"; // used for navigating the user to a new page

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
      </div>
    </>
  );
}
