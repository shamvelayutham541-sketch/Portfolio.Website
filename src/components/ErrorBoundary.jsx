import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D rendering context error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center w-full h-full text-center p-6 border border-white/10 rounded-2xl bg-surface/30 backdrop-blur-sm min-h-[300px]">
          <div className="text-cyan-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="text-white font-mono text-sm font-semibold mb-2">3D Viewport Unavailable</h4>
          <p className="text-gray-400 text-xs font-sans max-w-xs">
            WebGL is not supported or was disabled in this browser session. The rest of the page remains fully interactive.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
