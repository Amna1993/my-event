// src/App.js
import React, { useState } from 'react';
import Create from './components/Create';
import Update from './components/Update';
import Delete from './components/Delete';
import Read from './components/Read';

function App() {
  const [showRead, setShowRead] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleReadClick = () => {
    setShowRead(!showRead);
    setShowCreate(false);
    setShowUpdate(false);
  };

  const handleCreateClick = () => {
    setShowCreate(!showCreate);
    setShowRead(false);
    setShowUpdate(false);
  };

  const handleUpdateClick = () => {
    setShowUpdate(!showUpdate);
    setShowRead(false);
    setShowCreate(false);
  };

  return (
    <div>
      <h1>Posts</h1>

      {/* Button to toggle the Read component */}
      <button onClick={handleReadClick}>Read</button>

      {/* Conditionally render the Read component based on the showRead state */}
      {showRead && <Read />}

      {/* Button to toggle the Create component */}
      <button onClick={handleCreateClick}>Create</button>

      {/* Conditionally render the Create component based on the showCreate state */}
      {showCreate && <Create />}

      {/* Button to toggle the Update component */}
      <button onClick={handleUpdateClick}>Update</button>

      {/* Conditionally render the Update component based on the showUpdate state */}
      {showUpdate && <Update />}

      <Delete />
    </div>
  );
}

export default App;
