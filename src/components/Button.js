import React from 'react';

export default function Button({tooManyVariants, runApp, label}) {
  return (
    <button
      className="button"
      disabled={tooManyVariants}
      onClick={runApp}
    >
      {label}
    </button>
  );
}
