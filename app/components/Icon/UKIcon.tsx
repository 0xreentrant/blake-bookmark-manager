const Icon = (props) => {
  const { icon, ...params } = props;
  return <span uk-icon={icon} {...params} />;
};
export default Icon;
