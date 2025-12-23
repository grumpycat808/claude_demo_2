import { useState } from "react";
import { KG_TO_LBS, LBS_TO_KG } from "../constants/plateConfig";

export function useWeightConverter() {
  const [kgWeight, setKgWeight] = useState("");
  const [lbsWeight, setLbsWeight] = useState("");

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

  return { kgWeight, lbsWeight, handleKgChange, handleLbsChange };
}
