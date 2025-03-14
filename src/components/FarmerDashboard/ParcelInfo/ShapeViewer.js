import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Button, Typography } from "@mui/material";
import L from "leaflet";

function ShapeViewer() {
  const [shapes, setShapes] = useState(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const geoJsonData = JSON.parse(e.target.result);
        if (geoJsonData.type === "FeatureCollection") {
          setShapes(geoJsonData.features);
        } else {
          alert("Invalid GeoJSON file. Please upload a valid FeatureCollection.");
        }
      };
      reader.readAsText(file);
    }
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties?.comment) {
      layer.bindPopup(`<b>Comment:</b> ${feature.properties.comment}`);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Shape Viewer
      </Typography>
      <input
        type="file"
        accept=".geojson, .json"
        onChange={handleFileUpload}
        style={{ marginBottom: "20px" }}
      />
      {shapes ? (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "80%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {Array.isArray(shapes) && (
            <GeoJSON
              data={{
                type: "FeatureCollection",
                features: shapes,
              }}
              style={(feature) => ({
                color: feature.properties.color,
                fillColor: feature.properties.color,
                fillOpacity: 0.5,
              })}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      ) : (
        <Typography variant="body1">Upload a GeoJSON file to view shapes.</Typography>
      )}
    </div>
  );
}

export default ShapeViewer;