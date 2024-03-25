import { useState } from 'react';
import { Button } from '@/components';

const Counter = () => {
  const [cnt, setCnt] = useState(0);
  return (
    <div>
      <Button onClick={() => setCnt((count) => count + 1)} variation="outline">
        Count is {cnt}
      </Button>
    </div>
  );
};

export default Counter;
