function PlateUnitsSelector({ value, onChange }) {
  return (
    <div className="option-group">
      <label>Plate Units</label>
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="plateUnits"
            value="LB"
            checked={value === "LB"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>LB</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="plateUnits"
            value="KG"
            checked={value === "KG"}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>KG</span>
        </label>
      </div>
    </div>
  );
}

export default PlateUnitsSelector;
