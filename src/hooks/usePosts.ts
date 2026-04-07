import { useState, useEffect, useCallback } from "react";
import { Post, FavoritePost } from "../types";
import { fetchedPosts } from "../api/postsApi";
import {
  storedFavorites,
  persistFavorites,
  toggledFavorite,
} from "../helpers/storeFavorites";
import { reconciledFavorites } from "../helpers/comparePosts";

interface UsePostsReturn {
  posts: Post[];
  favorites: FavoritePost[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  currentPage: number;
  searchQuery: string;
  filteredPosts: Post[];
  paginatedPosts: Post[];
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  refresh: () => void;
  retry: () => void;
  toggleFavorite: (post: Post) => void;
}

const ITEMS_PER_PAGE = 10;

const postsMatchingQuery = (posts: Post[], query: string): Post[] => {
  if (!query.trim()) return posts;
  const lower = query.toLowerCase();
  return posts.filter((post) => post.title.toLowerCase().includes(lower));
};

const postsForPage = (posts: Post[], page: number): Post[] => {
  const start = (page - 1) * ITEMS_PER_PAGE;
  return posts.slice(start, start + ITEMS_PER_PAGE);
};

const pageCount = (totalItems: number): number =>
  Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [favorites, setFavorites] = useState<FavoritePost[]>(storedFavorites);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const loadPosts = useCallback(async (isRefresh: boolean) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await fetchedPosts();
      setPosts(data);

      setFavorites((prev) => {
        const reconciled = reconciledFavorites(prev, data);
        persistFavorites(reconciled);
        return reconciled;
      });

      setCurrentPage(1);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(false);
  }, [loadPosts]);

  const refresh = useCallback(() => {
    loadPosts(true);
  }, [loadPosts]);

  const retry = useCallback(() => {
    loadPosts(false);
  }, [loadPosts]);

  const toggleFavorite = useCallback((post: Post) => {
    setFavorites((prev) => {
      const favoritePost: FavoritePost = { ...post, removedFromApi: false };
      const updated = toggledFavorite(favoritePost, prev);
      persistFavorites(updated);
      return updated;
    });
  }, []);

  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const filteredPosts = postsMatchingQuery(posts, searchQuery);
  const totalPages = pageCount(filteredPosts.length);
  const paginatedPosts = postsForPage(filteredPosts, currentPage);

  return {
    posts,
    favorites,
    isLoading,
    isRefreshing,
    error,
    currentPage,
    searchQuery,
    filteredPosts,
    paginatedPosts,
    totalPages,
    setCurrentPage,
    setSearchQuery: handleSetSearchQuery,
    refresh,
    retry,
    toggleFavorite,
  };
};
