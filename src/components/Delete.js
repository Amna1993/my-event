import React, { useState } from 'react';
import axios from 'axios';

const Delete = () => {
  const [postId, setPostId] = useState('');

  const handlePostIdChange = (event) => {
    setPostId(event.target.value);
  };

  const handleDeletePost = async () => {
    try {
      // Fetch the current content of db.json from GitHub
      const response = await axios.get('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json');
      const currentData = response.data;

      // Find the index of the post to delete
      const indexToDelete = currentData.findIndex((post) => post.id === postId);

      // If the post exists, remove it
      if (indexToDelete !== -1) {
        currentData.splice(indexToDelete, 1);

        // Update the content of db.json on GitHub
        await axios.put(
          'https://api.github.com/repos/Amna1993/my-event/contents/db.json',
          {
            message: 'Delete post',
            content: Buffer.from(JSON.stringify(currentData)).toString('base64'),
            sha: response.headers['etag'],
          },
          {
            headers: {
              Authorization: `Bearer YOUR_GITHUB_TOKEN`, // Replace with your GitHub token
            },
          }
        );

        // Clear the input field after deleting a post
        setPostId('');
      } else {
        console.error('Post not found');
      }
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
