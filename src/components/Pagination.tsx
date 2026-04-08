import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 14px;
  border: 1px solid ${({ $active }) => ($active ? "#228be6" : "#dee2e6")};
  background: ${({ $active }) => ($active ? "#228be6" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#495057")};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? "#1c7ed6" : "#f1f3f5")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.85rem;
  color: #868e96;
  padding: 0 8px;
`;

const visiblePageNumbers = (current: number, total: number): number[] => {
  const delta = 2;
  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);
  const pages: number[] = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = visiblePageNumbers(currentPage, totalPages);

  return (
    <Container>
      <PageButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        First
      </PageButton>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </PageButton>

      {pages[0] > 1 && <PageInfo>...</PageInfo>}

      {pages.map((page) => (
        <PageButton
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </PageButton>
      ))}

      {pages[pages.length - 1] < totalPages && <PageInfo>...</PageInfo>}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </PageButton>
      <PageButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        Last
      </PageButton>
    </Container>
  );
};
