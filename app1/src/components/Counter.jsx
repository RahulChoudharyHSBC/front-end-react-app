import React, { useState } from 'react';

export default function Counter({ hitcount }) {
    const [currentHitCount, setCurrentHitCount] = useState(hitcount);

  return (
    <div>
      <p>Hit count: {currentHitCount}</p>
      <hr/>
      <button onClick={() => setCurrentHitCount(currentHitCount + 1)}>
        Click me increase count!
      </button><hr/>
      <button onClick={() => setCurrentHitCount(currentHitCount - 1)}>
        Click me decrease count!
      </button>
    </div>
  );
}