import React from 'react';
export default function InputError({ message, className = '' }) {
  if (!message) return null;
  return <div className={className + ' text-red-400 text-sm'}>{message}</div>;
}
