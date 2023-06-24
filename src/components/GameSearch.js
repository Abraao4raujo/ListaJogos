import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const GameSearch = ({ games, setFilteredGames }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  useEffect(() => {
    const filterGames = games.filter((game) => {
      const matchTitle = game.title.toLowerCase().includes(searchTerm);
      const matchGenre = selectedGenre ? game.genre === selectedGenre : true;
      return matchTitle && matchGenre;
    });

    setFilteredGames(filterGames);
  }, [games, searchTerm, selectedGenre, setFilteredGames]);

  const genres = Array.from(new Set(games.map((game) => game.genre)));

  return (
    <div className="header">
      <h1 className="title">Lista de jogos</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Pesquisar Jogo"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Todos os Gêneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <button className="ButtonSearch" onClick={() => setSearchTerm('')}>
          <AiOutlineSearch size={12} color="#FFF" />
        </button>
      </div>
    </div>
  );
};

export default GameSearch;
