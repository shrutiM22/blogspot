import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost } from "../state/action/index";

import {
  BsSuitHeart,
  BsSuitHeartFill,
  BsPencil,
  BsTrash,
  BsCheckCircleFill,
  BsXSquare,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogLists = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.blogReducer.posts);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({
    index: null,
    title: "",
    category: "",
    context: "",
  });
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");

  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
    toast.error("Post deleted successfully!", {
      className: "toast-error",
    });
  };

  const handleEditPost = (index) => {
    setEditMode(true);
    const post = posts[index];
    setEditedPost({
      index,
      title: post.title,
      category: post.category,
      context: post.context,
    });
  };

  const handleSaveEdit = () => {
    const { index, title, category, context } = editedPost;
    dispatch(editPost(index, title, category, context));
    setEditMode(false);
    setEditedPost({
      index: null,
      title: "",
      category: "",
      context: "",
    });
    toast.success("Post updated successfully!", {
      className: "toast-success",
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPost({
      index: null,
      title: "",
      category: "",
      context: "",
    });
  };

  const handleToggleLike = (index) => {
    if (likedPosts.includes(index)) {
      setLikedPosts(likedPosts.filter((likedIndex) => likedIndex !== index));
      toast.error("Post unliked!", {
        className: "toast-error",
      });
    } else {
      setLikedPosts([...likedPosts, index]);
      toast.success("Post liked!", {
        className: "toast-success",
      });
    }
  };

  const handleViewPost = (index) => {
    navigate(`/blogs/${index}`);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const allTags = posts.reduce((tags, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
    return tags;
  }, []);

  const filteredPosts =
    selectedTag === "all"
      ? posts
      : posts.filter((post) => post.tags && post.tags.includes(selectedTag));

  return (
    <>
      <div className="flex justify-between">
        <button
          onClick={() => navigate("/")}
          className=" ml-4 mt-2 mr-auto p-2 rounded  text-blue-700 hover:bg-blue-400 transition-all duration-200"
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
      <div>
        <h2 className="text-3xl font-bold m-2 flex justify-center font-karla ">
          Recent Blogs
        </h2>

        <button
          className="bg-sky-200 ml-8 p-4 text-Black-800 font-bold rounded-md block m-3  hover:bg-sky-500 transition-all duration-200"
          onClick={() => navigate("/addblogs")}
        >
          New Post
        </button>
        {filteredPosts && filteredPosts.length > 0 && (
          <div className=" grid-cols-1 sm:grid-cols-2 gap-4 m-4">
            {filteredPosts.map((post, index) => (
              <div
                key={index}
                className="m-4 p-8 bg-gray-200 rounded-md shadow-md bg-white card"
              >
                {editMode && editedPost.index === index ? (
                  <>
                    {Object.entries(editedPost).map(([key, value]) => {
                      return (
                        <input
                          key={key}
                          type="text"
                          value={value}
                          onChange={(e) =>
                            setEditedPost({
                              ...editedPost,
                              [key]: e.target.value,
                            })
                          }
                          className="grid grid-cols-2 gap-4 mb-2 px-8 py-4 rounded border input"
                        />
                      );
                    })}{" "}
                    <br />
                    <button
                      className="m-2 p-3 rounded shadow-sm text-green-600"
                      onClick={handleSaveEdit}
                    >
                      <BsCheckCircleFill size={20} /> Save
                    </button>
                    <button
                      className="m-2  p-3 rounded shadow-sm text-red-600"
                      onClick={handleCancelEdit}
                    >
                      <BsXSquare size={20} /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col text-left">
                      <span className="text-2xl font-bold font-mono text-left text-Black-500 title underline">
                        {post.title}
                      </span>
                      <div className="tag mt-5">
                        <span className="text-sm mt-2 p-2 rounded-md bg-gray-300 text-white font-bold">
                          {post.category}
                        </span>
                      </div>
                      <div className="spacer h-5" />
                      <span className="text-lg text-gray-800">
                        {post.context.length > 100
                          ? `${post.context.slice(0, 100)}...`
                          : post.context}
                      </span>

                      <span>
                        <button
                          className="m-2  p-2 text-red-600 shadow-sm"
                          onClick={() => handleToggleLike(index)}
                        >
                          {likedPosts.includes(index) ? (
                            <BsSuitHeartFill size={20} />
                          ) : (
                            <BsSuitHeart size={20} />
                          )}
                        </button>
                        <button
                          className="m-2 shadow-sm  p-2 rounded-sm  edit-button"
                          onClick={() => handleEditPost(index)}
                        >
                          <BsPencil size={20} />
                        </button>
                        <button
                          className="m-2 shadow-sm  p-2 rounded-sm delete-button"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this post?"
                              )
                            ) {
                              handleDeletePost(index);
                            }
                          }}
                        >
                          <BsTrash size={20} />
                        </button>
                        <button
                          className="bg-sky-600 text-white py-2 px-4 rounded shadow hover:bg-sky-800 transition-all duration-200"
                          onClick={() => handleViewPost(index)}
                        >
                          <span> More...</span>
                        </button>
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </>
  );
};

export default BlogLists;
