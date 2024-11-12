// Action Types
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const UPDATE_BLOG = "UPDATE_BLOG";

export const addPost = (title, category, context, tags) => ({
  type: ADD_POST,
  payload: { title, category, context, tags },
});
export const deletePost = (index) => ({
  type: DELETE_POST,
  payload: index,
});

export const editPost = (index, title, category, context) => {
  return {
    type: EDIT_POST,
    payload: {
      index: index,
      post: {
        title: title,
        category: category,
        context: context,
      },
    },
  };
};

export const updateBlog = (title, category, context) => ({
  type: UPDATE_BLOG,
  payload: { title, category, context },
});
