import { Post, FavoritePost } from "../types";

const postAsUpdatedFavorite = (
  favorite: FavoritePost,
  freshPostsById: Map<number, Post>
): FavoritePost => {
  const freshPost = freshPostsById.get(favorite.id);

  if (!freshPost) {
    return { ...favorite, removedFromApi: true };
  }

  return { ...freshPost, removedFromApi: false };
};

export const reconciledFavorites = (
  currentFavorites: FavoritePost[],
  freshPosts: Post[]
): FavoritePost[] => {
  if (currentFavorites.length === 0) return [];

  const freshPostsById = new Map(freshPosts.map((p) => [p.id, p]));

  return currentFavorites.map((fav) => postAsUpdatedFavorite(fav, freshPostsById));
};
