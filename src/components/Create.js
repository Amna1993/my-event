import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleInputChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
      // Fetch the current content of db.json from GitHub
      const response = await axios.get('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json');
      const currentData = response.data;

      // Create a new post object
      const newPost = {
        id: currentData.length + 1, // You might want to adjust the way you generate post IDs
        title: newPostTitle,
      };

      // Update the content of db.json on GitHub
      await axios.put(
        'https://api.github.com/repos/Amna1993/my-event/contents/db.json',
        {
          message: 'Create post',
          content: Buffer.from(JSON.stringify([...currentData, newPost])).toString('base64'),
          sha: response.headers['etag'],
        },
        {
          headers: {
            Authorization: `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`, // Replace with your GitHub token
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
