import React, { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ApiGame.css";
import GameSearch from "./components/GameSearch";
import { auth, db } from "./services/firebaseConfig";
import saveFavoritesToFirestore from "./components/saveFavorites";
import { doc, getDoc } from "firebase/firestore";

const ApiGame = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const handleRating = (e, gameId, value) => {
    e.stopPropagation();

    if (!currentUser) {
      navigate("/register");
      return;
    }

    setRating((prevRating) => ({
      ...prevRating,
      [gameId]: value,
    }));
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleFavoriteToggle = (gameId) => {
    if (currentUser) {
      const isFavorite = favorites.includes(gameId);

      if (isFavorite) {
        const updatedFavorites = favorites.filter((id) => id !== gameId);
        setFavorites(updatedFavorites);

        saveFavoritesToFirestore(currentUser.uid, gameId, false);
      } else {
        const updatedFavorites = [...favorites, gameId];
        setFavorites(updatedFavorites);

        saveFavoritesToFirestore(currentUser.uid, gameId, true);
      }
    } else {
      navigate("/register");
    }
  };

  useEffect(() => {
    if (loading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [loading]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            if (userData.favorites && Array.isArray(userData.favorites)) {
              setFavorites(userData.favorites);
            } else {
              setFavorites([]);
            }
          } else {
            setFavorites([]);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      } else {
        setFavorites([]);
      }
      setFavoritesLoaded(true);
    };

    fetchFavorites();

    const config = {
      headers: {
        "dev-email-address": "gamerabrao001@gmail.com",
      },
      timeout: 5000,
    };

    axios
      .get(
        "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
        config
      )
      .then((response) => {
        setGames(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED") {
          setLoading(false);
          alert("O servidor demorou para responder, tente mais tarde");
          setError(true);
          return;
        } else {
          const erro = error.response.status;
          const statusError = [500, 502, 503, 504, 507, 508, 509];
          setLoading(false);
          setError(true);
          for (let i = 0; i < statusError.length; i++) {
            if (erro === statusError[i]) {
              setLoading(false);
              alert(
                "O servidor falhou em responder, tente recarregar a página"
              );
              setError(true);
              return;
            }
          }

          if (erro !== "200") {
            setLoading(false);
            alert(
              "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde"
            );
            setError(true);
          }
        }
      });
  }, [currentUser]);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <GameSearch
        games={games}
        setFilteredGames={setFilteredGames}
        favorites={favorites}
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
      />
      {loading ? (
        <div className="load-container">
          <BiLoaderAlt className="loader" size={50} />
        </div>
      ) : selectedGame ? (
        <div className="game-detail">
          <img src={selectedGame.thumbnail} alt={selectedGame.title} />
          <h2>{selectedGame.title}</h2>
          <p className="game-description">{selectedGame.short_description}</p>
          <button onClick={() => setSelectedGame(null)} className="btn-back">
            Voltar
          </button>
        </div>
      ) : (
        <main className="main">
          <div className="game-list">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className={`game-item ${
                  favorites.includes(game.id) ? "favorite" : ""
                }`}
                onClick={() => handleGameClick(game)}
              >
                <img src={game.thumbnail} alt={game.title} />
                <p className="game-title">{game.title}</p>
                <button
                  className="favorite-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(game.id);
                  }}
                >
                  {favorites.includes(game.id) ? (
                    <BsHeartFill className="heart-icon" />
                  ) : (
                    <BsHeart className="heart-icon" />
                  )}
                </button>
                <div className="rating-container">
                  <button
                    className={`star-button ${
                      rating[game.id] >= 1 ? "active" : ""
                    }`}
                    onClick={(e) => handleRating(e, game.id, 1)}
                  >
                    ★
                  </button>

                  <button
                    className={`star-button ${
                      rating[game.id] >= 2 ? "active" : ""
                    }`}
                    onClick={(e) => handleRating(e, game.id, 2)}
                  >
                    ★
                  </button>

                  <button
                    className={`star-button ${
                      rating[game.id] >= 3 ? "active" : ""
                    }`}
                    onClick={(e) => handleRating(e, game.id, 3)}
                  >
                    ★
                  </button>

                  <button
                    className={`star-button ${
                      rating[game.id] >= 4 ? "active" : ""
                    }`}
                    onClick={(e) => handleRating(e, game.id, 4)}
                  >
                    ★
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default ApiGame;
