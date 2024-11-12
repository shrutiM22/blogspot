import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl text-sky-800 font-bold mb-4">
        Hi there, Welcome to the Blog Spot!
      </h1>
      <button
        className="bg-sky-700 hover:bg-sky-200 text-white font-bold py-4 px-6 rounded"
        onClick={() => navigate("/bloglists")}
      >
        See Blogs
      </button>
    </div>
  );
};

export default Home;
