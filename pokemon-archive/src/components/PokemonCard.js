import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './PokemonCard.css';  // Import CSS file

const PokemonCard = ({ name, image, onClick, isCollected }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [cardStyle, setCardStyle] = useState({
    transform: 'none',
  });

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rotateX = (mouseY - centerY) / 8; // Adjust the division factor for tilt sensitivity
    const rotateY = (centerX - mouseX) / 8; // Adjust the division factor for tilt sensitivity
    const scale = 1.05;

    const transformStyle = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;

    setCardStyle({ transform: transformStyle });
  };

  const handleMouseLeave = () => {
    setCardStyle({ transform: 'none' });
  };

  return (
    <div
      ref={(el) => {
        ref(el);
        cardRef.current = el;
      }}
      className={`pokemon-card ${isCollected ? 'collected' : ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
    >
      {inView && <img src={image} alt={name} />}
    </div>
  );
};

export default PokemonCard;
