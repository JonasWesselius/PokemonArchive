import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Archive from './pages/Archive';
import Collection from './pages/Collection';
import { CollectedProvider } from './context/CollectedContext';
import './App.css';

const App = () => {
  return (
    <CollectedProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Archive />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </Router>
    </CollectedProvider>
  );
};

export default App;
