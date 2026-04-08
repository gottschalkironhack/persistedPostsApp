import { Post, FavoritePost, Column } from "../types";
import { Table } from "./Table";
import { isFavorite } from "../helpers/storeFavorites";
import styled from "styled-components";

interface PostsTableProps {
  posts: Post[];
  favorites: FavoritePost[];
  onToggleFavorite: (post: Post) => void;
}

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${({ $isFavorite }) => ($isFavorite ? "#fcc419" : "#dee2e6")};
  background: ${({ $isFavorite }) => ($isFavorite ? "#fff9db" : "#fff")};
  color: ${({ $isFavorite }) => ($isFavorite ? "#e67700" : "#495057")};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ $isFavorite }) => ($isFavorite ? "#ffec99" : "#f8f9fa")};
  }
`;

const COLUMNS: Column<Post>[] = [
  { key: "id", header: "ID", width: "80px" },
  { key: "userId", header: "User ID", width: "100px" },
  { key: "title", header: "Title" },
];

export const PostsTable = ({ posts, favorites, onToggleFavorite }: PostsTableProps) => (
  <Table
    columns={COLUMNS}
    data={posts}
    keyExtractor={(post) => post.id}
    emptyMessage="No posts match your search"
    renderActions={(post) => (
      <FavoriteButton
        $isFavorite={isFavorite(post.id, favorites)}
        onClick={() => onToggleFavorite(post)}
        aria-label={
          isFavorite(post.id, favorites)
            ? `Remove post ${post.id} from favorites`
            : `Add post ${post.id} to favorites`
        }
      >
        {isFavorite(post.id, favorites) ? "Unfavorite" : "Favorite"}
      </FavoriteButton>
    )}
  />
);
