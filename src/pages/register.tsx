import React, { use, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";

// lib
import { authOptions } from "./api/auth/[...nextauth]";
import validateResult from "../lib/validateResult";

// component
import RegisterForm from "../components/auths/RegisterForm";
import PageBanner from "../components/banners/PageBanner";

const RegisterPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(null);

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

  const registerHandler = async () => {
    if (isValid) {
      try {
        const result = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            email: username,
            password: password,
            name: "John Do",
            address: "Jl address nomor 20 Kelurahan, Kecamatan, Kota, Provinsi",
            phone: "085xxxxxxxx",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // validate result
        const error = validateResult(result);

        // failed
        if (error != null) {
          throw error;
        }

        const response = await result.json();

        // success but BE process failed
        if (response.status == "FAILED") {
          setError(response.message);
        }

        // success
        router.replace("/login");
      } catch (e) {
        setError(e.message);
      }
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
        <RegisterForm
          usernameChangeHandler={usernameChangeHandler}
          passwordChangeHandler={passwordChangeHandler}
          registerHandler={registerHandler}
          isValid={isValid}
          error={error}
        />
      </main>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
