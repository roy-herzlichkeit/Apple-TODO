const ColorPicker = ({ color = "#ffffff", onChange }) => {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      title="Select color"
    />
  );
};

export default ColorPicker;