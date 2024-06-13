import React from 'react';
import { useInView } from 'react-intersection-observer';
import './PokemonCard.css';  // Import CSS file

const PokemonCard = ({ name, image, onClick, isCollected }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`pokemon-card ${isCollected ? 'collected' : ''}`} onClick={onClick}>
      {inView && <img src={image} alt={name} />}
      {/* <h3>{name}</h3> */}
    </div>
  );
};

export default PokemonCard;
