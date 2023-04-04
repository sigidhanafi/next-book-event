import React from "react";

interface PaginationProps {
  current: number;
  total: number;
  take: number;
  previousAction: () => void;
  nextAction: () => void;
}

const Pagination = (props: PaginationProps) => {
  const isPrevDisable = props.current <= 1;
  const isNextDisable = props.total <= props.current * props.take;

  return (
    <div className="flex space-x-6 items-center justify-center">
      <button
        className="bg-blue-400 rounded-md py-1 px-3 disabled:bg-gray-300"
        disabled={isPrevDisable}
        onClick={props.previousAction}
      >
        <span className="text-white">&#60;</span>
      </button>
      <span className="text-blue-400">{props.current}</span>
      <button
        className="bg-blue-400 rounded-md py-1 px-3 disabled:bg-gray-300"
        disabled={isNextDisable}
        onClick={props.nextAction}
      >
        <span className="text-white">&#62;</span>
      </button>
    </div>
  );
};

export default Pagination;
