import { FlagIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

export function NotFound404() {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto fill-orange-500" />
        <h1
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </h1>
        <p className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the
          page or come back later.
        </p>
        <NavLink to="/">
          <button className="w-full p-3 md:w-[8rem] bg-orange-500 text-white rounded-lg">
            Back Home
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound404;
