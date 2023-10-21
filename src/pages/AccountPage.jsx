import React, { useState } from "react";
import { UseAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AccountUpdate from "../components/AccountUpdate";

const AccountPage = () => {
  const { user, logOut } = UseAuth();
  const [out, setOut] = useState(false);
  const [update, setUpdate] = useState(false);

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
    <div className="flex flex-col items-center">
      <div className="w-full h-[30vh] relative">
        <div className="w-full h-full absolute bg-black/50"></div>

        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/51fe4262-0740-4943-9021-3cd755ac2bed/MM-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
        <h3 className="text-[2rem] left-[30%] md:left-[43%] absolute top-[40%] mb-2 font-semibold font-caveat px-3">
          My Account
        </h3>
      </div>
      <div className="flex w-[90%] my-5 sm:w-[500px] min-h-[300px] rounded shadow-[1px_2px_2px_#111] border border-[var(--main-color)] bg-[var(--bg-color)] justify-center items-center">
        <div className="text-[1rem] p-1 relative">
          <div className="text-[1.5rem] mb-4 font-semibold font-caveat px-3">
            {user?.email}
          </div>
          <Link to="/favourite">
            <div className="text-[1.2rem] text-center active:scale-[0.9] px-2 mr-1 mb-1 hover:text-[#d79106]/80">
              Favourites
            </div>
          </Link>

          <div
            onClick={() => setUpdate(true)}
            className="text-[1.2rem] text-center active:scale-[0.9] px-2 mr-1 mb-1 hover:text-[#d79106]/80"
          >
            Account Update
          </div>

          <div
            className="text-[1.2rem] text-center active:scale-[0.9] px-2 cursor-pointer mr-1 mb-1 hover:text-[#d79106]/80"
            onClick={() => setOut(true)}
          >
            Log Out
          </div>
          <div
            className={`${
              out ? "scale-100" : "scale-0"
            } border rounded transition-all p-3 absolute left-[-1.8rem] bottom-0 bg-black/90 w-[280px] text-center`}
          >
            <h4 className="whitespace-nowrap mb-3">Please Confirm to LogOut</h4>
            <span
              onClick={() => setOut(false)}
              className="border rounded px-3 py-2 mx-2 cursor-pointer border-[var(--main-color)] hover:text-black/80"
            >
              Cancel
            </span>
            <span
              onClick={handleLogOut}
              className="border rounded px-3 py-2 mx-2 cursor-pointer bg-[var(--main-color)] hover:text-black/80"
            >
              Log Out
            </span>
          </div>
          <AccountUpdate update={update} setUpdate={setUpdate} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
