import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// models
import Event from "../../models/event";

// lib
import validateResult from "../../lib/validateResult";

// component
import EventCard from "./EventCard";
import LoadMore from "../commons/LoadMore";

// custom context
import ToastContext from "../../contexts/ToastContext";

interface EventProps {
  data: Event[];
}

const EventList = (props: EventProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const toastError = useContext(ToastContext);

  const [events, setEvents] = useState<Event[]>(props.data);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const isCommunityOwner =
    session && session.user && session.user.is_verified_community_owner;

  const onClickAddEventHandler = () => {
    router.push("/event/add");
  };

  const onLoadMoreClick = async () => {
    const pageParam = page + 1;
    try {
      const result = await fetch(
        "http://localhost:3000/api/events?page=" + pageParam,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // validate result error
      const error = validateResult(result);
      // failed
      if (error != null) {
        throw error;
      }

      // success but BE process failed
      const response = await result.json();
      if (response.status == "FAILED") {
        throw Error(response.message);
      }

      // success
      setEvents((prevState) => {
        const newData = [...prevState, ...response.data];
        return newData;
      });

      // set has next
      setHasNext(response.hasNext);

      // set next page
      setPage(pageParam);
    } catch (e) {
      toastError(e.message);
    }
  };

  const deleteHandler = async (eventId) => {
    try {
      const result = await fetch(
        "http://localhost:3000/api/events/" + eventId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const error = validateResult(result);
      // failed
      if (error != null) {
        throw error;
      }

      // success but BE process failed
      const response = await result.json();
      if (response.status == "FAILED") {
        throw Error(response.message);
      }

      // success
      setEvents((prevState) => {
        const newData = prevState.filter((event) => event.id != eventId);
        return newData;
      });
    } catch (e) {
      toastError(e.message);
    }
  };

  return (
    <div className="flex flex-col space-y-8 my-10 mx-4 md:mx-16 lg:mx-52">
      <div className="flex justify-between">
        <h3 className="text-3xl font-bold text-slate-600">Community Events</h3>
        {isCommunityOwner && (
          <button
            onClick={onClickAddEventHandler}
            type="button"
            className={"flex bg-blue-400 rounded-full px-6 py-2 h-fit"}
          >
            <span className="text-white">Add</span>
          </button>
        )}
      </div>
      {events.length === 0 && (
        <p className="text-slate-500">No data available</p>
      )}
      {events.length > 0 && (
        <ul>
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              location={event.location}
              date={event.date}
              ownerId={event.ownerId}
              deleteHandler={() => {
                deleteHandler(event.id);
              }}
            />
          ))}
        </ul>
      )}
      {hasNext && <LoadMore handleAction={onLoadMoreClick} />}
    </div>
  );
};

export default EventList;
