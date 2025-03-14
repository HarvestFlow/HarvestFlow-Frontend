import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button, Modal, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map as MapIcon } from "react-bootstrap-icons";
import center from "@turf/center";
import bbox from "@turf/bbox";
import "./ParcelInfo.css";
import Sidebar from "../../SideNavBar/SideNavBar";

function ParcelInfo() {
  const [shapes, setShapes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapShape, setMapShape] = useState(null);
  const [formData, setFormData] = useState({
    cropType: "",
    plantingDate: "",
    growthStage: "",
    estimatedYield: "",
    expectedHarvestDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

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
        navigate("/404");
        console.error("Authentication error:", error);
      }
    };
    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchShapes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/parcelle/parcelle/${userId}`, { withCredentials: true });
        if (Array.isArray(response.data)) {
          const allShapes = response.data.flatMap((parcelle) =>
            parcelle.shapes.map((shape) => ({ ...shape, parcelleId: parcelle._id }))
          );
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

  const handleSelectShape = (shape) => {
    setSelectedShape(shape);
    setFormData({
      cropType: shape.properties.cropType || "",
      plantingDate: shape.properties.plantingDate || "",
      growthStage: shape.properties.growthStage || "",
      estimatedYield: shape.properties.estimatedYield || "",
      expectedHarvestDate: shape.properties.expectedHarvestDate || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedShape(null);
    setFormData({
      cropType: "",
      plantingDate: "",
      growthStage: "",
      estimatedYield: "",
      expectedHarvestDate: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !selectedShape) return;

    const { cropType, plantingDate, growthStage, estimatedYield, expectedHarvestDate } = formData;

    const updatedShape = {
      cropType,
      plantingDate,
      growthStage,
      estimatedYield,
      expectedHarvestDate,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/parcelle/parcelle/${userId}/${selectedShape._id}`,
        updatedShape
      );
      const updatedShapes = shapes.map((shape) =>
        shape._id === selectedShape._id ? response.data : shape
      );
      setShapes(updatedShapes);
      handleCloseModal();
    } catch (error) {
      console.error("Error updating shape:", error);
    }
  };

  const handleShowMap = (shape) => {
    setMapShape(shape);
    setShowMapModal(true);
  };

  const handleCloseMapModal = () => {
    setShowMapModal(false);
    setMapShape(null);
  };

  // Nouvelle fonction pour naviguer vers la page des observations
  const handleShowDetails = (shape) => {
    navigate(`/observations/${shape._id}`, { state: { parcelleId: shape.parcelleId, shapeId: shape._id } });
  };

  const renderShapeMap = (shape) => {
    const shapeCenter = center(shape).geometry.coordinates; // [lng, lat]
    const [minLng, minLat, maxLng, maxLat] = bbox(shape); // Bounding box

    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);
    const baseZoom = Math.floor(14 - Math.log2(maxDiff * 100));
    const zoom = Math.min(18, baseZoom * 1.2);

    return (
      <MapContainer
        center={[shapeCenter[1], shapeCenter[0]]}
        zoom={zoom}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          data={shape}
          style={() => ({
            color: shape.properties.color,
            fillColor: shape.properties.color,
            fillOpacity: 0.5,
          })}
        />
      </MapContainer>
    );
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShapes = shapes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(shapes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h2 className="text-center mb-3">Parcel Information</h2>

        <div className="table-responsive">
          <Table className="simple-table" bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Map</th>
                <th>Color</th>
                <th>Comment</th>
                <th>Crop Type</th>
                <th>Planting Date</th>
                <th>Growth Stage</th>
                <th>Estimated Yield</th>
                <th>Expected Harvest Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentShapes.length > 0 ? (
                currentShapes.map((shape, index) => (
                  <tr key={index}>
                    <td>{shape.properties.id}</td>
                    <td>
                      <Button
                        variant="link"
                        onClick={() => handleShowMap(shape)}
                        style={{ padding: 0 }}
                      >
                        <MapIcon size={20} />
                      </Button>
                    </td>
                    <td>
                      <span
                        className="color-dot"
                        style={{ backgroundColor: shape.properties.color }}
                      ></span>
                    </td>
                    <td>{shape.properties.comment || "N/A"}</td>
                    <td>{shape.properties.cropType || "N/A"}</td>
                    <td>{shape.properties.plantingDate || "N/A"}</td>
                    <td>{shape.properties.growthStage || "N/A"}</td>
                    <td>{shape.properties.estimatedYield || "N/A"}</td>
                    <td>{shape.properties.expectedHarvestDate || "N/A"}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSelectShape(shape)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleShowDetails(shape)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No shapes found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {shapes.length > itemsPerPage && (
            <Pagination className="justify-content-center mt-3">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
        </div>

        {/* Modal for Editing */}
        <Modal show={showModal} onHide={handleCloseModal} style={{ marginTop: "40px" }}>
          <Modal.Header closeButton>
            <Modal.Title>Update Shape</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Crop Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="cropType"
                      value={formData.cropType}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Planting Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="plantingDate"
                      value={formData.plantingDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Growth Stage</Form.Label>
                    <Form.Control
                      type="text"
                      name="growthStage"
                      value={formData.growthStage}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Estimated Yield</Form.Label>
                    <Form.Control
                      type="number"
                      name="estimatedYield"
                      value={formData.estimatedYield}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Expected Harvest Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="expectedHarvestDate"
                      value={formData.expectedHarvestDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for Map Preview */}
        <Modal show={showMapModal} onHide={handleCloseMapModal} size="lg" style={{ marginTop: "40px" }}>
          <Modal.Header closeButton>
            <Modal.Title>Map Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {mapShape && renderShapeMap(mapShape)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseMapModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ParcelInfo;