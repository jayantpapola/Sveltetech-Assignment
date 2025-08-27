// src/components/Card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl shadow p-4 transition hover:shadow-lg
         dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
