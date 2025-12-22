import { useState } from "react";
import "./App.css";

function App() {
  const [kgWeight, setKgWeight] = useState("");
  const [lbsWeight, setLbsWeight] = useState("");
  const [plateUnits, setPlateUnits] = useState("KG");
  const [barbellWeight, setBarbellWeight] = useState(20);
  const [calculatedPlates, setCalculatedPlates] = useState([]);
  const [displayTotal, setDisplayTotal] = useState(0);

  const KG_TO_LBS = 2.20462;
  const LBS_TO_KG = 1 / KG_TO_LBS;

  const PLATE_WEIGHTS = {
    LB: [45, 35, 25, 10, 5, 2.5],
    KG: [25, 20, 15, 10, 5, 2.5, 1, 0.5, 0.25],
  };

  const KG_PLATE_COLORS = {
    25: "#ed1c24",
    20: "#0066b3",
    15: "#ffd700",
    10: "#00a651",
    5: "#ffffff",
    2.5: "#ed1c24",
    1: "#00a651",
    0.5: "#ffffff",
    0.25: "#ed1c24",
  };

  const handleKgChange = (e) => {
    const value = e.target.value;
    setKgWeight(value);
    if (value === "") {
      setLbsWeight("");
    } else {
      const kg = parseFloat(value);
      if (!isNaN(kg)) {
        setLbsWeight((kg * KG_TO_LBS).toFixed(2));
      }
    }
  };

  const handleLbsChange = (e) => {
    const value = e.target.value;
    setLbsWeight(value);
    if (value === "") {
      setKgWeight("");
    } else {
      const lbs = parseFloat(value);
      if (!isNaN(lbs)) {
        setKgWeight((lbs * LBS_TO_KG).toFixed(2));
      }
    }
  };

  const calculatePlates = () => {
    const targetWeight =
      plateUnits === "KG" ? parseFloat(kgWeight) : parseFloat(lbsWeight);

    if (isNaN(targetWeight) || targetWeight <= 0) {
      setCalculatedPlates([]);
      setDisplayTotal(0);
      return;
    }

    setDisplayTotal(targetWeight);

    const barbell = plateUnits === "KG" ? barbellWeight : barbellWeight * KG_TO_LBS;
    let remainingWeight = targetWeight - barbell;

    if (remainingWeight < 0) {
      setCalculatedPlates([]);
      return;
    }

    const weightPerSide = remainingWeight / 2;
    const plates = [];
    let currentWeight = weightPerSide;

    const availablePlates = PLATE_WEIGHTS[plateUnits];

    for (const plateWeight of availablePlates) {
      while (currentWeight >= plateWeight - 0.01) {
        plates.push(plateWeight);
        currentWeight -= plateWeight;
      }
    }

    setCalculatedPlates(plates);
  };

  return (
    <div className="app">
      <h1 className="title">Plate Math</h1>

      <div className="barbell-container">
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

        <Barbell
          plates={calculatedPlates}
          plateUnits={plateUnits}
          colors={plateUnits === "KG" ? KG_PLATE_COLORS : null}
        />
      </div>

      <div className="controls">
        <div className="weight-inputs">
          <label>Enter Weight</label>
          <div className="input-group">
            <input
              type="number"
              value={kgWeight}
              onChange={handleKgChange}
              placeholder="kg"
              className="weight-input"
            />
            <input
              type="number"
              value={lbsWeight}
              onChange={handleLbsChange}
              placeholder="lbs"
              className="weight-input"
            />
          </div>
        </div>

        <div className="options-row">
          <div className="option-group">
            <label>Plate Units</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="plateUnits"
                  value="LB"
                  checked={plateUnits === "LB"}
                  onChange={(e) => setPlateUnits(e.target.value)}
                />
                <span>LB</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="plateUnits"
                  value="KG"
                  checked={plateUnits === "KG"}
                  onChange={(e) => setPlateUnits(e.target.value)}
                />
                <span>KG</span>
              </label>
            </div>
          </div>

          <div className="option-group">
            <label>Barbell</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="barbell"
                  value="20"
                  checked={barbellWeight === 20}
                  onChange={() => setBarbellWeight(20)}
                />
                <span>20kg</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="barbell"
                  value="15"
                  checked={barbellWeight === 15}
                  onChange={() => setBarbellWeight(15)}
                />
                <span>15kg</span>
              </label>
            </div>
          </div>
        </div>

        <button className="calculate-btn" onClick={calculatePlates}>
          Calculate
        </button>
      </div>
    </div>
  );
}

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

export default App;
