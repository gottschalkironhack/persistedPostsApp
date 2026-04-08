import styled from "styled-components";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: #fa5252;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #495057;
  margin: 0 0 20px;
  max-width: 400px;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  padding: 10px 24px;
  background: #228be6;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.15s ease;

  &:hover {
    background: #1c7ed6;
  }
`;

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <Container role="alert">
    <Icon aria-hidden="true">!</Icon>
    <Message>{message}</Message>
    <RetryButton onClick={onRetry}>Retry</RetryButton>
  </Container>
);
