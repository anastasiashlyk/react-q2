import { useState } from 'react';
import './index.css';

function ErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  function handleClick() {
    setShouldThrow(true);
  }
  if (shouldThrow) {
    throw new Error('...');
  }
  return (
    <button onClick={handleClick} className="error-button">
      Throw Error
    </button>
  );
}

export default ErrorButton;
