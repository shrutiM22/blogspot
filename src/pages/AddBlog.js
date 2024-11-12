import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../state/action/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBlog = () => {
  const [post, setPost] = useState({
    title: "",
    category: "",
    context: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      post.title.trim() === "" ||
      post.category.trim() === "" ||
      post.context.trim() === ""
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Dispatch action to add post
    dispatch(addPost(post.title, post.category, post.context));

    // Reset form and error state
    setPost({ title: "", category: "", context: "" });

    // Show success message
    toast.success("Blog successfully added!");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      } else {
        setPost((prevState) => ({
          ...prevState,
          image: null,
        }));
      }
    } else if (name === "tags") {
      const tagArray = value.split(",").map((tag) => tag.trim());
      setPost((prevState) => ({
        ...prevState,
        tags: tagArray,
      }));
    } else {
      setPost((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const { title, category, context } = post;

  return (
    <>
      <div className="flex justify-between">
        <button
          type="button"
          className="m-1 ml-auto text-sky-700 font-bold py-4 px-6 rounded shadow hover:bg-sky-300 transition-all duration-200"
          onClick={() => navigate("/bloglists")}
        >
          ALL BLOGS
        </button>
      </div>
      <div className="bg-white-100 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className=" lg:grid lg:grid-cols gap-2 p-12 rounded "
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-gray-500 font-bold"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-64 rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <div className="mb-4 ">
            <label
              htmlFor="category"
              className="block mb-2 text-gray-500 font-bold"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="context"
              className="block mb-2 text-gray-500 font-bold"
            >
              Context:
            </label>
            <textarea
              id="context"
              name="context"
              value={context}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-800 text-white font-bold py-2 px-4 rounded shadow hover:bg-green-900 transition-all duration-200"
            >
              POST
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
      />
    </>
  );
};

export default AddBlog;
