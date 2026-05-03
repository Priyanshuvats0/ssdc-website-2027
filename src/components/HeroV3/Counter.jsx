import { useState, useEffect } from "react";

const Counter = ({ value, suffix = "", delay = 0 }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const s = performance.now();
      const tick = (now) => {
        const p = Math.min((now - s) / 1800, 1);
        setN(Math.round((1 - Math.pow(2, -10 * p)) * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return <>{n}{suffix}</>;
};

export default Counter;
