import React from "react";

interface MapTooltipProps {
  info1: string;
  info2: string;
  info3: string;
  x: number;
  y: number;
}

const MapTooltip: React.FC<MapTooltipProps> = ({ info1, info2, info3, x, y }) => {
    return (
      <div
        style={{
          position: "absolute",
          top: y,
          left: x,
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "0.5rem",
          fontSize: "12px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
          pointerEvents: "none",
          transform: "translate(10px, -50%)",
          zIndex: 10,
        }}
      >
        <div>{info1}</div>
        <div>{info2}</div>
        <div>{info3}</div>
      </div>
    );
  };

export default MapTooltip;
