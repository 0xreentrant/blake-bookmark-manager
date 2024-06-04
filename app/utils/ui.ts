export const withActiveToggle = (p, t, c?) => {
  const activeClass = c ?? "font-bold";
  return p === t ? activeClass : "";
};
