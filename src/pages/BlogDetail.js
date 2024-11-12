import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const { index } = useParams();
  const posts = useSelector((state) => state.blogReducer.posts);
  const post = posts[index];
  const navigate = useNavigate();

  if (!post) {
    return <div>Loading...</div>; // You can replace this with an appropriate loading state
  }
  return (
    <>
      <div className="flex justify-between">
        <button
          onClick={() => navigate("/bloglists")}
          className="ml-4 mt-2 mr-auto p-2 rounded text-blue-700  hover:bg-blue-400 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
            />
          </svg>
        </button>
      </div>
      <div className=" flex justify-center sm:flex-wrap">
        <div className="m-4 p-8 bg-gray-200 rounded-lg shadow-lg bg-white block w-3/4 ">
          <h2 className="text-2xl mb-4 text-center font-bold text-gray-500 title">
            {post.title}
          </h2>
          <div className="tag">
            <span className="text-sm p-2 rounded-lg bg-gray-400 text-white font-bold">
              {post.category}
            </span>
          </div>
          <div className="spacer h-5" />
          <p className="text-lg text-gray-800">{post.context}</p>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
