import Head from "next/head";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

// component
import LoginForm from "../components/auths/LoginForm";
import PageBanner from "../components/banners/PageBanner";
import { GetServerSideProps } from "next";

const LoginPage = (props: { error: string | null }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const usernameChangeHandler = (username: string) => {
    setUsername(username);
    validateIsValid();
  };

  const passwordChangeHandler = (password: string) => {
    setPassword(password);
    validateIsValid();
  };

  const validateIsValid = () => {
    const isValid = username.length >= 5 && password.length >= 5;
    setIsValid(isValid);
  };

  const loginHandler = async () => {
    if (isValid) {
      const loginData = await signIn("credentials", {
        email: username,
        password: password,
        redirect: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Fun Football</title>
        <meta name="description" content="meet fun team at Fun Footbal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageBanner />
        <LoginForm
          usernameChangeHandler={usernameChangeHandler}
          passwordChangeHandler={passwordChangeHandler}
          loginHandler={loginHandler}
          isValid={isValid}
          error={props.error}
        />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  error: string | null;
}> = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return { redirect: { destination: "/" }, props: { error: null } };
  }

  // check is login has error from BE
  // because we set redirect to true, we need to check url query param
  let error = null;

  if (query && query.error) {
    switch (query.error) {
      case "CredentialsSignin":
        error = "Authentication failed, please check your email & password";
        break;
      default:
        error = "Something went wrong. Please try again";
    }
  }

  return {
    props: {
      error: error,
    },
  };
};

export default LoginPage;
