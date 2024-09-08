const Icon = ({ size, color, children }) => {
  const iconStyle = {
    fontSize: size === undefined ? '24px' : size,
    color: color === undefined ? '#000000' : color,
  };

  return (
    <i
      className="material-icons-outlined"
      style={iconStyle}>
      {children}
    </i>
  );
};

export default Icon;
