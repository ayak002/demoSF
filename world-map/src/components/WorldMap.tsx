import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import MapTooltip from "./ToolTip";
import capitalData from "../data/data.json";

const geoUrl = "/topo.json";

interface Capital {
  Country: string;
  "Capital City": string;
  Latitude: number;
  Longitude: number;
}

interface WorldMapProps {
  countries: string[];
}

const WorldMap: React.FC<WorldMapProps> = ({ countries }) => {

  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const findCapital = (country: string): Capital | undefined =>
    capitalData.find((item) => item.Country.toLowerCase() === country.toLowerCase());
  
  const capitalSteps = countries
  .map((name) => capitalData.find(
    (item) => item.Country.toLowerCase() === name.toLowerCase()
  ))
  .filter(Boolean) as Capital[];

  const lineSegments: [number, number][][] = [];

  for (let i = 0; i < capitalSteps.length - 1; i++) {
    const from: [number, number] = [
      capitalSteps[i].Longitude,
      capitalSteps[i].Latitude,
    ];
    
    const to: [number, number] = [
      capitalSteps[i + 1].Longitude,
      capitalSteps[i + 1].Latitude,
    ];
    
    lineSegments.push([from, to]);    
  }
  const intermediateColors = ["#D9C4E5", "#2F6E60", "#FF6B6B", "#2E2E52"];
  return (
    <div style={{ position: "relative" }}>
      <ComposableMap
        projection="geoEqualEarth"
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
              />
            ))
          }
        </Geographies>
  
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B5E97" />
            <stop offset="50%" stopColor="#5187B0" />
            <stop offset="100%" stopColor="#4E9CAA" />
          </linearGradient>
        </defs>
  
        {lineSegments.map(([from, to], index) => (
          <Line
          key={`line-${index}`}
          from={from as [number, number]}
          to={to as [number, number]}
          stroke="url(#line-gradient)"
          strokeWidth={1}
          strokeLinecap="round"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onMouseMove={(e) =>
          setMousePos({ x: e.clientX, y: e.clientY })
        }
      style={{ cursor: "pointer" }}
    />
  ))}

{capitalSteps.map((capital, index) => {
  let strokeColor = "#888";

  if (index === 0) {
    strokeColor = "#9436D0"; //premier cercle elem violet
  } else if (index === capitalSteps.length - 1) {
    strokeColor = "#56BD9F"; // dernier cercle elem vert
  } else {
    const colorIndex = (index - 1) % intermediateColors.length;
    strokeColor = intermediateColors[colorIndex];
  }

  return (
    <Marker
      key={`marker-${index}`}
      coordinates={[capital.Longitude, capital.Latitude]}
    >
      <circle
        r={4}
        fill="white"
        stroke={strokeColor}
        strokeWidth={1.5}
      />
      <text textAnchor="middle" y={-10} fontSize={10}>
        {capital["Capital City"]}
      </text>
    </Marker>
  );
})}


      </ComposableMap>
  
      {}
      {showTooltip && (
        <MapTooltip
          info1={"info 1"} //iciremplacer par les vrais donnéees 
          info2={"info 2"} // la aussi
          info3={"info 3"} // la aussi
          x={mousePos.x}
          y={mousePos.y}
        />
      )}
    </div>
  );
};

export default WorldMap;