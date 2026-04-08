import styled from "styled-components";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Container = styled.div`
  position: relative;
  max-width: 360px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.9rem;
  background: #fff;
  color: #333;
  transition: border-color 0.15s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #228be6;
    box-shadow: 0 0 0 3px rgba(34, 139, 230, 0.15);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
  font-size: 0.95rem;
  pointer-events: none;
`;

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search by title...",
}: SearchInputProps) => (
  <Container>
    <SearchIcon aria-hidden="true">&#x1F50D;</SearchIcon>
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search posts by title"
    />
  </Container>
);
