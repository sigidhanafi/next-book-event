import React from "react";
import Link from "next/link";

interface RegisterFormProps {
  error: string;
  isValid: boolean;
  usernameChangeHandler: (username: string) => void;
  passwordChangeHandler: (password: string) => void;
  registerHandler: () => void;
}

const RegisterForm = (props: RegisterFormProps) => {
  const usernameChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    props.usernameChangeHandler(event.currentTarget.value);
  };

  const passwordChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    props.passwordChangeHandler(event.currentTarget.value);
  };

  const registerHandler = () => {
    props.registerHandler();
  };

  return (
    <div className="flex flex-col space-y-8 my-10 mx-4 md:mx-16 lg:mx-52">
      <form className="flex flex-col space-y-5">
        <h3 className="text-3xl font-bold text-slate-600">Register</h3>
        {props.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <span>{props.error}</span>
          </div>
        )}
        <label className="block">
          <span className="block text-sm font-medium text-slate-500">
            Email / Username
          </span>
          <input
            type={"text"}
            onChange={usernameChangeHandler}
            placeholder={"email / username"}
            className={
              "block w-full md:w-1/3 px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
            }
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-500">
            Password
          </span>
          <input
            type={"password"}
            onChange={passwordChangeHandler}
            placeholder={"password"}
            className={
              "block w-full md:w-1/3 px-3 py-2 bg-white border border-blue-200 rounded-md text-sm placeholder-slate-400 active:border-blue-400 placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-"
            }
          />
        </label>
        <div className="flex space-x-6 items-center">
          <button
            onClick={registerHandler}
            type="button"
            className="bg-blue-400 rounded-full px-6 py-2 text-white disabled:bg-gray-300 disabled:text-gray-500"
            disabled={!props.isValid}
          >
            <span>Register</span>
          </button>
          <Link href={"/login"} className="text-blue-400">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
