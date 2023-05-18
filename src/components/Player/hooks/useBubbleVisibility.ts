import { useState, useEffect } from 'react';

function useBubbleVisibility(bubble: string | null, timeout = 3000) {
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  useEffect(() => {
    if (!bubble) return;

    setIsBubbleVisible(true);

    const bubbleTimeout = setTimeout(() => setIsBubbleVisible(false), timeout);

    return () => {
      setIsBubbleVisible(false);
      clearTimeout(bubbleTimeout);
    };
  }, [bubble, timeout]);

  return isBubbleVisible;
}

export default useBubbleVisibility;
