// src/components/Create.js
import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleInputChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
      // Fetch the current content of db.json from the Netlify function
      const fetchDataResponse = await axios.get('/.my-event/functions/fetchData');
      const currentData = fetchDataResponse.data;

      // Add a new post to the array
      const newPost = {
        id: Date.now(),
        title: newPostTitle,
      };

      currentData.push(newPost);

      // Update the content of db.json through the Netlify function
      await axios.put(
        '/.netlify/functions/updateData',
        currentData
      );

      // Clear the input field after creating a post
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
