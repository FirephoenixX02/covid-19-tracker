import React, { useState } from "react";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  const [map, setmap] = useState(null);
  if (map) {
    map.flyTo(center, zoom);
  }
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} whenCreated={setmap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Loop through countries and draw circles on screen */}
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
