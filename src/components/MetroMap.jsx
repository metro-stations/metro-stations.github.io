import { MapContainer, TileLayer, CircleMarker, Polyline } from "react-leaflet";
import { useEffect, useState } from "react";


export default function MetroMap({ onSelect, station }) {
  const [stations, setStations] = useState([]);
  const selectedName = station?.properties?.name;
  const [lines, setLines] = useState([]);

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

  useEffect(() => {
    fetch("./stations.geojson")
      .then(r => r.json())
      .then(data => setStations(data.features));
  }, []);
  
  useEffect(() => {
    fetch("./lines.geojson")
      .then(r => r.json())
      .then(data => setLines(data.features));
  }, []);

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {lines.map((line, index) => (
        <Polyline
          key={line.properties.name}
          positions={line.geometry.coordinates.map(coord => [coord[0], coord[1]])}
          pathOptions={{ color: lineColors[line.properties.name], weight: 3 }}
        />
      ))}
      {stations.map((station, index) => (
        
        <CircleMarker
          key={station.properties.name}
          center={[
            station.geometry.coordinates[0],
            station.geometry.coordinates[1]
          ]}
          radius={selectedName === station.properties.name ? 12 : 7}
          pathOptions={{
            color: selectedName === station.properties.name ? "red" : lineColors[station.properties.line[0]],
          }}
          eventHandlers={{
            click() {
              //setSelectedName(station.properties.name);
              onSelect(station);
            }
          }}
        />
      ))}
    </MapContainer>
  );
}