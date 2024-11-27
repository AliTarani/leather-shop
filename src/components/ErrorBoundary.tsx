import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode; // Declare 'children' prop with type 'ReactNode'
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state to render fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to an external service (e.g., Sentry)
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }
  resetError = () => {
    // Reset the error state to re-enable the children
    this.setState({ hasError: false, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          {/* TODO: open modal */}
          خطایی رخ داده.
          <button onClick={this.resetError}>بستن</button>
        </div>
      );
    }

    return this.props.children; // Access 'children' prop here
  }
}

export default ErrorBoundary;
