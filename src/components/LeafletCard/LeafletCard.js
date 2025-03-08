import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Typography } from "@mui/material";
import Sidebar from "../SideNavBar/SideNavBar";
import axios from "axios";

function MapWithComments() {
  const [shapes, setShapes] = useState([]);
  const [shapeColor, setShapeColor] = useState("#ff0000");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentShapeId, setCurrentShapeId] = useState(null);
  const [currentComment, setCurrentComment] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const featureGroupRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getProfile", { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserId(response.data._id);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Authentication error:", error);
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchShapes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/parcelle/parcelle/${userId}`);
        if (Array.isArray(response.data)) {
          const allShapes = response.data.flatMap(item => item.shapes || []);
          setShapes(allShapes);
        } else {
          console.error("Unexpected response format", response.data);
          setShapes([]);
        }
      } catch (error) {
        console.error("Error fetching shapes:", error);
      }
    };

    fetchShapes();
  }, [userId]);

  const updateShapesInBackend = async (updatedShapes) => {
    try {
      const validShapes = updatedShapes.filter(shape => shape.geometry && shape.geometry.coordinates.length > 0);
      const response = await axios.post("http://localhost:5000/parcelle/parcelle", { userId, shapes: validShapes });
      setShapes(response.data.shapes);
    } catch (error) {
      console.error("Error saving shapes:", error);
    }
  };

  const deleteShapeInBackend = async (shapeId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/parcelle/parcelle/${userId}/${shapeId}`);
      if (response.data.success) {
        const updatedShapes = shapes.filter((shape) => shape.properties.id !== parseInt(shapeId));
        setShapes(updatedShapes);
      }
    } catch (error) {
      console.error("Error deleting shape:", error);
    }
  };

  const _onCreated = (e) => {
    const layer = e.layer;
    const geoJson = layer.toGeoJSON();
    geoJson.properties = { id: L.stamp(layer), color: shapeColor, comment: "" };

    if (layer.setStyle) {
      layer.setStyle({ color: shapeColor, fillColor: shapeColor, fillOpacity: 0.5 });
    }

    const updatedShapes = [...shapes, geoJson];
    setShapes(updatedShapes);
    updateShapesInBackend(updatedShapes);
    featureGroupRef.current?.addLayer(layer);
  };

  const _onDeleted = (e) => {
    const deletedIds = new Set();
    e.layers.eachLayer((layer) => {
      let id = layer.feature?.properties?.id || layer._leaflet_id;
      if (id) deletedIds.add(id);
    });

    deletedIds.forEach((id) => deleteShapeInBackend(id));
  };

  const handleDeleteFromDialog = () => {
    deleteShapeInBackend(currentShapeId);
    setOpenDialog(false);
  };

  const handleEditComment = (id, comment) => {
    setCurrentShapeId(id);
    setCurrentComment(comment);
    setOpenDialog(true);
  };

  const handleCommentChange = (e) => setCurrentComment(e.target.value);

  const handleSaveComment = () => {
    const updatedShapes = shapes.map((shape) =>
      shape.properties.id === currentShapeId
        ? { ...shape, properties: { ...shape.properties, comment: currentComment } }
        : shape
    );
    setShapes(updatedShapes);
    updateShapesInBackend(updatedShapes);
    setOpenDialog(false);
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties?.id) {
      layer.on("click", () => handleEditComment(feature.properties.id, feature.properties.comment));
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen?.();
    } else {
      mapWrapperRef.current?.requestFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: sidebarCollapsed ? "0" : "200px", transition: "width 0.3s", height: "100vh", overflow: "hidden" }}>
        <Sidebar />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ padding: "10px" }}>
          <label>Choose a color: </label>
          <input type="color" value={shapeColor} onChange={(e) => setShapeColor(e.target.value)} />
          <button onClick={toggleFullscreen}>{isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}</button>
          <button onClick={toggleSidebar}>{sidebarCollapsed ? "Open Sidebar" : "Collapse Sidebar"}</button>
        </div>

        <div ref={mapWrapperRef} style={{ flex: 1, height: "100%", width: "100%" }}>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FeatureGroup ref={featureGroupRef}>
              {Array.isArray(shapes) && shapes.map((shape) =>
                shape.properties?.id ? (
                  <GeoJSON
                    key={shape.properties.id}
                    data={shape}
                    style={() => ({ color: shape.properties.color, fillColor: shape.properties.color, fillOpacity: 0.5 })}
                    onEachFeature={onEachFeature}
                  />
                ) : null
              )}
              <EditControl position="topleft" onCreated={_onCreated} onDeleted={_onDeleted} draw={{ polyline: true, polygon: true, rectangle: true, circle: true, marker: true }} />
            </FeatureGroup>
          </MapContainer>
        </div>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit or Delete Shape</DialogTitle>
          <DialogContent>
            <Typography variant="body1"><strong>Current Comment:</strong> {currentComment || "No comment."}</Typography>
            <TextField autoFocus margin="dense" label="Edit Comment" fullWidth variant="outlined" value={currentComment} onChange={handleCommentChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteFromDialog} color="secondary">Delete</Button>
            <Button onClick={handleSaveComment} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default MapWithComments;