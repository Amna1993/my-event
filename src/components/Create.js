import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ setPosts }) => {
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleInputChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
      const response = await axios.post('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json/posts', {
        title: newPostTitle,
      });

      // Assuming response.data is the newly created post object
      // Update the posts array using the setPosts function
      setPosts((prevPosts) => [...prevPosts, response.data]);

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
