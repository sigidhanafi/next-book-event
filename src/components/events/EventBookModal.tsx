import React, { ChangeEvent, ChangeEventHandler } from "react";
import { useState } from "react";

// model
import ParticipantForm from "../../models/participant_form";

interface EventBookModalProps {
  showModal: boolean;
  cancelAction: () => void;
  confirmAction: (participants: ParticipantForm[]) => void;
}

const EventBookModal = (props: EventBookModalProps) => {
  const [participants, setParticipants] = useState([
    { name: "", email: "", phone: "" },
  ]);

  const resetForm = () => {
    setParticipants([{ name: "", email: "", phone: "" }]);
  };

  const handleOnClicPlusForm = () => {
    setParticipants((prevState) => {
      const data = [...prevState, { name: "", email: "", phone: "" }];
      return data;
    });
  };

  const handleOnChangeValue = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setParticipants((prevState) => {
      const data = [...prevState];
      data[index][event.target.name] = event.target.value;

      return data;
    });
  };

  const handleOnCancelClick = () => {
    resetForm();
    props.cancelAction();
  };

  const handleOnBookClick = () => {
    props.confirmAction(participants);
  };

  return (
    <>
      {props.showModal && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black/[0.5]">
          <div>
            <div className="rounded-lg shadow-lg flex flex-col w-full bg-white">
              <div className="flex items-center justify-between space-x-5 p-5 border-b border-solid border-gray-300">
                <h3 className="text-3xl text-slate-600 font-bold">
                  Booking Event
                </h3>
              </div>

              {/* Desktop */}
              <div className="hidden md:flex md:flex-col space-y-5 p-5 justify-center items-center">
                {participants.map((participant, index) => {
                  return (
                    <div key={index} className={"flex flex-row space-x-5"}>
                      <h3>RSVP {index + 1}</h3>
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-500">
                          Name
                        </span>
                        <input
                          name={"name"}
                          type={"text"}
                          onChange={(event) =>
                            handleOnChangeValue(event, index)
                          }
                          placeholder={"name"}
                          className={
                            "block w-full px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
                          }
                          value={participant.name}
                          autoComplete={"off"}
                        />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-500">
                          Email
                        </span>
                        <input
                          name={"email"}
                          type={"text"}
                          onChange={(event) =>
                            handleOnChangeValue(event, index)
                          }
                          placeholder={"email"}
                          className={
                            "block w-full px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
                          }
                          value={participant.email}
                          autoComplete={"off"}
                        />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-500">
                          Phone Number
                        </span>
                        <input
                          name={"phone"}
                          type={"text"}
                          onChange={(event) =>
                            handleOnChangeValue(event, index)
                          }
                          placeholder={"phone number"}
                          className={
                            "block w-full px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
                          }
                          value={participant.phone}
                          autoComplete={"off"}
                        />
                      </label>
                      {index === participants.length - 1 && (
                        <button
                          type="button"
                          className="bg-blue-400 rounded-full w-10 h-10 mt-4"
                          onClick={handleOnClicPlusForm}
                        >
                          <span className="text-white">+</span>
                        </button>
                      )}
                      {index !== participants.length - 1 && (
                        <div className="w-10 h-10 mt-4"></div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* end desktop */}

              {/* mobile */}
              <div className="flex flex-col md:hidden space-y-5 p-5">
                {participants.map((participant, index) => {
                  return (
                    <div key={index} className={"flex flex-col space-y-5"}>
                      <h3>RSVP 1</h3>
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-500">
                          Name
                        </span>
                        <input
                          type={"text"}
                          onChange={(event) => {
                            handleOnChangeValue(event, index);
                          }}
                          value={participant.name}
                          placeholder={"name"}
                          className={
                            "block w-full px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
                          }
                        />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-500">
                          Email
                        </span>
                        <input
                          type={"text"}
                          onChange={(event) => {
                            handleOnChangeValue(event, index);
                          }}
                          value={participant.email}
                          placeholder={"email"}
                          className={
                            "block w-full px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
                          }
                        />
                      </label>
                      <label className="block">
                        <span className="block text-sm font-medium text-slate-500">
                          Phone Number
                        </span>
                        <input
                          type={"text"}
                          onChange={(event) => {
                            handleOnChangeValue(event, index);
                          }}
                          value={participant.phone}
                          placeholder={"phone number"}
                          className={
                            "block w-full px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
                          }
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
              {/* end mobile */}

              <div className="flex flex-col items-end">
                <div className="flex space-x-2 p-5">
                  <button
                    onClick={handleOnBookClick}
                    type="button"
                    className="bg-blue-400 rounded-full px-6 py-2"
                  >
                    <span className="text-white">Book</span>
                  </button>
                  <button
                    onClick={handleOnCancelClick}
                    type="button"
                    className="bg-gray-400 rounded-full px-6 py-2"
                  >
                    <span className="text-white">Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventBookModal;
