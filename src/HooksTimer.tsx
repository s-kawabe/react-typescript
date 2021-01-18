import React, { FC, useEffect, useState } from 'react';
import { Button, Box } from '@chakra-ui/react';

const HooksTimer: FC<{ limit: number }> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const reset = (): void => setTimeLeft(limit);
  const tick = (): void => setTimeLeft((t) => t - 1);

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) setTimeLeft(limit);
  }, [timeLeft, limit]);

  return (
    <Box m={4}>
      <Box>{timeLeft}</Box>
      <Box>
        <Button onClick={reset}>Reset</Button>
      </Box>
    </Box>
  );
};

export default HooksTimer;
