import { Button } from '@chakra-ui/react';
import React, { FC, useState } from 'react';

const Counter: FC = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const reset = () => setCount(0);

  return (
    <>
      <h1>{count}</h1>
      <div>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={increment}>+1</Button>
      </div>
    </>
  );
};

export default Counter;
