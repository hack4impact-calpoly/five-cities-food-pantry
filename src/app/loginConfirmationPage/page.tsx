"use client";
import Link from "next/link";
import style from "./loginConfirmationPage.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation"; // used for navigating the user to a new page

export default function LoginConfirmationPage() {
  const router = useRouter(); // router initialization to be able to redirect user to clientPage on successful login

  // runs when the user submits the form
  const handleSubmit = () => {
    router.push("/clientPage"); // redirects to the login page
  };

  return (
    <>
      <div className={style.contentContainer}>
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

        <div className={style.signUpCompleteContainer}>
          <h1 className={style.signUpCompleteHeader}>Sign up complete!</h1>
        </div>

        <div className={style.loginContainer}>
          <button
            type="submit"
            className={style.loginButton}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
