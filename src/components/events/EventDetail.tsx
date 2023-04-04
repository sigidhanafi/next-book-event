import React, { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// models
import Event from "../../models/event";
import Participant from "../../models/participant_form";

// custom context
import ToastContext from "../../contexts/ToastContext";

// lib
import validateResult from "../../lib/validateResult";

// components
import EventBookModal from "./EventBookModal";

interface EventDetailProps {
  data: Event;
}

const EventDetail = (props: EventDetailProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const toastError = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);

  const isOwner =
    props.data &&
    session &&
    session.user &&
    session.user.id === props.data.ownerId;

  const handlerBookOnClick = () => {
    setShowModal(true);
  };

  const handlerBookCancelOnClick = () => {
    setShowModal(false);
  };

  const handlerBookConfirm = async (participants: Participant[]) => {
    try {
      const result = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        body: JSON.stringify({
          event_id: props.data.id,
          participants: participants,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const error = validateResult(result);
      if (error) {
        throw error;
      }

      const response = await result.json();
      if (response.status == "FAILED") {
        throw Error(response.message);
      }

      // success back to prev page
      router.back();
    } catch (e) {
      setShowModal(false);
      toastError(e.message);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-8 py-10 mx-4 md:mx-16 lg:mx-52">
        <div className="flex justify-between">
          <h3 className="text-3xl font-bold text-slate-600">Detail Event</h3>
          {props.data && !isOwner && session && (
            <button
              onClick={handlerBookOnClick}
              type="button"
              className={"flex bg-blue-400 rounded-full px-6 py-2 h-fit"}
            >
              <span className="text-white">Book Event</span>
            </button>
          )}
        </div>
        {/* desktop */}
        <div className="hidden md:flex space-x-6">
          <div className="w-1/2 h-96 bg-gray-300 rounded-md"></div>
          <div className="">
            {props.data && (
              <div>
                <p className="font-semibold text-blue-500">{props.data.name}</p>
                <p className="text-gray-500">{props.data.location}</p>
                <p className="text-gray-500">{props.data.date}</p>
              </div>
            )}
            {!props.data && <p className="text-slate-500">No data available</p>}
          </div>
        </div>

        {/* mobile */}
        <div className="flex flex-col md:hidden space-y-4">
          <div className="w-full h-40 bg-gray-300 rounded-md"></div>
          <div className="">
            {props.data && (
              <div>
                <p className="font-semibold text-blue-500">{props.data.name}</p>
                <p className="text-gray-500">{props.data.location}</p>
                <p className="text-gray-500">{props.data.date}</p>
              </div>
            )}
            {!props.data && <p className="text-slate-500">No data available</p>}
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <EventBookModal
        showModal={showModal}
        confirmAction={handlerBookConfirm}
        cancelAction={handlerBookCancelOnClick}
      />
      {/* End of Modal Form */}
    </>
  );
};

export default EventDetail;
