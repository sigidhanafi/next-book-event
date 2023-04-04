import React from "react";
import { useSession } from "next-auth/react";

interface EventActionButtonProps {
  eventOwnerId: number;
  updateAction: () => void;
  deleteAction: () => void;
}

const EventActionButton = (props: EventActionButtonProps) => {
  const { data: session } = useSession();

  return (
    <div className="block">
      {session && session.user && session.user.id === props.eventOwnerId && (
        <>
          <button
            onClick={props.updateAction}
            className="group/action invisible hover:bg-slate-200 group-hover/item:visible p-3 rounded-xl font-semibold text-gray-600"
          >
            <span className="group-hover/action:text-gray-700">Update</span>
          </button>
          <button
            onClick={props.deleteAction}
            className="group/action invisible hover:bg-slate-200 group-hover/item:visible p-3 rounded-xl font-semibold text-gray-600"
          >
            <span className="group-hover/action:text-gray-700">Delete</span>
          </button>
        </>
      )}
    </div>
  );
};

export default EventActionButton;
