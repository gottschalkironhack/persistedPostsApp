import { Component, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  margin: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #c92a2a;
  margin: 0 0 12px;
`;

const Message = styled.p`
  font-size: 0.95rem;
  color: #495057;
  margin: 0 0 20px;
  max-width: 500px;
  line-height: 1.5;
`;

const ReloadButton = styled.button`
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

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <Container role="alert">
        <Title>Something went wrong</Title>
        <Message>
          {this.state.error?.message || "An unexpected error occurred while rendering this page."}
        </Message>
        <ReloadButton onClick={this.handleReload}>Try Again</ReloadButton>
      </Container>
    );
  }
}
