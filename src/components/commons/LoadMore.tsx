import React from "react";

interface LoadMoreProps {
  handleAction: () => void;
}

const LoadMore = (props: LoadMoreProps) => {
  return (
    <div className="flex items-center justify-center">
      <button
        className=" bg-blue-100 border-blue-200 border px-4"
        onClick={props.handleAction}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMore;
