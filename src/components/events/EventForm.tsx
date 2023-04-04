import React, { FormEvent } from "react";
import { useSession } from "next-auth/react";

// models
import Event from "../../models/event";
import EventFormModel from "../../models/event_form";

interface EventFormProps {
  title: string;
  defaultValue: EventFormModel;
  nameChangeHandler: (name: string) => void;
  locationChangeHandler: (location: string) => void;
  dateChangeHandler: (date: string) => void;
  submitHandler: () => void;
  resetHandler: () => void;
}

const EventForm = (props: EventFormProps) => {
  const { data: session } = useSession();

  const isVerifiedCommunityOwner =
    session && session.user && session.user.is_verified_community_owner;

  const nameChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    props.nameChangeHandler(event.currentTarget.value);
  };

  const locationChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    props.locationChangeHandler(event.currentTarget.value);
  };

  const dateChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    props.dateChangeHandler(event.currentTarget.value);
  };

  return (
    <div className="flex flex-col space-y-8 my-10 mx-4 md:mx-16 lg:mx-52">
      {!isVerifiedCommunityOwner && (
        <div className="flex flex-col space-y-5">
          <h3 className="text-3xl font-bold text-slate-600">Add New Event</h3>
          <p className="text-slate-500">
            You need to be verified as community event to add new event.
          </p>
        </div>
      )}
      {isVerifiedCommunityOwner && props.defaultValue != null && (
        <form className="flex flex-col space-y-5">
          <h3 className="text-3xl font-bold text-slate-600">{props.title}</h3>
          <label className="block">
            <span className="block text-sm font-medium text-slate-500">
              Event Name
            </span>
            <input
              type={"text"}
              onChange={nameChangeHandler}
              placeholder={"Event Name"}
              value={props.defaultValue.name}
              className={
                "block w-full md:w-1/2 px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
              }
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-500">
              Location
            </span>
            <input
              type={"text"}
              onChange={locationChangeHandler}
              placeholder={"Location"}
              value={props.defaultValue.location}
              className={
                "block w-full md:w-1/2 px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
              }
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-500">
              Date
            </span>
            <input
              type={"text"}
              onChange={dateChangeHandler}
              placeholder={"Date"}
              value={props.defaultValue.date}
              className={
                "block w-full md:w-1/2 px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
              }
            />
          </label>
          <div className="flex space-x-2">
            <button
              onClick={props.submitHandler}
              type="button"
              className="bg-blue-400 rounded-full px-6 py-2"
            >
              <span className="text-white">Save</span>
            </button>
            <button
              onClick={props.resetHandler}
              type="button"
              className="bg-gray-400 rounded-full px-6 py-2"
            >
              <span className="text-white">Cancel</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EventForm;
