import React, { useContext } from 'react';
import { CollectedContext } from '../context/CollectedContext';
import PokemonCard from '../components/PokemonCard';
import './Backgrounds.css';

const Collection = () => {
  const { collected } = useContext(CollectedContext);

  return (
    <div className="collection-background">
      <div className="container">
        <h2>Your Collection</h2>
        <div className="pokemon-list">
          {collected.map((card) => (
            <PokemonCard
              key={card.id}
              name={card.name}
              image={card.images.small}
              isCollected={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
