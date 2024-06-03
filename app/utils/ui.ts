export const withActiveToggle = (p, t, c?) => {
  const activeClass = c ?? "font-bold";
  console.log(activeClass, p, t, p === t, p === t ? activeClass : "");
  return p === t ? activeClass : "";
};
