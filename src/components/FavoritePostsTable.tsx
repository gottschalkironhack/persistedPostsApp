import { FavoritePost, Column } from "../types";
import { Table } from "./Table";
import styled from "styled-components";

interface FavoritePostsTableProps {
  favorites: FavoritePost[];
  onToggleFavorite: (post: FavoritePost) => void;
}

const Section = styled.section`
  margin-top: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #212529;
  margin: 0 0 16px;
  font-weight: 600;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #ffe3e3;
  color: #c92a2a;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
`;

const RemoveButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #dee2e6;
  background: #fff;
  color: #c92a2a;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: #ffe3e3;
    border-color: #c92a2a;
  }
`;

const COLUMNS: Column<FavoritePost>[] = [
  { key: "id", header: "ID", width: "80px" },
  { key: "userId", header: "User ID", width: "100px" },
  { key: "title", header: "Title" },
];

export const FavoritePostsTable = ({ favorites, onToggleFavorite }: FavoritePostsTableProps) => (
  <Section>
    <SectionTitle>Favorite Posts</SectionTitle>
    <Table
      columns={COLUMNS}
      data={favorites}
      keyExtractor={(post) => post.id}
      emptyMessage="No favorite posts yet. Mark posts as favorites from the table above."
      rowHighlight={(post) => post.removedFromApi}
      renderActions={(post) => (
        <>
          {post.removedFromApi && <Badge>Removed from API</Badge>}
          <RemoveButton
            onClick={() => onToggleFavorite(post)}
            aria-label={`Remove post ${post.id} from favorites`}
          >
            Remove
          </RemoveButton>
        </>
      )}
    />
  </Section>
);
