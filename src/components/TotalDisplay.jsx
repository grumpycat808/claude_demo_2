function TotalDisplay({ displayTotal, plateUnits }) {
  return (
    <div className="total-display">
      {displayTotal > 0 && (
        <>
          <span className="total-number">
            {displayTotal.toFixed(plateUnits === "KG" ? 0 : 2)}
          </span>{" "}
          <span className="total-unit">{plateUnits}</span>
          <br />
          <span className="total-label">TOTAL</span>
        </>
      )}
    </div>
  );
}

export default TotalDisplay;
