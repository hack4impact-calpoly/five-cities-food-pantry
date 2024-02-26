"use client";
import Link from "next/link";
import style from "./login.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
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

      <div className={style.infoFormContainer}>
        <div style={{ flex: 1.7 }}></div>
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
          New user? <Link href="">Sign up here</Link>
        </p>
      </div>
    </>
  );
}
