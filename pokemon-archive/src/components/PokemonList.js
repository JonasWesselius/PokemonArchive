import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { CollectedContext } from '../context/CollectedContext';
import { useInView } from 'react-intersection-observer';
import './PokemonList.css';
import downArrow from '../images/down-arrow.svg'; // Adjust the path based on your project structure

const PokemonList = () => {
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 50;
  const { collected, toggleCollected } = useContext(CollectedContext);
  const [showBackToTop, setShowBackToTop] = useState(false); // State to manage when to show back to top arrow
  const [flippedArrow, setFlippedArrow] = useState(false); // State to manage arrow flip

  const fetchCards = useCallback(() => {
    const query = [];
    if (searchTerm) query.push(`name:${searchTerm}`);
    if (filterType) query.push(`types:${filterType}`);

    console.log(`API Query: ${query.join(' ')}`);

    axios.get(`https://api.pokemontcg.io/v2/cards`, {
      params: {
        q: query.join(' '),
        pageSize: pageSize,
        page: page
      },
      headers: {
        'X-Api-Key': '4c4ccd02-c7c7-4101-b923-aec346474670'
      }
    })
    .then(response => {
      console.log(`Fetched ${response.data.data.length} cards`);
      if (page === 1) {
        setAllCards(response.data.data);
      } else {
        setAllCards(prevCards => [...prevCards, ...response.data.data]);
      }
      setHasMore(response.data.data.length >= pageSize);
    })
    .catch(error => {
      console.error("There was an error fetching the data!", error);
    });
  }, [searchTerm, filterType, page]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // Apply filters and search
  useEffect(() => {
    console.log('Applying filters and search');
    let filtered = allCards;
    if (filterType) {
      filtered = filtered.filter(card =>
        card.types?.map(type => type.toLowerCase()).includes(filterType)
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    console.log(`Filtered cards length: ${filtered.length}`);
    setFilteredCards(filtered);
  }, [allCards, filterType, searchTerm]);

  const handleSort = () => {
    console.log(`Sorting cards in ${sortOrder} order`);
    const sortedCards = [...filteredCards].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredCards(sortedCards);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase(); // Trim and convert to lower case
    console.log(`Setting search term: ${searchTerm}`);
    setSearchTerm(searchTerm);
    setPage(1); // Reset page when search term changes
  };

  const handleFilter = (event) => {
    const selectedFilter = event.target.value.toLowerCase();
    console.log(`Setting filter type: ${selectedFilter}`);
    setFilterType(selectedFilter);
    setPage(1); // Reset page when filter type changes
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && hasMore) {
      console.log('In view and has more cards to load');
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore]);

  // Effect to show back to top arrow when scrolled past the search bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const searchBarOffset = document.querySelector('.searchbar').offsetTop;
      setShowBackToTop(scrollTop > searchBarOffset);
      setFlippedArrow(scrollTop > searchBarOffset); // Flip arrow when scrolled past the search bar
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="pokemon-list-container">
      <div className="controls">
        <div className='searchbar'>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
        </div>
        <select className="filter-select" onChange={handleFilter}>
          <option value="">All Types</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="darkness">Dark</option>
          <option value="psychic">Psychic</option>
          <option value="colorless">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="lightning">Electric</option>
          <option value="metal">Steel</option>
          <option value="fairy">Fairy</option>
          <option value="dragon">Dragon</option>
        </select>
        <div className="order-by">
          <span>Order By:</span>
          <button className="sort-button" onClick={handleSort}>
            Name
          </button>
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
      {/* Back to top arrow */}
      <div className={`back-to-top ${showBackToTop ? 'active' : ''} ${flippedArrow ? 'flipped' : ''}`} onClick={scrollToTop}>
        <img src={downArrow} alt="Back to Top" />
      </div>
    </div>
  );
};

export default PokemonList;
