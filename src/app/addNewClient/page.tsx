"use client";
import Navbar from "@components/Navbar";
import NewClientFields from "@components/NewClientFields";
import styles from "./addNewClient.module.css";
import { useEffect, useState } from "react";

export default function AddNewClient() {
  const [selectedValue, setSelectedValue] = useState(false);
  const [numChildren, setNumChildren] = useState(0);
  const [numAdults, setNumAdults] = useState(1);
  const [childFields, setChildFields] = useState<JSX.Element[]>([]);
  const [adultFields, setAdultFields] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let fields = [];
    for (let i = 0; i < numChildren; i++) {
      fields.push(
        <div key={i}>
          <h4 className={styles.insideSubheader}> Child {i + 1} </h4>
          <NewClientFields />
        </div>
      );
    }
    setChildFields(fields);

    fields = [];
    for (let i = 1; i < numAdults; i++) {
      fields.push(
        <div key={i}>
          <h4 className={styles.insideSubheader}> Adult {i + 1} </h4>
          <NewClientFields />
        </div>
      );
    }
    setAdultFields(fields);
  }, [numChildren, numAdults]);

  const handleRadioChange = () => {
    setSelectedValue(!selectedValue);
  };

  const handleChildrenChange = (value: any) => {
    setNumChildren(value);
    //console.log(value);
  };

  const handleParentChange = (value: any) => {
    setNumAdults(value);
    //console.log(value);
  };

  return (
    <>
      <Navbar />
      <div>
        <h2 className={styles.header}>Add New Client</h2>
        <h3 className={styles.subheader}> Head of Household Information </h3>
        <NewClientFields />
      </div>
      <div>
        <h3 className={styles.subheader}> Household Information </h3>
        <h4 className={styles.insideSubheader}> Household Size </h4>
        <div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="numAdults">
              Number of Adults
            </label>
            <select
              id="numAdults"
              className={styles.inputBar}
              name="category"
              onChange={(event) => handleParentChange(event.target.value)}
            >
              <option id="1">1</option>
              <option id="2">2</option>
              <option id="3">3</option>
              <option id="4">4</option>
              <option id="5">5</option>
              <option id="6">More than 5</option>{" "}
              {/* drop down menu for num of adults */}
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="numChildren">
              Number of Children
            </label>
            <select
              className={styles.inputBar}
              id="numChildren"
              onChange={(event) => handleChildrenChange(event.target.value)}
            >
              <option id="0">0</option>
              <option id="1">1</option>
              <option id="2">2</option>
              <option id="3">3</option>
              <option id="4">4</option>
              <option id="5">5</option>
              <option id="6">More than 5</option>{" "}
              {/* drop down menu for num of children */}
            </select>
          </div>
        </div>
        {adultFields}
        {childFields}
      </div>
      <div>
        <h4 className={styles.subheader}> Additional Information </h4>
        <div className={styles.radioButton}>
          <input
            type="radio"
            id="option1"
            value="option1"
            checked={selectedValue}
            onClick={handleRadioChange} // handle state with onClick (as opposed to onChange) so users can unclick if they change their minds
            onChange={() => {}} // no-op onChange field to keep react happy - react expects this when checked is controlled
          />

          <label htmlFor="option1" className={styles.radioLabel}>
            Authorize pick-up
          </label>
          {/* for now, the button is set to being checked always */}
        </div>
        <h4 className={styles.insideSubheader}> Authorized pick-up </h4>
        <NewClientFields />
      </div>
      <button className={styles.addButton}> Add Client </button>
    </>
  );
}
