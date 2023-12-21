import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [newPostTitle, setNewPostTitle] = useState('');

  const handleInputChange = (event) => {
    setNewPostTitle(event.target.value);
  };

  const handleCreatePost = async () => {
    try {
      // Fetch the current content of db.json from GitHub using the GitHub API
      const response = await axios.get(
        'https://api.github.com/repos/Amna1993/my-event/contents/db.json'
      );

      // Parse the content of the file
      const currentData = JSON.parse(
        atob(response.data.content.replace(/\s/g, ''))
      );

      // Add a new post
      const newPost = {
        id: currentData.length + 1,
        title: newPostTitle,
      };

      currentData.push(newPost);

      // Update the content of db.json on GitHub
      await axios.put(
        'https://api.github.com/repos/Amna1993/my-event/contents/db.json',
        {
          message: 'Create post',
          content: btoa(JSON.stringify(currentData)),
          sha: response.data.sha,
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
