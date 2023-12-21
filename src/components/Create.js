import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ refreshData }) => {
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleInputChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
      // Fetch the current posts data
      const response = await axios.get('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json');
      const currentPosts = response.data;

      // Create a new post
      const newPost = {
        id: Date.now(), // Use a unique identifier (e.g., timestamp) as the ID
        title: newPostTitle,
      };

      // Update the posts data with the new post
      const updatedPosts = [...currentPosts, newPost];

      // Write the updated posts data back to the GitHub repository
      await axios.put('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json', updatedPosts);

      // Refresh the data in the parent component
      refreshData();

      // Clear the input field
      setNewPostTitle('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <div>
        <label htmlFor="newPostTitle">Title:</label>
        <input
          type="text"
          id="newPostTitle"
          value={newPostTitle}
          onChange={handleInputChange}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  );
};

export default Create;
