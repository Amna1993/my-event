import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleInputChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  // Update Create.js (or any other component that makes the request)

const handleCreatePost = async () => {
    try {
      const response = await axios.get('/.netlify/functions/fetchData');
      const currentData = response.data;
  
      // Add a new post to the array
      const newPost = {
        id: Date.now(),
        title: newPostTitle,
      };
  
      currentData.push(newPost);
  
      // Update the content of db.json on GitHub
      await axios.put(
        'https://api.github.com/repos/Amna1993/my-event/contents/db.json',
        {
          message: 'Create post',
          content: Buffer.from(JSON.stringify(currentData)).toString('base64'),
          sha: response.data.sha,
        },
        {
          headers: {
            Authorization: `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`,
          },
        }
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
