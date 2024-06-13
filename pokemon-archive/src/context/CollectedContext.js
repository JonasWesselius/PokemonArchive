import React, { createContext, useState } from 'react';

export const CollectedContext = createContext();

export const CollectedProvider = ({ children }) => {
  const [collected, setCollected] = useState([]);

  const toggleCollected = (card) => {
    setCollected((prevCollected) => {
      if (prevCollected.find(col => col.id === card.id)) {
        return prevCollected.filter(col => col.id !== card.id);
      } else {
        return [...prevCollected, card];
      }
    });
  };

  return (
    <CollectedContext.Provider value={{ collected, toggleCollected }}>
      {children}
    </CollectedContext.Provider>
  );
};
