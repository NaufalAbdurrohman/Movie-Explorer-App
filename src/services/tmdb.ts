import axios from 'axios';

// Get Trending
const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
});

export const getTrendingMovies = async () => {
  const res = await tmdb.get('/trending/movie/week');
  return res.data.results;
};

// Get Trailer
export const getTrailerUrl = async (
  movieId: number
): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch trailer');
    }

    const data = await response.json();

    // Search Video trailer from youtube
    const trailer = data.results.find(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (trailer) {
      return `https://www.youtube.com/watch?v=${trailer.key}`;
    }

    return null; // Tidak ada trailer yang ditemukan
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};

// Get Now Playing
export const getNowPlayingMovies = async (page = 1) => {
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      'TMDB Token is missing. Please set NEXT_PUBLIC_TMDB_TOKEN in .env'
    );
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?page=${page}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch now Playing Movies');
  }

  const data = await res.json();
  return data.results;
};
