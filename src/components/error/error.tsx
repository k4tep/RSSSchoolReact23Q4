import React, { Component, ErrorInfo } from 'react';
import classes from './error.module.css';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={classes.error}>
          <h1>Oops, you clicked the wrong button</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
