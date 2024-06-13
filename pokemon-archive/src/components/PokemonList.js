import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { CollectedContext } from '../context/CollectedContext';
import { useInView } from 'react-intersection-observer';
import './PokemonList.css';

const PokemonList = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 50; 
  const { collected, toggleCollected } = useContext(CollectedContext);

  const fetchCards = useCallback(() => {
    axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`, {
      headers: {
        'X-Api-Key': '4c4ccd02-c7c7-4101-b923-aec346474670'
      }
    })
    .then(response => {
      setCards(prevCards => [...prevCards, ...response.data.data]);
      console.log(response.data.data)
      if (response.data.data.length < pageSize) {
        setHasMore(false);
      }
    })
    .catch(error => {
      console.error("There was an error fetching the data!", error);
    });
  }, [page]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const handleSort = () => {
    const sortedCards = [...cards].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setCards(sortedCards);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterType(event.target.value.toLowerCase());
  };

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || card.types?.map(type => type.toLowerCase()).includes(filterType))
  );

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore]);

  return (
    <div className="pokemon-list-container">
      <div className="controls">
        <div className='searchbar'>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
        </div>
        <select className="filter-select" onChange={handleFilter}>
        <option value="">All Types</option>
        <option value="Grass">Grass</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Darkness">Dark</option>
        <option value="Psychic">Psychic</option>
        <option value="Colorless">Normal</option>
        <option value="Fighting">Fighting</option>
        <option value="Lightning">Electric</option>
        <option value="Metal">Steel</option>
        <option value="Fairy">Fairy</option>
        <option value="Dragon">Dragon</option>
        </select>
        <div className="order-by">
          <span>Order By:</span>
          <button className="sort-button" onClick={handleSort}>
            Name {sortOrder === 'asc' ? 'Asc' : 'Desc'}
          </button>
          {/* Add an arrow for the dropdown */}
        </div>
      </div>
      <div className="pokemon-list">
        {filteredCards.map((card) => (
          <PokemonCard 
            key={card.id} 
            name={card.name} 
            image={card.images.small} 
            onClick={() => toggleCollected(card)}
            isCollected={collected.some(col => col.id === card.id)}
          />
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="loading">
          Loading more cards...
        </div>
      )}
    </div>
  );
};

export default PokemonList;
