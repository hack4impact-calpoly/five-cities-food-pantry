"use client";
import Navbar from "../components/Navbar";
import styles from "./addNewClient.module.css"
import { useState } from 'react';

export default function AddNewClient() {
const [ 
  selectedValue, 
  setSelectedValue, 
] = useState("option1"); 

const handleRadioChange = (value: any) => { 
  setSelectedValue(value); 
};

const [category, setCategory] = useState('');
const handleCategoryChange = (category: any) => {
  setCategory(category);
  console.log(category);
}

  return (
    <>
      <Navbar />
      <div>
        <h2 className={styles.header}>Add New Client</h2>
        <h3 className={styles.subheader}> Head of Household Information </h3>
          <div>
            <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="first name">
                  First Name
                </label>
                <input className={styles.inputBar}>
                </input>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="last name">
                    Last Name
                </label>
                <input className={styles.inputBar}>
                </input>
            </div> 
          </div>
          <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="date of birth">
              Birth Date
            </label>
            <input className={styles.inputBar}>
            </input>
          </div>
      </div>
      <div>
        <h3 className={styles.subheader}> Household Information </h3>
        <h4 className={styles.insideSubheader}> Household Size </h4>
        <div>
            <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="first name">
                  Number of Adults
                </label>
            <select className={styles.inputBar} name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
              <option id="0" >1</option>
              <option id="1" >2</option>
              <option id="1" >3</option>
              <option id="1" >4</option>
              <option id="1" >5</option>
              <option id="1" >More than 5</option>    {/* drop down menu for num of adults */}
        </select>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="children">
                    Number of Children
                </label>
              <select className={styles.inputBar} name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
              <option id="0" >1</option>
              <option id="1" >2</option>
              <option id="1" >3</option>
              <option id="1" >4</option>
              <option id="1" >5</option>
              <option id="1" >More than 5</option>   {/* drop down menu for num of children */}
             </select>
            </div> 
          </div>
          <h4 className={styles.insideSubheader}> Adult 1 </h4>
          <div>
            <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="first name">
                  First Name
                </label>
                <input className={styles.inputBar}>
                </input>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="last name">
                    Last Name
                </label>
                <input className={styles.inputBar}>
                </input>
            </div> 
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="age">
                    Age
                </label>
                <input className={styles.inputBar}>
                </input>
            </div> 
          </div>
          <h4 className={styles.insideSubheader} > Child 1 </h4>
          <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="age">
                    Age
                </label>
                <input className={styles.inputBar}>
                </input>
            </div> 
        </div>
        <div>
          <h4 className={styles.subheader}> Additional Information </h4>
          <div className={ styles.radioButton}> 
            <input 
              type="radio"
              id="option1"
              value="option1"
              checked={ 
                selectedValue === 
                  "option1"
              } 
              onChange={() => 
                handleRadioChange("option1") 
              } 
              /> 
              <label htmlFor="option1" className={styles.radioLabel }> 
              Authorized 
              </label>      {/* for now, the button is set to being checked always */}
          </div>
          <h4 className={styles.insideSubheader} > Authorized pick-up </h4>
          <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="first name">
                    First Name
                </label>
                <input className={styles.inputBar}>
                </input>
            </div> 
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="last name">
                    Last Name
                </label>
                <input className={styles.inputBar}>
                </input>
            </div> 
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel} htmlFor="age">
                    Age
                </label>
                <input className={styles.inputBar}>
                </input>
            </div> 
        </div> 
        <button className={styles.addButton}> Add Client </button>
    </>
  );
}
