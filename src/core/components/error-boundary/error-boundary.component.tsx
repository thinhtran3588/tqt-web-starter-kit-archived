import React from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(_error): {hasError: boolean} {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(_error, _errorInfo): void {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render(): React.ReactNode {
    const {hasError} = this.state;
    const {children} = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
