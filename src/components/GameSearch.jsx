import React, { useState, useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "./GameSearch.css";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const GameSearch = ({ games, setFilteredGames, favorites, currentUser }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleShowFavorites = () => {
    if (currentUser && currentUser.uid) {
      setShowFavorites(!showFavorites);
    } else {
      // saveFavoritesToFirestore(currentUser ? currentUser.uid : null, favorites);
      console.log(currentUser);

      navigate("/register");
    }
    // setShowFavorites(!showFavorites);
  };

  useEffect(() => {
    const filteredGames = games.filter((game) => {
      const matchTitle = game.title.toLowerCase().includes(searchTerm);
      const matchGenre = selectedGenre ? game.genre === selectedGenre : true;
      const matchFavorites = showFavorites ? favorites.includes(game.id) : true;
      return matchTitle && matchGenre && matchFavorites;
    });

    setFilteredGames(filteredGames);
  }, [
    games,
    searchTerm,
    selectedGenre,
    showFavorites,
    favorites,
    setFilteredGames,
  ]);

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
        <button
          className={`ButtonShowFavorite ${showFavorites ? "active" : ""}`}
          onClick={handleShowFavorites}
        >
          {showFavorites ? (
            <BsHeartFill className="favorite-icon" />
          ) : (
            <BsHeart className="favorite-icon" />
          )}
        </button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default GameSearch;
