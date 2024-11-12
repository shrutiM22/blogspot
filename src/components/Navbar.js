import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-sky-200 ">
        <div className="flex justify-start px-8 py-4 ">
          <span className="text-2xl text-sky-800 font-bold mr-auto">
            𝙱𝚕𝚘𝚐𝚂𝚙𝚘𝚝
          </span>
          <div className=" flex justify-end ml-auto space-x-8 text-sky-800 font-medium">
            <button
              className="hover:text-sky-500"
              onClick={() => navigate("/addblogs")}
            >
              Add Blog
            </button>
            <button
              className="hover:text-sky-500"
              onClick={() => navigate("/bloglists")}
            >
              View Blog
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
