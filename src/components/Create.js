import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleInputChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
     
      await axios.post('http://localhost:8000/posts', {
        title: newPostTitle,
      });

      
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
