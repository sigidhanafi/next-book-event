import React from "react";

// models
import Transaction from "../../models/transaction";

interface TransactionCardProps {
  data: Transaction;
}

const TransactionCard = (props: TransactionCardProps) => {
  return (
    <li className="group/item hover:bg-slate-100 p-3 lg:pr-10 rounded-md">
      {/* desktop */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex space-x-6">
          <div className="flex flex-col">
            <span className="text-gray-500">{props.data.event.date}</span>
            <span className="font-semibold text-blue-500">
              {props.data.event.name}
            </span>
            <span className="text-gray-500">{props.data.event.location}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 font-semibold">Participant</span>
            {props.data.participant &&
              props.data.participant.length >= 1 &&
              props.data.participant.map((participant) => {
                return (
                  <span key={participant.id} className="text-gray-500">
                    {participant.name}
                  </span>
                );
              })}
          </div>
          <div>
            <span className="text-gray-700 font-bold">
              {props.data.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div>
          <button className="group/action invisible hover:bg-slate-200 group-hover/item:visible p-3 rounded-xl font-semibold text-gray-600">
            <span className="group-hover/action:text-gray-700">Detail</span>
          </button>
          <button className="group/action invisible hover:bg-slate-200 group-hover/item:visible p-3 rounded-xl font-semibold text-gray-600">
            <span className="group-hover/action:text-gray-700">Cancel</span>
          </button>
        </div>
      </div>
      {/* end of desktop */}

      {/* mobile */}
      <div className="flex flex-col md:hidden">
        <div>
          <button>
            <p className="font-semibold text-blue-500">
              {props.data.event.name}
            </p>
          </button>
          <p className="text-gray-500">{props.data.event.location}</p>
          <p className="text-gray-500">{props.data.event.date}</p>
          <p className="text-gray-500 font-bold">
            {props.data.status.toUpperCase()}
          </p>
          <div className="block">
            <>
              <button className="group/action invisible hover:bg-slate-200 group-hover/item:visible p-3 rounded-xl font-semibold text-gray-600">
                <span className="group-hover/action:text-gray-700">Detail</span>
              </button>
              <button className="group/action invisible hover:bg-slate-200 group-hover/item:visible p-3 rounded-xl font-semibold text-gray-600">
                <span className="group-hover/action:text-gray-700">Cancel</span>
              </button>
            </>
          </div>
        </div>
      </div>
      {/* end of mobile */}
    </li>
  );
};

export default TransactionCard;
