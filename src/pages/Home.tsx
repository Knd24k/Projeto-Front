import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';
import { searchGames, getGamesByCategory } from '../services/gamesAPI';
import { Game } from '../types/Game';
import RatingStars from '../components/RatingStars';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const categories = ['Action', 'Simulation', 'Indie', 'Adventure', 'Racing', 'Sports'];
  const [recommended, setRecommended] = useState<Game[]>([]);

  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const { user, toggleFavorite, isFavorite } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommended = async () => {
      const titles = ['Grand Theft Auto V', 'The Last Of Us Remastered', 'EA SPORTS FC 24'];
      const results: Game[] = [];
      for (const title of titles) {
        const res = await searchGames(title, 1);
        if (res.length > 0) results.push(res[0]);
      }
      setRecommended(results);
    };
    fetchRecommended();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (filter.trim() === '') {
        setGames([]);
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        let jogos: Game[];
        if (categories.map(c => c.toLowerCase()).includes(filter.toLowerCase())) {
          jogos = await getGamesByCategory(filter.toLowerCase(), page);
        } else {
          jogos = await searchGames(filter, page);
        }
        setGames(prev => (page === 1 ? jogos : [...prev, ...jogos]));
      } catch (err) {
        console.error(err);
        setError('Erro ao obter dados dos jogos.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filter, page]);

  const handleSearch = (term: string) => {
    setFilter(term);
    setPage(1);
  };

  const handleCategoryClick = (cat: string) => {
    setFilter(cat);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleView = (type: 'grid' | 'list') => {
    setViewType(type);
  };

  return (
    <>
      <Header />

      <SearchBar onSearch={handleSearch} />

      <div className="categorias">
        {categories.map(cat => (
          <CategoryButton key={cat} category={cat} onClick={handleCategoryClick} />
        ))}
      </div>

      <div className="view-toggle">
        <button
          onClick={() => toggleView('grid')}
          className={viewType === 'grid' ? 'active' : ''}
          title="Visualizar em grade"
        >
          ☐
        </button>
        <button
          onClick={() => toggleView('list')}
          className={viewType === 'list' ? 'active' : ''}
          title="Visualizar em lista"
        >
          ≡
        </button>
      </div>

      <section className="recomendados">
        <h2>Recomendados</h2>
        <ul>
          {recommended.map(game => (
            <li key={game.id} className="game-card">
              <h3>{game.name}</h3>
              {game.background_image && <img src={game.background_image} alt={game.name} />}
              <div className="rating">
                <RatingStars rating={game.rating} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <main className="main">
        {isLoading && <p>Carregando jogos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!isLoading && !error && games.length === 0 && filter !== '' && (
          <p>Nenhum jogo encontrado para "{filter}".</p>
        )}

        <ul className={`game-list ${viewType}`}>
          {games.map(game => (
            <li key={game.id} className="game-card">
              <h3>{game.name}</h3>
              {game.background_image && <img src={game.background_image} alt={game.name} />}
              <div className="rating">
                <RatingStars rating={game.rating} />
              </div>
              {user ? (
                <button onClick={() => toggleFavorite(game.id)}>
                  {isFavorite(game.id) ? '★ Remover Favorito' : '☆ Favoritar'}
                </button>
              ) : (
                <button onClick={() => navigate('/login')}>
                  ☆ Favoritar
                </button>
              )}
            </li>
          ))}
        </ul>

        {games.length > 0 && (
          <div className="ver-mais">
            <button onClick={handleLoadMore}>Ver mais</button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Home;