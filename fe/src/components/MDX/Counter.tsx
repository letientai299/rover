import { useState } from 'react';

const Counter = () => {
  const [cnt, setCnt] = useState(0);
  return (
    <div>
      <button onClick={() => setCnt((count) => count + 1)}>
        Count is {cnt}
      </button>
    </div>
  );
};

export default Counter;
