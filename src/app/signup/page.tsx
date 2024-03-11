"use client";
import Image from "next/image";
import style from "./signup.module.css";
import { ChangeEvent, useState } from "react";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFNChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  const handleLNChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log(firstname + " " + lastname);
    console.log(email + " " + password);
  };

  return (
    <>
      <div className={style.logo}>
        <Image
          className={style.logoImage}
          src="/logo.png"
          alt=""
          priority={true}
          width={255}
          height={255}
        />
      </div>

      <div className={style.signupContainer}>
        <div style={{ flex: 1 }}></div>
        <form className={style.signupForm}>
          <p className={style.signupTitle}>Sign up</p>

          <div className={style.nameInput}>
            <div className={style.firstNameInput}>
              <label htmlFor="firstname">First Name</label>
              <input
                className={style.entryInput}
                type="text"
                id="firstname"
                onChange={handleFNChange}
              />
            </div>
            <div style={{ flex: 1.5 }}></div>
            <div className={style.lastNameInput}>
              <label htmlFor="lastname">Last Name</label>
              <input
                className={style.entryInput}
                type="text"
                id="lastname"
                onChange={handleLNChange}
              />
            </div>
          </div>

          <label htmlFor="email">Email</label>
          <input
            className={style.entryInput}
            type="email"
            id="email"
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password</label>
          <input
            className={style.entryInput}
            id="password"
            type="password"
            onChange={handlePasswordChange}
          />
        </form>
        <div style={{ flex: 1 }}></div>
      </div>

      <div className={style.buttonContainer}>
        <button 
          type="submit"
          className={style.signupButton}
          onClick={handleSubmit}
        >
          Sign up
        </button>
      </div>
    </>
  );
}
