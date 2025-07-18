import React from 'react';
export default function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button className={className + ' px-4 py-2 rounded font-bold'} {...props}>
      {children}
    </button>
  );
}
