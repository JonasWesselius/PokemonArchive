import React from 'react';
import PokemonList from '../components/PokemonList';
import './Backgrounds.css'

const Archive = () => {
  return (
    <div className="archive-background">
      <div className="container">
        <div className="archive">
          <PokemonList />
        </div>
      </div>
    </div>
  );
};

export default Archive;
