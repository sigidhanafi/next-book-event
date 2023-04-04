import React from "react";

// models
import Transaction from "../../models/transaction";

// components
import TransactionCard from "./TransactionCard";

interface TransactionListProps {
  data: Transaction[];
}

const TransactionList = (props: TransactionListProps) => {
  return (
    <div className="flex flex-col space-y-8 my-10 mx-4 md:mx-16 lg:mx-52">
      <div className="flex justify-between">
        <h3 className="text-3xl font-bold text-slate-600">My Booking</h3>
      </div>
      <ul>
        {props.data.map((transaction) => (
          <TransactionCard data={transaction} key={transaction.id} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
