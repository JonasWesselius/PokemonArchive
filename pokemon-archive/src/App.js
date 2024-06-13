import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Archive from './pages/Archive';
import Collection from './pages/Collection';
import Login from './pages/Login';
import { CollectedProvider } from './context/CollectedContext';
import './App.css';

const App = () => {
  return (
    <CollectedProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Archive />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </CollectedProvider>
  );
};

export default App;
