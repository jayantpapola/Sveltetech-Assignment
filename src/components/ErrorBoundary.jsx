import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log errors to an external service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can customize the fallback UI here
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200">
          <h1 className="text-2xl font-bold mb-4">Something went wrong 😢</h1>
          <p className="mb-4">{this.state.error?.toString()}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Reload App
          </button>
        </div>
      );
    }

    // Render children normally if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
