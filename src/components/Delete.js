// src/components/Delete.js
import React, { useState } from 'react';
import axios from 'axios';

const Delete = () => {
  const [postId, setPostId] = useState('');

  const handlePostIdChange = (event) => {
    setPostId(event.target.value);
  };

  const handleDeletePost = async () => {
    try {
      // Send a DELETE request to remove the post
      await axios.delete(`http://localhost:8000/posts/${postId}`);

      // Optionally, you can fetch the updated list of posts after deleting one
      // You can do this by calling the fetchData function from the Read component or use a global state management solution.

      // Clear the input field after deleting a post
      setPostId('');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Delete a Post</h2>
      <div>
        <label htmlFor="postId">Post ID:</label>
        <input
          type="text"
          id="postId"
          value={postId}
          onChange={handlePostIdChange}
        />
      </div>
      <button onClick={handleDeletePost}>Delete Post</button>
    </div>
  );
};

export default Delete;
