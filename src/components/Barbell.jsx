function Barbell({ plates, plateUnits, colors }) {
  const getPlateHeight = (weight) => {
    const maxHeight = 120;
    const minHeight = 40;

    const maxWeight = plateUnits === "KG" ? 25 : 45;
    const minWeight = plateUnits === "KG" ? 0.25 : 2.5;

    const ratio =
      (weight - minWeight) / (maxWeight - minWeight);
    return minHeight + ratio * (maxHeight - minHeight);
  };

  const leftSidePlates = [...plates].reverse();
  const rightSidePlates = plates;

  return (
    <div className="barbell">
      <div className="barbell-side">
        {leftSidePlates.map((weight, index) => (
          <div
            key={`left-${index}`}
            className="plate"
            style={{
              height: `${getPlateHeight(weight)}px`,
              backgroundColor: colors ? colors[weight] : "#6b6b6b",
              border: colors && colors[weight] === "#ffffff" ? "2px solid #333" : "none",
            }}
          >
            <span className="plate-label">{weight}</span>
          </div>
        ))}
      </div>

      <div className="barbell-bar"></div>

      <div className="barbell-side">
        {rightSidePlates.map((weight, index) => (
          <div
            key={`right-${index}`}
            className="plate"
            style={{
              height: `${getPlateHeight(weight)}px`,
              backgroundColor: colors ? colors[weight] : "#6b6b6b",
              border: colors && colors[weight] === "#ffffff" ? "2px solid #333" : "none",
            }}
          >
            <span className="plate-label">{weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Barbell;
