import React, { useRef, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

// Fix default marker icons (Leaflet bug in Vite/React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Coverage = () => {
  const [areas, setAreas] = useState([]); // ← FIXED
  const mapRef = useRef(null);

  // Fetch JSON on mount
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data); // ← SAVE DATA TO STATE
      })
      .catch((err) => console.error(err));
  }, []);

  const position = [23.685, 90.3563];

  return (
    <div className="px-4 md:px-10 lg:px-20  rounded-3xl relative z-0">
      <h1 className="font-extrabold  text-4xl md:text-5xl my-10 pt-10">
        We are available in 64 districts
      </h1>

      {/* MAP (no navbar overlap) */}
      <div className="py-6 relative z-0">
        <MapContainer
          className="w-full h-[350px] md:h-[500px] lg:h-[650px] rounded-xl overflow-hidden"
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Safe map render */}
          {areas?.map((area, index) => (
            <Marker key={index} position={[area.latitude, area.longitude]}>
              <Popup>
                <strong>{area.district}</strong> <br />
                {area.covered_area?.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
