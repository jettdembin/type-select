import { useState } from "react";
import "./App.css";
import { Select } from "./Select";

type SelectOption = {
  multiple?: false;
  label: string;
  value: any;
};

const options = [
  { label: "First", value: "1" },
  { label: "Second", value: "2" },
  { label: "Third", value: "3" },
  { label: "Fourth", value: "4" },
  { label: "Fifth", value: "5" },
];

function App() {
  const [value, setValue] = useState<SelectOption[] | undefined>(options[0]);
  return (
    <div className="App">
      <Select options={options} onChange={(o) => setValue(o)} value={value} />
      <Select
        options={options}
        onChange={(o) => setValue(o)}
        value={value}
        multiple
      />
    </div>
  );
}

export default App;
