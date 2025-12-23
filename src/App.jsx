import { useState } from "react";
import "./App.css";
import { KG_TO_LBS, PLATE_WEIGHTS, KG_PLATE_COLORS } from "./constants/plateConfig";
import { useWeightConverter } from "./hooks/useWeightConverter";
import Barbell from "./components/Barbell";
import TotalDisplay from "./components/TotalDisplay";
import CalculateButton from "./components/CalculateButton";
import WeightInputs from "./components/WeightInputs";
import PlateUnitsSelector from "./components/PlateUnitsSelector";
import BarbellSelector from "./components/BarbellSelector";

function App() {
  const { kgWeight, lbsWeight, handleKgChange, handleLbsChange } = useWeightConverter();
  const [plateUnits, setPlateUnits] = useState("KG");
  const [barbellWeight, setBarbellWeight] = useState(20);
  const [calculatedPlates, setCalculatedPlates] = useState([]);
  const [displayTotal, setDisplayTotal] = useState(0);

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
        <TotalDisplay displayTotal={displayTotal} plateUnits={plateUnits} />

        <Barbell
          plates={calculatedPlates}
          plateUnits={plateUnits}
          colors={plateUnits === "KG" ? KG_PLATE_COLORS : null}
        />
      </div>

      <div className="controls">
        <WeightInputs
          kgWeight={kgWeight}
          lbsWeight={lbsWeight}
          onKgChange={handleKgChange}
          onLbsChange={handleLbsChange}
        />

        <div className="options-row">
          <PlateUnitsSelector value={plateUnits} onChange={setPlateUnits} />
          <BarbellSelector value={barbellWeight} onChange={setBarbellWeight} />
        </div>

        <CalculateButton onClick={calculatePlates} />
      </div>
    </div>
  );
}

export default App;
