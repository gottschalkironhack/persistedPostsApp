import styled, { keyframes } from "styled-components";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Th = styled.th`
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
`;

const SkeletonBar = styled.div<{ $width?: string }>`
  height: 16px;
  width: ${({ $width }) => $width || "100%"};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 800px 16px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

const HeaderBar = styled(SkeletonBar)`
  height: 14px;
  width: 60%;
`;

export const SkeletonTable = ({ rows = 10, columns = 4 }: SkeletonTableProps) => (
  <StyledTable>
    <thead>
      <tr>
        {Array.from({ length: columns }, (_, i) => (
          <Th key={i}>
            <HeaderBar />
          </Th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: rows }, (_, rowIdx) => (
        <tr key={rowIdx}>
          {Array.from({ length: columns }, (_, colIdx) => (
            <Td key={colIdx}>
              <SkeletonBar $width={colIdx === 2 ? "80%" : "50%"} />
            </Td>
          ))}
        </tr>
      ))}
    </tbody>
  </StyledTable>
);
