export const withActiveToggle = (p, t, c?) => {
  const activeClass = c ?? "font-bold";
  return p === t ? activeClass : "";
};

// UNIX Timestamp in seconds
export const timestampSeconds = () => {
  return Math.floor(Date.now() / 1000);
};
