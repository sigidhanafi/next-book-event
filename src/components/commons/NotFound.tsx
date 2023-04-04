import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col space-y-8 my-10 mx-4 md:mx-16 lg:mx-52">
      <div className="flex justify-between">
        <h3 className="text-3xl font-bold text-slate-600">Page Not Found</h3>
      </div>
      <div>
        <p className="text-gray-500">
          404 - The page you are visited is not found. Please back to home page.
        </p>
        <Link href={"/"} className={"text-blue-400"}>
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
