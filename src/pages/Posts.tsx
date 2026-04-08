import styled from "styled-components";
import { usePosts } from "../hooks/usePosts";
import { PostsTable } from "../components/PostsTable";
import { FavoritePostsTable } from "../components/FavoritePostsTable";
import { Pagination } from "../components/Pagination";
import { SkeletonTable } from "../components/SkeletonTable";
import { ErrorState } from "../components/ErrorState";
import { SearchInput } from "../components/SearchInput";

const PageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const Header = styled.header`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #212529;
  margin: 0 0 8px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #868e96;
  margin: 0;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const RefreshButton = styled.button<{ $isRefreshing: boolean }>`
  padding: 10px 20px;
  background: ${({ $isRefreshing }) => ($isRefreshing ? "#74c0fc" : "#228be6")};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: ${({ $isRefreshing }) => ($isRefreshing ? "not-allowed" : "pointer")};
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.15s ease;
  opacity: ${({ $isRefreshing }) => ($isRefreshing ? 0.8 : 1)};

  &:hover:not(:disabled) {
    background: #1c7ed6;
  }
`;

const ResultCount = styled.span`
  font-size: 0.85rem;
  color: #868e96;
`;

export const Posts = () => {
  const {
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
    setSearchQuery,
    refresh,
    retry,
    toggleFavorite,
  } = usePosts();

  if (isLoading) {
    return (
      <PageContainer>
        <Header>
          <Title>Posts</Title>
          <Subtitle>Loading posts from the API...</Subtitle>
        </Header>
        <SkeletonTable rows={10} columns={4} />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Header>
          <Title>Posts</Title>
          <Subtitle>Something went wrong</Subtitle>
        </Header>
        <ErrorState message={error} onRetry={retry} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Title>Posts</Title>
        <Subtitle>Browse and manage your favorite posts</Subtitle>
      </Header>

      <Toolbar>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ResultCount>
            {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
          </ResultCount>
          <RefreshButton
            $isRefreshing={isRefreshing}
            disabled={isRefreshing}
            onClick={refresh}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </RefreshButton>
        </div>
      </Toolbar>

      <PostsTable
        posts={paginatedPosts}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <FavoritePostsTable
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </PageContainer>
  );
};
