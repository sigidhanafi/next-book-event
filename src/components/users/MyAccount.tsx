import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

interface MyAccountProps {
  data: User;
}

const MyAccount = (props: MyAccountProps) => {
  return (
    <div className="flex flex-col space-y-8 my-10 mx-4 md:mx-16 lg:mx-52">
      <div className="flex justify-between">
        <h3 className="text-3xl font-bold text-slate-600">My Account</h3>
        <div className="flex space-x-2">
          <Link
            href={"/account"}
            className={"flex bg-blue-400 rounded-full px-6 py-2 h-fit"}
          >
            <span className="text-white">Edit</span>
          </Link>
          <button
            onClick={() => {
              signOut();
            }}
            type="button"
            className={"flex bg-red-400 rounded-full px-6 py-2 h-fit"}
          >
            <span className="text-white">logout</span>
          </button>
        </div>
      </div>
      <div>
        <p className="text-blue-400 font-bold">{props.data.name}</p>
        <p>{props.data.email}</p>
        <p>{props.data.address}</p>
        <p>{props.data.phone}</p>
      </div>
    </div>
  );
};

export default MyAccount;
