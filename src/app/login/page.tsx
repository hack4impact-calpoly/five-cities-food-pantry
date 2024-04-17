"use client";
import Link from "next/link";
import style from "./login.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation"; // used for navigating the user to a new page

export default function Login() {
  const [email, setEmail] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState(Boolean);
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize the useRouter hook

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // ! Eventually Remove this console log
    console.log(email + " " + password);

    // check if inputs follow valid email and password formatting. if valid, continue with login process
    if (validateInputs()) {
      console.log("inputs valid, now checking db");
      checkDB();
    }

    // Todo: if not valid, prompt user to fix
  };

  // inputs are valid if not empty, if email follows email formatting, if password is more than 6 characters
  const validateInputs = (): boolean => {
    console.log("Login Page: validating inputs for formatting.");

    //check if email valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format.");

      setLoginErrorMessage(true); // display error message
      return false;
    }

    //check if password valid
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{6,}$/;
    if (!passwordRegex.test(password)) {
      console.log(
        "Password must be at least 6 characters long and contain only allowed characters."
      );

      setLoginErrorMessage(true); // display error message
      return false;
    }

    // If all checks pass, return true
    setLoginErrorMessage(false);
    return true;
  };

  // * this function is only called if the inputs are validated and a properly formatted email/password are inputted by the user
  // ! should this specifically tell the user if the email doesn't exist in the db or if the password doesn't exist? or just provide a general error message
  // ! would that require making two requests? 1 with the email to check and 1 with the password if the email one came back successfuL?
  const checkDB = async () => {
    // make POST request to api route, passing email and password to be able to check db

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // * successful login, navigate to home page and display success message
        router.push("/clientPage"); //navigates user to this path, also need to pass profile object?
        console.log("Success:", data);
      } else {
        // * means the password did not match, or the email did not exist
        console.log("Failure:", data.message);
        setLoginErrorMessage(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

      <div className={style.infoFormContainer}>
        <div style={{ flex: 1.7 }}></div>
        {loginErrorMessage && (
          <div className={style.errorMessage}>
            <p>There is an issue with the email or password you entered.</p>
          </div>
        )}
        <form className={style.infoForm}>
          <label className={style.inputLabel} htmlFor="email">
            Email
          </label>
          <input
            className={style.inputBar}
            id="email"
            type="email"
            onChange={handleEmailChange}
          />
          <label className={style.inputLabel} htmlFor="password">
            Password
          </label>
          <input
            className={style.inputBar}
            id="password"
            type="password"
            onChange={handlePasswordChange}
          />
          <p className={style.forgotPassLink}>
            <Link href="">Forgot Password?</Link>
          </p>
        </form>
        <div style={{ flex: 1.7 }}></div>
      </div>

      <div className={style.loginContainer}>
        <button
          type="submit"
          className={style.loginButton}
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className={style.signUpLink}>
          New user? <Link href="/signup">Sign up here</Link>
        </p>
      </div>
    </>
  );
}
