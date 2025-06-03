import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getGameById } from '../services/gamesAPI';
import { Game } from '../types/Game';

const Favorites: React.FC = () => {
  const { user, toggleFavorite } = useAuth();
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      const results: Game[] = [];
      for (const id of user.favorites) {
        const game = await getGameById(id);
        if (game) results.push(game);
      }
      setFavoriteGames(results);
    };
    fetchFavorites();
  }, [user]);

  return (
    <>
      <Header />
      <div style={{ padding: '20px', marginTop: '100px' }}>
        <h2>Meus Favoritos</h2>
        <ul>
          {favoriteGames.map(game => (
            <li key={game.id} style={{ marginBottom: '20px' }}>
              <h3>{game.name}</h3>
              {game.background_image && <img src={game.background_image} alt={game.name} style={{ width: '200px', borderRadius: '4px' }} />}
              <p>Rating: {game.rating}</p>
              <button onClick={() => toggleFavorite(game.id)} style={{ marginTop: '10px' }}>Remover dos Favoritos</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Favorites;