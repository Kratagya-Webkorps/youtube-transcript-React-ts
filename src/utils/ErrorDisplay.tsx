import React from "react";

interface ErrorDisplayProps {
  error: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => (
  error ? <div className="m-5 justify-center items-center mb-2 text-2xl font-bold tracking-tight text-gray-900">{error}</div> : null
);

export default ErrorDisplay;
