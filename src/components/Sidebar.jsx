import { useEffect, useState } from "react";

const lineColors = {
  "1": "#FFCE00",
  "2": "#0064B0",
  "3": "#9F9825",
  "3B": "#98D4E2",
  "4": "#C04191",
  "5": "#F28E42",
  "6": "#83C491",
  "7": "#F3A4BA",
  "7B": "#83C491",
  "8": "#CEADD2",
  "9": "#D5C900",
  "10": "#E3B32A",
  "11": "#8D5E2A",
  "12": "#00814F",
  "13": "#98D4E2",
  "14": "#662483"
}

const fontColors = {
  "1": "#000",
  "2": "#fff",
  "3": "#fff",
  "3B": "#000",
  "4": "#fff",
  "5": "#000",
  "6": "#000",
  "7": "#000",
  "7B": "#000",
  "8": "#000",
  "9": "#000",
  "10": "#000",
  "11": "#fff",
  "12": "#fff",
  "13": "#000",
  "14": "#fff"
}

function MetroLineBadge({ line }) {
  const isBis = line.endsWith("B");
  const number = isBis ? line.replace("B", "") : line;
  
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        backgroundColor: lineColors[line] || "#666",
        color: fontColors[line] || "#fff",
        fontWeight: "bold",
        fontSize: "14px",
        marginLeft: "8px",
      }}
    >
      {number}
      {isBis && (
        <span
          style={{
            fontSize: "8px",
            marginLeft: "1px",
            display: "inline-flex",
          }}
        >
          bis
        </span>
      )}
    </span>
  );
}


export default function Sidebar({onSelect,  station }) {
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const selectedName = station?.properties?.name;

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const selectedStation = stations.find(
      (s) => s.properties.name === value
    );

    if (selectedStation) {
      onSelect(selectedStation);
    }
  };

  useEffect(() => {
    fetch("./stations.geojson")
      .then(r => r.json())
      .then(data => setStations(data.features));
  }, []);
  if (!station) {
  return (
    <div className="sidebar">
      <input
        type="search"
        value={search}
        onChange={handleChange}
        placeholder="Search station..."
        list="station-options"
      />

      <datalist id="station-options">
        {stations
          .slice()
          .sort((a, b) =>
            a.properties.name.localeCompare(b.properties.name)
          )
          .map((station, index) => (
            <option
              key={index}
              value={station.properties.name}
            />
          ))}
      </datalist>
      <h2>Explication des Noms de Stations</h2>
      <p>Selectionnez une station pour voir ses informations.</p>
    </div>
  );
  }
  return (
    <div className="sidebar">
      <input
        type="search"
        value={search}
        onChange={handleChange}
        placeholder="Search station..."
        list="station-options"
      />

      <datalist id="station-options">
        {stations
          .slice()
          .sort((a, b) =>
            a.properties.name.localeCompare(b.properties.name)
          )
          .map((station, index) => (
            <option
              key={index}
              value={station.properties.name}
            />
          ))}
      </datalist>
      <h2>{station.properties.name}  
        {station.properties.line.map(line => (<MetroLineBadge key={line} line={line} />))}</h2>
      <h3>Origine:</h3>
      <p>{station.properties.origin}</p>

      <h3>Explication:</h3>
      <p>{station.properties.description}</p>

      {station.properties.fun_fact && (
        <>
          <h3>Anecdote:</h3>
          <p>{station.properties.fun_fact}</p>
        </>
      )}
    </div>
  );
}