import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat"; // Importation du plugin heatmap
import "leaflet/dist/leaflet.css"; // CSS de Leaflet

function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) {
      console.log("Aucune donnée pour la heatmap");
      return;
    }

    console.log("Ajout de la heatmap avec les données :", data);
    const heat = L.heatLayer(data, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, data]); // Dépendance sur map et data

  return null;
}

function Heatmap() {
  // Exemple de données statiques pour tester
  const [farmData, setFarmData] = useState([
    [37.7749, -122.4194, 0.8],
    [37.782, -122.447, 0.5],
    [37.795, -122.435, 0.9],
    [37.76, -122.43, 0.3],
  ]);

  // Exemple de chargement asynchrone (remplacez par votre API)
  useEffect(() => {
    // Simuler une requête API
    setTimeout(() => {
      const fetchedData = [
        [37.7749, -122.4194, 0.8],
        [37.782, -122.447, 0.5],
      ];
      setFarmData(fetchedData);
    }, 1000);
  }, []);

  return (
    <MapContainer
      center={[37.7749, -122.4194]} // Ajustez selon vos données
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer data={farmData} />
    </MapContainer>
  );
}

export default Heatmap;