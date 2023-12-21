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
      // http://localhost:8000/posts
      const response = await axios.post('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json/posts', {
        title: newPostTitle,
      });
  
      // Check if the response contains a valid array
      if (Array.isArray(response.data)) {
        // Assuming the response is an array of posts, update the state
        setNewPostTitle('');
        // Optionally, you can fetch the updated list of posts after creating one
        // You can do this by calling the fetchData function from the Read component or use a global state management solution.
      } else {
        console.error('Unexpected response structure:', response.data);
      }
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
