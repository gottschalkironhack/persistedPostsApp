import { ReactNode } from "react";
import styled from "styled-components";
import { Column } from "../types";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  renderActions?: (item: T) => ReactNode;
  emptyMessage?: string;
  rowHighlight?: (item: T) => boolean;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Th = styled.th<{ $width?: string }>`
  text-align: left;
  padding: 12px 16px;
  background: #f8f9fa;
  font-weight: 600;
  font-size: 0.85rem;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  width: ${({ $width }) => $width || "auto"};
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
  color: #333;
`;

const Tr = styled.tr<{ $highlight?: boolean }>`
  background: ${({ $highlight }) => ($highlight ? "#fff3cd" : "transparent")};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $highlight }) => ($highlight ? "#ffecb5" : "#f8f9fa")};
  }
`;

const EmptyRow = styled.td`
  padding: 32px 16px;
  text-align: center;
  color: #868e96;
  font-size: 0.95rem;
`;

export const Table = <T,>({
  columns,
  data,
  keyExtractor,
  renderActions,
  emptyMessage = "No data available",
  rowHighlight,
}: TableProps<T>) => {
  const hasActions = !!renderActions;

  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((col) => (
            <Th key={String(col.key)} $width={col.width}>
              {col.header}
            </Th>
          ))}
          {hasActions && <Th $width="100px">Actions</Th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <EmptyRow colSpan={columns.length + (hasActions ? 1 : 0)}>
              {emptyMessage}
            </EmptyRow>
          </tr>
        ) : (
          data.map((item) => (
            <Tr
              key={keyExtractor(item)}
              $highlight={rowHighlight?.(item)}
            >
              {columns.map((col) => (
                <Td key={String(col.key)}>{String(item[col.key])}</Td>
              ))}
              {hasActions && <Td>{renderActions(item)}</Td>}
            </Tr>
          ))
        )}
      </tbody>
    </StyledTable>
  );
};
