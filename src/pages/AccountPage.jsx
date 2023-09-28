import React from "react";
import { UseAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AccountPage = () => {
  const { user, logOut } = UseAuth();

  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log("error in logout", error);
    }
  };
  return (
    <div className="flex w-full min-w-[8rem] rounded absolute top-[2.5rem] bg-[var(--bg-color)] justify-center items-center z-50 p-1">
      <ul className="text-[1rem] font-mono p-1">
        <li className="mb-2 font-semibold font-caveat">{user?.email}</li>
        <Link to="/favourite">
          <li className="active:scale-[0.9] px-2 mr-1 mb-1 hover:text-[#d79106]/80">
            Favourites
          </li>
        </Link>
        <Link>
          <li className="active:scale-[0.9] px-2 mr-1 mb-1 hover:text-[#d79106]/80">
            Setting
          </li>
        </Link>
        <li
          className="active:scale-[0.9] px-2 cursor-pointer mr-1 mb-1 hover:text-[#d79106]/80"
          onClick={handleLogOut}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default AccountPage;
