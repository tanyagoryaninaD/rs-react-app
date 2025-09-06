import { ReactNode } from 'react';

export type ErrorState = {
  isError: boolean;
};

export interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  context: ContextError;
}

interface ContextError {
  title: string;
  description: string;
  button: string;
}
