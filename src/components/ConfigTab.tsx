import { useState } from "react";
import Slider from "rc-slider";
import { Select, SelectItem } from "@tremor/react";
import "rc-slider/assets/index.css";
import "tailwindcss/tailwind.css";

const MIN_VALUE = -1000; // Adjust the minimum value
const DEFAULT_MAX_VALUE = 1000; // Adjust the maximum value

const ConfigTab = () => {
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(DEFAULT_MAX_VALUE);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '') {
      setValue(0);
    } else if (Number(newValue) >= -maxValue && Number(newValue) <= maxValue) {
      setValue(Number(newValue));
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setValue(value);
    }
  };

  //   const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const newMaxValue = event.target.value;
  //     if (newMaxValue === '' || Number(newMaxValue) >= MIN_VALUE) {
  //       setMaxValue(Number(newMaxValue));
  //       if (value > Number(newMaxValue)) {
  //         setValue(Number(newMaxValue));
  //       }
  //     }
  //   };

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = event.target.value;
    if (newMaxValue === "" || Number(newMaxValue) >= MIN_VALUE) {
      setMaxValue(Number(newMaxValue));
      if (value > Number(newMaxValue)) {
        setValue(Number(newMaxValue));
      }
      // Set the minimum value as the negative value of the new maximum value
      const newMinValue = -Number(newMaxValue);
      if (newMinValue <= value) {
        setValue(newMinValue);
      }
    }
  };

  return (
    <div className="flex-1 ">
      <div className="flex items-center gap-4 mt-4">
        <Select
          id="category"
          className="max-w-full sm:max-w-xs"
          defaultValue={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectItem value="c1">Inflows</SelectItem>
          <SelectItem value="c2">Outflows</SelectItem>
          <SelectItem value="revenue">Revenue</SelectItem>
          <SelectItem value="closing">Closing</SelectItem>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="maxValue" className="text-lg mr-2">
          Max Value:
        </label>
        <input
          type="text"
          id="maxValue"
          value={maxValue}
          onChange={handleMaxValueChange}
          placeholder={`Enter a maximum value greater than or equal to ${MIN_VALUE}`}
          className="w-48 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <label htmlFor="value" className="text-lg mr-2">
          Value:
        </label>
        <input
          type="text"
          id="value"
          value={value}
          onChange={handleInputChange}
          placeholder={`Enter a value between ${MIN_VALUE} and ${maxValue}`}
          className="w-48 p-2 border border-gray-300 rounded transition duration-500 ease-in-out focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Slider
          value={value}
          onChange={handleSliderChange}
          min={-maxValue}
          max={maxValue}
          className="w-48 transition duration-500 ease-in-out"
        />
      </div>
    </div>
  );
};

export default ConfigTab;
