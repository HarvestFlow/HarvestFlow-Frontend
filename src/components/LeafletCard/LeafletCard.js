import React from "react";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";  // Import EditControl from react-leaflet-draw

function MapWithComments() {

  const _onEdited = (e) => {
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
  };

  const _onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    } else {
      console.log("_onCreated: something else created:", type, e);
    }

    console.log("Geojson", layer.toGeoJSON());
  };

  const _onDeleted = (e) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Add a marker */}
      <Marker position={[51.505, -0.09]}>
        <Popup>A marker without an image!</Popup>
      </Marker>
      
      {/* Feature group to hold your shapes */}
      <FeatureGroup>
        {/* EditControl with hooks */}
        <EditControl
          position="topleft"
          onCreated={_onCreated}
          onEdited={_onEdited}
          onDeleted={_onDeleted}
          draw={{
            polyline: true,
            polygon: true,
            rectangle: true,
            circle: true,
            circlemarker: true,
            marker: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}

export default MapWithComments; 