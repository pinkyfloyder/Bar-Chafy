import React from 'react';
export default function InputLabel({ htmlFor, value, className = '', ...props }) {
  return (
    <label htmlFor={htmlFor} className={className + ' font-semibold'} {...props}>
      {value}
    </label>
  );
}
