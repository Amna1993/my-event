import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Read = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json');
        
        if (Array.isArray(response.data)) {
          // If the data is an array, set it directly
          setPosts(response.data);
        } else if (response.data && response.data.posts) {
          // If the data has a 'posts' property, assume it's the array of posts
          setPosts(response.data.posts);
        } else {
          console.error('Unexpected data structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => <li key={post.id}>{post.title}</li>)
      ) : (
        <p>No posts available</p>
      )}
    </ul>
  );
};

export default Read;
