import axios from 'axios';
import { Game } from '../types/Game';

const API_KEY = '461ed1c6b26f4c159e008a0ade6d4caf';
const BASE_URL = 'https://api.rawg.io/api';

export const searchGames = async (query: string, page: number): Promise<Game[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: { key: API_KEY, search: query, page, page_size: 20 }
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    return [];
  }
};

export const getGamesByCategory = async (genre: string, page: number): Promise<Game[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: { key: API_KEY, genres: genre, page, page_size: 20 }
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Erro ao filtrar por categoria:', error);
    return [];
  }
};

export const getGameById = async (id: number): Promise<Game | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}`, {
      params: { key: API_KEY }
    });
    const game = response.data;
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      genres: game.genres
    };
  } catch (error) {
    console.error('Erro ao buscar jogo por ID:', error);
    return null;
  }
};