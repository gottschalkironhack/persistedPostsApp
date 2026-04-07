import { FavoritePost } from "../types";

const STORAGE_KEY = "favorite-posts";

export const storedFavorites = (): FavoritePost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FavoritePost[];
  } catch {
    return [];
  }
};

export const persistFavorites = (favorites: FavoritePost[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    console.error("Failed to persist favorites to localStorage");
  }
};

export const toggledFavorite = (
  post: FavoritePost,
  currentFavorites: FavoritePost[]
): FavoritePost[] => {
  const exists = currentFavorites.some((f) => f.id === post.id);

  if (exists) {
    return currentFavorites.filter((f) => f.id !== post.id);
  }

  return [...currentFavorites, post];
};

export const isFavorite = (postId: number, favorites: FavoritePost[]): boolean =>
  favorites.some((f) => f.id === postId);
