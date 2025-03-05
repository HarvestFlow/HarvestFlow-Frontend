import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from "@mui/material";

function MapWithComments() {
  const [shapes, setShapes] = useState([]);
  const [shapeColor, setShapeColor] = useState("#ff0000"); // Default color
  const [openDialog, setOpenDialog] = useState(false);
  const [currentShapeId, setCurrentShapeId] = useState(null);
  const [currentComment, setCurrentComment] = useState("");
  const featureGroupRef = useRef(null);

  // Load shapes from localStorage on mount
  useEffect(() => {
    const savedShapes = localStorage.getItem("mapShapes");
    if (savedShapes) {
      try {
        const parsedShapes = JSON.parse(savedShapes);
        if (Array.isArray(parsedShapes)) {
          setShapes(parsedShapes);
        } else {
          console.error("Invalid shapes data in localStorage.");
        }
      } catch (error) {
        console.error("Failed to parse shapes from localStorage:", error);
      }
    }
  }, []);

  // Save shapes to localStorage
  const saveShapesToLocalStorage = (updatedShapes) => {
    localStorage.setItem("mapShapes", JSON.stringify(updatedShapes));
  };

  // Handle shape creation
  const _onCreated = (e) => {
    let layer = e.layer;
    let geoJson = layer.toGeoJSON();

    geoJson.properties = { id: L.stamp(layer), color: shapeColor, comment: "" };

    // Apply color to the newly created shape
    if (layer.setStyle) {
      layer.setStyle({
        color: shapeColor,
        fillColor: shapeColor,
        fillOpacity: 0.5,
      });
    }

    // Add to the state
    setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes, geoJson];
      saveShapesToLocalStorage(updatedShapes);
      return updatedShapes;
    });

    featureGroupRef.current?.addLayer(layer);
  };

  // Handle shape deletion
  const _onDeleted = (e) => {
    const deletedIds = new Set();
    e.layers.eachLayer((layer) => {
      let id = layer.feature?.properties?.id || layer._leaflet_id;
      if (id) deletedIds.add(id);
    });

    setShapes((prevShapes) => {
      const updatedShapes = prevShapes.filter(
        (shape) => !deletedIds.has(shape.properties?.id)
      );
      saveShapesToLocalStorage(updatedShapes);
      return updatedShapes;
    });
  };

  // Handle editing comments
  const handleEditComment = (id, comment) => {
    setCurrentShapeId(id);
    setCurrentComment(comment);
    setOpenDialog(true);
  };

  // Handle comment change
  const handleCommentChange = (e) => {
    setCurrentComment(e.target.value);
  };

  // Save comment change
  const handleSaveComment = () => {
    setShapes((prevShapes) => {
      const updatedShapes = prevShapes.map((shape) =>
        shape.properties.id === currentShapeId
          ? { ...shape, properties: { ...shape.properties, comment: currentComment } }
          : shape
      );
      saveShapesToLocalStorage(updatedShapes);
      return updatedShapes;
    });
    setOpenDialog(false); // Close the dialog after saving the comment
  };

  // Function to create a Popup content (with custom comment edit button)
  const onEachFeature = (feature, layer) => {
    const shapeId = feature.properties.id;
    const comment = feature.properties.comment || "Aucun commentaire.";

    // Set up click handler for each feature
    layer.on("click", () => {
      handleEditComment(shapeId, comment);
    });
  };

  return (
    <div>
      <label>Choisir une couleur: </label>
      <input
        type="color"
        value={shapeColor}
        onChange={(e) => setShapeColor(e.target.value)}
      />

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <FeatureGroup ref={featureGroupRef}>
          {shapes.map((shape) => (
            <GeoJSON
              key={shape.properties.id}
              data={shape}
              style={() => ({
                color: shape.properties.color || "blue",
                fillColor: shape.properties.color || "blue",
                fillOpacity: 0.5,
              })}
              onEachFeature={onEachFeature} // Attach click handler to each feature
            />
          ))}

          <EditControl
            position="topleft"
            onCreated={_onCreated}
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

      {/* Dialog for editing comments */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier le commentaire</DialogTitle>
        <DialogContent>
          {/* Section 1: Display the current comment */}
          <Typography variant="body1" gutterBottom>
            <strong>Commentaire actuel :</strong> {currentComment || "Aucun commentaire."}
          </Typography>

          {/* Section 2: Input field for modifying the comment */}
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Modifier le commentaire"
            type="text"
            fullWidth
            variant="outlined"
            value={currentComment}
            onChange={handleCommentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveComment} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MapWithComments;
