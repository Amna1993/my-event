import React, { useState } from 'react';
import axios from 'axios';

const Update = () => {
  const [postId, setPostId] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');

  const handlePostIdChange = (event) => {
    setPostId(event.target.value);
  };

  const handleUpdatedTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleUpdatePost = async () => {
    try {
      // Fetch the current content of db.json from GitHub using the GitHub API
      const response = await axios.get(
        'https://api.github.com/repos/Amna1993/my-event/contents/db.json'
      );

      // Parse the content of the file
      const currentData = JSON.parse(
        Buffer.from(response.data.content, 'base64').toString('utf-8')
      );

      // Find the index of the post to update
      const indexToUpdate = currentData.findIndex(
        (post) => post.id === parseInt(postId)
      );

      // If the post exists, update its title
      if (indexToUpdate !== -1) {
        currentData[indexToUpdate].title = updatedTitle;

        // Update the content of db.json on GitHub
        await axios.put(
          'https://api.github.com/repos/Amna1993/my-event/contents/db.json',
          {
            message: 'Update post',
            content: Buffer.from(JSON.stringify(currentData)).toString(
              'base64'
            ),
            sha: response.data.sha,
          },
          {
            headers: {
              Authorization: `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`, // Replace with your GitHub token
            },
          }
        );

        // Clear the input fields after updating a post
        setPostId('');
        setUpdatedTitle('');
      } else {
        console.error('Post not found');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h2>Update a Post</h2>
      <div>
        <label htmlFor="postId">Post ID:</label>
        <input
          type="text"
          id="postId"
          value={postId}
          onChange={handlePostIdChange}
        />
      </div>
      <div>
        <label htmlFor="updatedTitle">Updated Title:</label>
        <input
          type="text"
          id="updatedTitle"
          value={updatedTitle}
          onChange={handleUpdatedTitleChange}
        />
      </div>
      <button onClick={handleUpdatePost}>Update Post</button>
    </div>
  );
};

export default Update;
