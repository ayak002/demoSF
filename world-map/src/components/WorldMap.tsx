import React from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import capitalData from "../data/data.json";

const geoUrl = "/topo.json";

interface Capital {
  Country: string;
  "Capital City": string;
  Latitude: number;
  Longitude: number;
}

interface WorldMapProps {
  departure: string;
  arrival: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ departure, arrival }) => {
  const findCapital = (country: string): Capital | undefined =>
    capitalData.find((item) => item.Country.toLowerCase() === country.toLowerCase());
  const departureCapital = findCapital(departure);
  const arrivalCapital = findCapital(arrival);

  const lineCoords = departureCapital && arrivalCapital ? [[departureCapital.Longitude, departureCapital.Latitude], [arrivalCapital.Longitude, arrivalCapital.Latitude]]: [];

  return (
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

      {}
      {lineCoords.length === 2 && (
        <Line
        from={lineCoords[0] as [number, number]}
        to={lineCoords[1] as [number, number]}
        stroke="url(#line-gradient)"
        strokeWidth={1}
        strokeLinecap="round"
      />      
      )}

      {}
      {departureCapital && (
        <Marker coordinates={[departureCapital.Longitude, departureCapital.Latitude]}>
          <circle r={4} fill="white" stroke="#9436D0" strokeWidth={1.5} />
          <text textAnchor="middle" y={-10} fontSize={10}>
            {departureCapital["Capital City"]}
          </text>
        </Marker>
      )}

      {arrivalCapital && (
        <Marker coordinates={[arrivalCapital.Longitude, arrivalCapital.Latitude]}>
          <circle r={4} fill="white" stroke="#56BD9F" strokeWidth={1.5} />
          <text textAnchor="middle" y={-10} fontSize={10}>
            {arrivalCapital["Capital City"]}
          </text>
        </Marker>
      )}
    </ComposableMap>
  );
};

export default WorldMap;