"use client";
import Image from "next/image";
import style from "./signup.module.css";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // used for navigating the user to a new page

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState(Boolean);
  const [accountExistsMessage, setAccountExistsMessage] = useState(Boolean);
  const router = useRouter(); // router initialization to be able to redirect user to clientPage on successful login

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
    // ! Eventually remove console logs
    console.log(firstname + " " + lastname);
    console.log(email + " " + password);

    // if names not blank, email and password follow correct formatting
    if (validateNamesAndEmailAndPassword()) {
      console.log(
        "inputs valid, now checking db to ensure this account does not exist."
      );
      checkDatabaseAndCreateAccount();
    }

    // Todo: if not valid, prompt user to fix
  };

  const checkDatabaseAndCreateAccount = async () => {
    // make POST request to api route, passing email, password, firstname, lastname to be able to check db

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstname, lastname }),
      });

      const data = await response.json();

      // if account doesn't exist, add account to db, then redirect to login
      // if account does exist, prompt user to login page instead
      if (response.ok) {
        // * account does not exist, adds user document to DB, redirect to login screen
        console.log("Account doesn't exist, creating account.");
        router.push("/loginConfirmationPage"); // navigates user to this path, also need to pass profile object?
      } else {
        // * account does exist, redirect user to login
        console.log("Account Exists Already, Please login.");
        setAccountExistsMessage(true); // prompts user to login instead
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // inputs are valid if not empty & if email follows email formatting & if password is more than 6 characters
  const validateNamesAndEmailAndPassword = (): boolean => {
    console.log("Login Page: validating inputs for formatting.");

    //check if email valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format.");

      setSignupErrorMessage(true); // display error message
      return false;
    }

    //check if password valid
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{6,}$/;
    if (!passwordRegex.test(password)) {
      console.log(
        "Password must be at least 6 characters long and contain only allowed characters."
      );

      setSignupErrorMessage(true); // display error message
      return false;
    }

    // check if first name && last name are not empty
    if (firstname.length == 0 || lastname.length == 0) {
      console.log("First and Last names must be at least 1 character");
      setSignupErrorMessage(true); //display error message
      return false;
    }

    // If all checks pass, return true
    setSignupErrorMessage(false);
    return true;
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
        {signupErrorMessage ? (
          <div className={style.errorMessage}>
            <p>There is an issue login information you entered.</p>
          </div>
        ) : (
          <div className={style.errorMessage}></div>
        )}
        {accountExistsMessage ? (
          <div className={style.existsMessage}>
            <p>
              {`There is already an account associated with this email, consider `}
              <Link href="/login">logging in here</Link>
            </p>
          </div>
        ) : (
          <div className={style.existsMessage}></div>
        )}
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
