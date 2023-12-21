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
  const [showDelete, setShowDelete] = useState(false);

  const handleReadClick = () => {
    setShowRead(!showRead);
    setShowCreate(false);
    setShowUpdate(false);
    setShowDelete(false);
  };

  const handleCreateClick = () => {
    setShowCreate(!showCreate);
    setShowRead(false);
    setShowUpdate(false);
    setShowDelete(false);
  };

  const handleUpdateClick = () => {
    setShowUpdate(!showUpdate);
    setShowRead(false);
    setShowCreate(false);
    setShowDelete(false);
  };

  const handleDeleteClick = () => {
    setShowDelete(!showDelete);
    setShowRead(false);
    setShowCreate(false);
    setShowUpdate(false);
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

      {/* Button to toggle the Delete component */}
      <button onClick={handleDeleteClick}>Delete</button>

      {/* Conditionally render the Delete component based on the showDelete state */}
      {showDelete && <Delete />}
    </div>
  );
}

export default App;
