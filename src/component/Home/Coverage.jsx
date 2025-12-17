import React, { useRef, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";

// Fix default marker icons (Leaflet bug in Vite/React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Coverage = () => {
  const [areas, setAreas] = useState([]);
  const mapRef = useRef(null);

  // Fetch JSON on mount
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setAreas(data))
      .catch((err) => console.error(err));
  }, []);

  const position = [23.685, 90.3563];

  return (
    <div className="px-4 md:px-10 lg:px-20 rounded-3xl relative z-0 py-10">
      <motion.h1
        className="font-extrabold text-4xl md:text-5xl text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        We are available in{" "}
        <span className="text-emerald-600">64 districts</span>
      </motion.h1>

      <motion.div
        className="py-6 relative z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <MapContainer
          className="w-full h-[350px] md:h-[500px] lg:h-[650px] rounded-xl overflow-hidden shadow-lg"
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {areas?.map((area, index) => (
            <Marker
              key={index}
              position={[area.latitude, area.longitude]}
              eventHandlers={{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Popup>
                <strong>{area.district}</strong> <br />
                {area.covered_area?.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default Coverage;
