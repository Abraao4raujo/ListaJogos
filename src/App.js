import { useState, useEffect } from "react";
import { BiLoaderAlt } from "react-icons/bi"
import axios from "axios";
import './App.css';
import GameSearch from './components/GameSearch'

function App() {
  const [games, setGames] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)
  const [filteredGames, setFilteredGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  useEffect(() => {
    if (loading) {
      document.body.classList.add('loading')
    } else {
      document.body.classList.remove('loading')
    }
  }, [loading])

  //config api
  useEffect(() => {
    const config = {
      headers: {
        'dev-email-address': 'gamerabrao001@gmail.com'
      },
      timeout: 5000
    };
    //acessar api e retornando response ou erros
    axios.get('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/', config)
      .then(response => {
        setGames(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.code === 'ECONNABORTED') {
          setLoading(false);
          alert('O servidor demorou para responder, tente mais tarde')
          setError(true);
          return;
        } else {
          const erro = error.response.status
          const statusError = [500, 502, 503, 504, 507, 508, 509]
          setLoading(false);
          setError(true);
          for (let i = 0; i < statusError.length; i++) {
            if (erro === statusError[i]) {
              setLoading(false);
              alert("O servidor falhou em responder, tente recarregar a página");
              setError(true);
              return;
            }
          }

          if (erro !== '200') {
            setLoading(false);
            alert('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde')
            setError(true);
          }
        }

      });
  }, []);

  useEffect(() => {
    setFilteredGames(games)
  }, [games])

  //retornando no site
  return (
    <div className="container">
      <GameSearch games={games} setFilteredGames={setFilteredGames} />
      {loading ? (
        <div className="load-container">
          <BiLoaderAlt className="loader" size={50} />
        </div>
      ) : selectedGame ? (
        <div className="game-detail">
          <img src={selectedGame.thumbnail} alt={selectedGame.title} />
          <h2>{selectedGame.title}</h2>
          <p className="game-description">{selectedGame.short_description}</p>
          <button onClick={() => setSelectedGame(null)} className="btn-back">Voltar</button>
        </div>
      ) : (
        <main className="main">
          <div className="game-list">
            {filteredGames.map((game) => (
              <div key={game.id} className="game-item" onClick={() => {
                handleGameClick(game)
              }}>
                <img src={game.thumbnail} alt={game.title} />
                <p className="game-title">{game.title}</p>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;