import Head from "next/head";
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";

// lib
import prismaPromise from "../../../lib/prisma";
import { formatToMachineDate } from "../../../lib/formatter";
import { authOptions } from "../../api/auth/[...nextauth]";
import validateResult from "../../../lib/validateResult";

// context
import ToastContext from "../../../contexts/ToastContext";

// models
import Event from "../../../models/event";

// components
import EventForm from "../../../components/events/EventForm";

const EditEventPage = (props: { event: Event }) => {
  const router = useRouter();
  const toastError = useContext(ToastContext);

  const [name, setName] = useState(props.event != null ? props.event.name : "");
  const [location, setLocation] = useState(
    props.event != null ? props.event.location : ""
  );
  const [date, setDate] = useState(props.event != null ? props.event.date : "");

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
      const result = await fetch(
        "http://localhost:3000/api/events/" + props.event.id,
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            location: location,
            date: date,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // validate error
      const error = validateResult(result);

      if (error != null) {
        throw error;
      }

      const response = await result.json();

      if (response.status == "FAILED") {
        throw Error(response.message);
      }

      router.replace("/");
    } catch (e) {
      toastError(e.message);
    }
  };

  const resetHandler = () => {
    router.back();
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
        {props.event == null && (
          <div className="flex flex-col space-y-8 my-10 mx-4 md:mx-16 lg:mx-52">
            <>
              <div className="flex justify-between">
                <h3 className="text-3xl font-bold text-slate-600">
                  Update Event
                </h3>
              </div>
              <p className="text-slate-500">No data available</p>
            </>
          </div>
        )}
        {props.event && (
          <EventForm
            title={"Update " + name}
            defaultValue={{ name: name, location: location, date: date }}
            nameChangeHandler={nameChangeHandler}
            locationChangeHandler={locationChangeHandler}
            dateChangeHandler={dateChangeHandler}
            submitHandler={submitHandler}
            resetHandler={resetHandler}
          />
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const eventId = parseInt(context.query.id);

  let event = null;

  try {
    const result = await prismaPromise.event.findUnique({
      where: { id: eventId },
    });

    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
    if (session && session.user && session.user.id === result.owner_id) {
      event = {
        id: result.id,
        name: result.name,
        location: result.location,
        date: formatToMachineDate(result.date),
      };
    }
  } catch (e) {
    console.log("ERROR Edit Event Page", e);
  }

  return {
    props: {
      event: event,
    },
  };
};

export default EditEventPage;
