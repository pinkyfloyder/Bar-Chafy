import React from 'react';
export default function TextInput({ id, type = 'text', className = '', value, onChange, ...props }) {
  return (
    <input
      id={id}
      type={type}
      className={className + ' px-3 py-2 rounded border'}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
