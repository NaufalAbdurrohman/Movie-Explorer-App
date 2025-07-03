// src/services/tmdb.ts
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

if (!TMDB_TOKEN) {
  throw new Error('Missing TMDB token. Please check .env setup.');
}

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

// ✅ Get Trending Movies
export const getTrendingMovies = async () => {
  const res = await tmdb.get('/trending/movie/day');
  return res.data.results;
};

// ✅ Get Now Playing Movies
export const getNowPlayingMovies = async (page = 1) => {
  const res = await tmdb.get(`/movie/now_playing?page=${page}`);
  return res.data.results;
};

// ✅ Get Movie Detail
export const getMovieDetail = async (movieId: number) => {
  const res = await tmdb.get(`/movie/${movieId}`);
  return res.data;
};

// ✅ Get Movie Credits (cast & crew)
export const getMovieCredits = async (movieId: number) => {
  const res = await tmdb.get(`/movie/${movieId}/credits`);
  return res.data;
};

// ✅ Get Trailer (YouTube only)
export const getTrailerUrl = async (movieId: number): Promise<string | null> => {
  try {
    const res = await tmdb.get(`/movie/${movieId}/videos`);
    const trailer = res.data.results.find(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};

export const searchMovies = async (query: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch');
  return await res.json();
};

