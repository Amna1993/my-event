// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
