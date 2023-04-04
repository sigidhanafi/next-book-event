import React, { useState, useContext } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

// models
import EventFormModel from "../../models/event_form";

// lib
import validateResult from "../../lib/validateResult";

// custom context
import ToastContext from "../../contexts/ToastContext";

// components
import EventForm from "../../components/events/EventForm";

const EventAddFormPage = () => {
  const router = useRouter();
  const toastError = useContext(ToastContext);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const nameChangeHandler = (name: string) => {
    setName(name);
  };

  const locationChangeHandler = (location: string) => {
    setLocation(location);
  };

  const dateChangeHandler = (date: string) => {
    setDate(date);
  };

  const submitHandler = async () => {
    try {
      const result = await fetch("http://localhost:3000/api/events/", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          location: location,
          date: date,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // validate error result
      const error = validateResult(result);

      if (error != null) {
        throw error;
      }

      const response = await result.json();
      // success but BE process failed
      if (response.status === "FAILED") {
        throw Error(response.message);
      }

      // success
      router.replace("/");
    } catch (e) {
      toastError(e.message);
    }
  };

  const resetHandler = () => {
    router.back();
  };

  const defaultValue = new EventFormModel(name, location, date);

  return (
    <>
      <Head>
        <title>Fun Football</title>
        <meta name="description" content="meet fun team at Fun Footbal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <EventForm
          title={"Add New Event"}
          defaultValue={defaultValue}
          nameChangeHandler={nameChangeHandler}
          locationChangeHandler={locationChangeHandler}
          dateChangeHandler={dateChangeHandler}
          submitHandler={submitHandler}
          resetHandler={resetHandler}
        />
      </main>
    </>
  );
};

export default EventAddFormPage;
