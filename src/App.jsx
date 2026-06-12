import { useState } from "react";
import MetroMap from "./components/MetroMap";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="layout">
      <div className="map">
        <MetroMap onSelect={setSelected} station={selected} />
      </div>
      <Sidebar onSelect = {setSelected} station={selected} />
    </div>
  );
}