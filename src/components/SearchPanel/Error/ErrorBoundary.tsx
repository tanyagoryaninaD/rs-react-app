'use client';

import React, { type ErrorInfo } from 'react';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../../../types/interfaces';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary', error, errorInfo);
  }

  private handleClick = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error error-container">
          <h2>{this.props.context.title}</h2>
          <p>{this.state.errorMessage ?? this.props.context.description}</p>
          <button className="error__btn" onClick={this.handleClick}>
            {this.props.context.button}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
