"use client";
import Link from "next/link";
import style from "./login.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation"; // used for navigating the user to a new page

export default function Login() {
  const [email, setEmail] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState(Boolean);
  const [errorMessageContent, setErrorMessageContent] = useState("");

  const [password, setPassword] = useState("");
  const router = useRouter(); // router initialization to be able to redirect user to clientPage on successful login

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // runs when the user submits the form
  const handleSubmit = () => {
    // check if inputs follow valid email and password formatting. if valid, continue with login process
    if (validateEmailAndPassword()) {
      checkCredentialsInDB();
    }
  };

  // inputs are valid if not empty & if email follows email formatting & if password is more than 6 characters
  const validateEmailAndPassword = (): boolean => {
    //check if email valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessageContent(
        "Please ensure your email follows standard format."
      );
      setLoginErrorMessage(true); // display error message
      return false;
    }

    //check if password valid
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+=-]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessageContent(
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
  const checkCredentialsInDB = async () => {
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
        router.push("/clientPage"); // navigates user to this path, also need to pass profile object?
      } else {
        // * means the password did not match, or the email did not exist, show error message
        setErrorMessageContent(
          "There was an error with your login credentials, please try again."
        );
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
            <p>{errorMessageContent}</p>
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
