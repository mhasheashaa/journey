// Custom Timer Implementation

export const timer = () => {
  const t = performance.now();

  const elapsed = () => {
    return (performance.now() - t) / 1000;
  };

  return elapsed;
};
