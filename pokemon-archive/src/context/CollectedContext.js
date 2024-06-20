import React, { createContext, useState } from 'react';

export const CollectedContext = createContext();

export const CollectedProvider = ({ children }) => {
  const [collected, setCollected] = useState([]);

  const toggleCollected = (card) => {
    console.log('Toggling card:', card);
    setCollected((prevCollected) => {
      const isCollected = prevCollected.some((col) => col.id === card.id);
      if (isCollected) {
        console.log('Removing card:', card);
        return prevCollected.filter((col) => col.id !== card.id);
      } else {
        console.log('Adding card:', card);
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
