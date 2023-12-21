// src/components/Update.js
import React, { useState } from 'react';
import axios from 'axios';

const Update = () => {
  const [postId, setPostId] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');

  const handlePostIdChange = (event) => {
    setPostId(event.target.value);
  };

  const handleUpdatedTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleUpdatePost = async () => {
    try {
      
      await axios.put(`http://localhost:8000/posts/${postId}`, {
        title: updatedTitle,
      });

      
      setPostId('');
      setUpdatedTitle('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h2>Update a Post</h2>
      <div>
        <label htmlFor="postId">Post ID:</label>
        <input
          type="text"
          id="postId"
          value={postId}
          onChange={handlePostIdChange}
        />
      </div>
      <div>
        <label htmlFor="updatedTitle">Updated Title:</label>
        <input
          type="text"
          id="updatedTitle"
          value={updatedTitle}
          onChange={handleUpdatedTitleChange}
        />
      </div>
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
};

export default Update;
