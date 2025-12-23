function WeightInputs({ kgWeight, lbsWeight, onKgChange, onLbsChange }) {
  return (
    <div className="weight-inputs">
      <label>Enter Weight</label>
      <div className="input-group">
        <input
          type="number"
          value={kgWeight}
          onChange={onKgChange}
          placeholder="kg"
          className="weight-input"
        />
        <input
          type="number"
          value={lbsWeight}
          onChange={onLbsChange}
          placeholder="lbs"
          className="weight-input"
        />
      </div>
    </div>
  );
}

export default WeightInputs;
