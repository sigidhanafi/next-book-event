import React from "react";
import { useRouter } from "next/router";

// components
import EventActionButton from "./EventActionButton";

interface EventCardProps {
  id: number;
  name: string;
  location: string;
  date: string;
  ownerId: number;
  deleteHandler: () => void;
}

const EventCard = (props: EventCardProps) => {
  const router = useRouter();

  const onClickDetailEventHandler = () => {
    router.push("/event/" + props.id);
  };

  const onClickUpdateEventHandler = () => {
    router.push("/event/" + props.id + "/edit");
  };

  const onClickDeleteEventHandler = () => {
    props.deleteHandler();
  };

  return (
    <li className="group/item hover:bg-slate-100 p-3 lg:pr-10 rounded-md">
      {/* desktop */}
      <div className="hidden md:flex space-x-6">
        <div className="w-72 h-40 bg-gray-300 rounded-md flex-shrink-0"></div>
        <div className="block">
          <button onClick={onClickDetailEventHandler}>
            <p className="font-semibold text-blue-500">{props.name}</p>
          </button>
          <p className="text-gray-500">{props.location}</p>
          <p className="text-gray-500">{props.date}</p>
          <EventActionButton
            eventOwnerId={props.ownerId}
            updateAction={onClickUpdateEventHandler}
            deleteAction={onClickDeleteEventHandler}
          />
        </div>
      </div>

      {/* mobile */}
      <div className="flex flex-col space-y-4 md:hidden">
        <div className="w-full h-40 bg-gray-300 rounded-md"></div>
        <div>
          <button onClick={onClickDetailEventHandler}>
            <p className="font-semibold text-blue-500">{props.name}</p>
          </button>
          <p className="text-gray-500">{props.location}</p>
          <p className="text-gray-500">{props.date}</p>
          <EventActionButton
            eventOwnerId={props.ownerId}
            updateAction={onClickUpdateEventHandler}
            deleteAction={onClickDeleteEventHandler}
          />
        </div>
      </div>
    </li>
  );
};

export default EventCard;
