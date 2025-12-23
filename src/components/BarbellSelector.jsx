function BarbellSelector({ value, onChange }) {
  return (
    <div className="option-group">
      <label>Barbell</label>
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="barbell"
            value="20"
            checked={value === 20}
            onChange={() => onChange(20)}
          />
          <span>20kg</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="barbell"
            value="15"
            checked={value === 15}
            onChange={() => onChange(15)}
          />
          <span>15kg</span>
        </label>
      </div>
    </div>
  );
}

export default BarbellSelector;
