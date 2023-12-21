import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Read = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the raw GitHub URL for the JSON file
        const response = await axios.get('https://raw.githubusercontent.com/Amna1993/my-event/main/db.json');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default Read;
