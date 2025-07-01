import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Pagination, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map as MapIcon, Eye, PencilSquare, Activity, Globe, PinMap } from "react-bootstrap-icons";
import center from "@turf/center";
import bbox from "@turf/bbox";
import L from "leaflet";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import ProfileActivationDialog from "../farmerprofile/ProfileActivationDialog";
import "./ParcelInfo.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ParcelInfo() {
  const [shapes, setShapes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isActivated, setIsActivated] = useState(true);
  const [showActivationDialog, setShowActivationDialog] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapShape, setMapShape] = useState(null);
  const [formData, setFormData] = useState({
    cropType: "",
    plantingDate: "",
    growthStage: "",
    expectedHarvestDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  const cropTypes = ["Wheat", "Barley", "Oat"];
  const growthStages = [
    "Germination and Emergence",
    "Leaf Development",
    "Tillering",
    "Stem Elongation",
    "Booting",
    "Ear Emergence",
    "Flowering",
    "Milk Development",
    "Dough Development",
    "Ripening",
  ];

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getProfile", { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserId(response.data._id);
          setIsActivated(response.data.isActivated);
          if (!response.data.isActivated) {
            setShowActivationDialog(true);
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        setIsActivated(true);
        navigate("/404");
        console.error("Authentication error:", error);
      }
    };
    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    if (!userId || !isActivated) return;

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
  }, [userId, isActivated]);

  const getChartData = () => {
    const stageCounts = growthStages.reduce((acc, stage) => {
      acc[stage] = shapes.filter((shape) => shape.properties.growthStage === stage && shape.geometry.type !== "Point").length;
      return acc;
    }, {});

    return {
      labels: growthStages,
      datasets: [
        {
          label: "Number of Parcels",
          data: growthStages.map((stage) => stageCounts[stage] || 0),
          backgroundColor: ["#4CAF50", "#81C784", "#A5D6A7", "#C8E6C9", "#D4E157", "#FFCA28", "#FF8A65", "#EF5350", "#AB47BC", "#5C6BC0"],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Growth Stage Distribution" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Number of Parcels" } },
      x: { title: { display: true, text: "Growth Stages" } },
    },
  };

  const handleSelectShapeForEdit = (shape) => {
    setSelectedShape(shape);
    setFormData({
      cropType: shape.properties.cropType || "",
      plantingDate: shape.properties.plantingDate || "",
      growthStage: shape.properties.growthStage || "",
      expectedHarvestDate: shape.properties.expectedHarvestDate || "",
    });
    setShowEditModal(true);
  };

  const handleSelectShapeForDetails = (shape) => {
    setSelectedShape(shape);
    setShowDetailsModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedShape(null);
    setFormData({
      cropType: "",
      plantingDate: "",
      growthStage: "",
      expectedHarvestDate: "",
    });
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedShape(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !selectedShape) return;

    const { cropType, plantingDate, growthStage, expectedHarvestDate } = formData;

    const updatedShape = {
      cropType,
      plantingDate,
      growthStage,
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
      handleCloseEditModal();
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

  const handleShowObservations = (shape) => {
    navigate(`/dashboard/observations/${shape._id}`, { state: { parcelleId: shape.parcelleId, shapeId: shape._id } });
  };

  const renderShapeMap = (shape) => {
    if (shape.geometry.type === "Point") {
      const [lng, lat] = shape.geometry.coordinates;
      return (
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]}>
            <Popup>
              <strong>ID:</strong> {shape.properties.id || "N/A"} <br />
              <strong>Comment:</strong> {shape.properties.comment || "N/A"}
            </Popup>
          </Marker>
        </MapContainer>
      );
    }

    const shapeCenter = center(shape).geometry.coordinates;
    const [minLng, minLat, maxLng, maxLat] = bbox(shape);
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
        >
          <Popup>
            <strong>ID:</strong> {shape.properties.id || "N/A"} <br />
            <strong>Crop Type:</strong> {shape.properties.cropType || "N/A"} <br />
            <strong>Growth Stage:</strong> {shape.properties.growthStage || "N/A"}
          </Popup>
        </GeoJSON>
      </MapContainer>
    );
  };

  const renderAllShapesMap = () => {
    if (shapes.length === 0) return null;

    // Calculate bounds including points and polygons
    const bounds = [];
    shapes.forEach((shape) => {
      if (shape.geometry.type === "Point") {
        const [lng, lat] = shape.geometry.coordinates;
        bounds.push([lat, lng]);
      } else {
        const [minLng, minLat, maxLng, maxLat] = bbox(shape);
        bounds.push([minLat, minLng], [maxLat, maxLng]);
      }
    });

    if (bounds.length === 0) return null;

    const minLat = Math.min(...bounds.map((b) => b[0]));
    const maxLat = Math.max(...bounds.map((b) => b[0]));
    const minLng = Math.min(...bounds.map((b) => b[1]));
    const maxLng = Math.max(...bounds.map((b) => b[1]));
    const mapBounds = [
      [minLat, minLng],
      [maxLat, maxLng],
    ];

    return (
      <MapContainer
        bounds={mapBounds}
        style={{ height: "250px", width: "100%", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shapes.map((shape, index) => {
          if (shape.geometry.type === "Point") {
            const [lng, lat] = shape.geometry.coordinates;
            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>
                  <strong>ID:</strong> {shape.properties.id || "N/A"} <br />
                  <strong>Comment:</strong> {shape.properties.comment || "N/A"}
                </Popup>
              </Marker>
            );
          }
          return (
            <GeoJSON
              key={index}
              data={shape}
              style={() => ({
                color: shape.properties.color,
                fillColor: shape.properties.color,
                fillOpacity: 0.5,
                weight: 2,
              })}
            >
              <Popup>
                <strong>ID:</strong> {shape.properties.id || "N/A"} <br />
                <strong>Crop Type:</strong> {shape.properties.cropType || "N/A"} <br />
                <strong>Growth Stage:</strong> {shape.properties.growthStage || "N/A"}
              </Popup>
            </GeoJSON>
          );
        })}
      </MapContainer>
    );
  };

  // Filter shapes for localisation (Point geometry)
  const localisationShapes = shapes.filter((shape) => shape.geometry.type === "Point");
  const nonPointShapes = shapes.filter((shape) => shape.geometry.type !== "Point");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShapes = nonPointShapes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(nonPointShapes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseDialog = () => {
    setShowActivationDialog(false);
  };

  return (
    <div className="parcel-info-container">
      <div className="header-container mb-4 d-flex align-items-center mt-3 ml-3">
        <i className="bi bi-map me-2 text-primary" style={{ fontSize: "2rem" }}></i>
        <h5
          className="text-dark fw-semibold py-2 bg-white border-bottom border-primary mb-0"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
        >
          Parcels Information
        </h5>
      </div>

      <div className="mb-3 map-container">
        <h4 className="mb-2">Parcel Map</h4>
        {renderAllShapesMap()}
      </div>

      <div className="tables-container d-flex gap-3 mb-3">
        {/* Parcel Details Table */}
        <Card className="table-card flex-fill">
          <Card.Header className="d-flex align-items-center">
            <Globe className="me-2 text-primary" size={20} />
            <h5 className="mb-0">Parcel Details</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table className="modern-table" bordered hover>
                <thead>
                  <tr>
                    <th>Map</th>
                    <th>Crop Type</th>
                    <th>Growth Stage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentShapes.length > 0 ? (
                    currentShapes.map((shape, index) => (
                      <tr key={index}>
                        <td>
                          <Button
                            variant="link"
                            onClick={() => handleShowMap(shape)}
                            className="map-btn"
                            title="View Map"
                          >
                            <MapIcon size={20} />
                          </Button>
                        </td>
                        <td>{shape.properties.cropType || "N/A"}</td>
                        <td>{shape.properties.growthStage || "N/A"}</td>
                        <td>
                          <div className="action-buttons">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleShowObservations(shape)}
                              className="me-1 mb-1 action-btn"
                              title="Daily Observations"
                            >
                              <Activity size={16} />
                            </Button>
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleSelectShapeForDetails(shape)}
                              className="me-1 mb-1 action-btn"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleSelectShapeForEdit(shape)}
                              className="mb-1 action-btn"
                              title="Edit Parcel"
                            >
                              <PencilSquare size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No parcels found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {nonPointShapes.length > itemsPerPage && (
                <Pagination className="justify-content-center mt-3 flex-wrap">
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
          </Card.Body>
        </Card>

        {/* Localisation Points Table */}
        <Card className="table-card flex-fill">
          <Card.Header className="d-flex align-items-center">
            <PinMap className="me-2 text-primary" size={20} />
            <h5 className="mb-0">Localisation Points</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table className="modern-table" bordered hover>
                <thead>
                  <tr>
                    <th>Map</th>
                    <th>ID</th>
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {localisationShapes.length > 0 ? (
                    localisationShapes.map((shape, index) => (
                      <tr key={index}>
                        <td>
                          <Button
                            variant="link"
                            onClick={() => handleShowMap(shape)}
                            className="map-btn"
                            title="View Map"
                          >
                            <MapIcon size={20} />
                          </Button>
                        </td>
                        <td>{shape.properties.id || "N/A"}</td>
                        <td>{shape.properties.comment || "N/A"}</td>
                        <td>
                          <div className="action-buttons">
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleSelectShapeForDetails(shape)}
                              className="me-1 mb-1 action-btn"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No localisation points found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card className="mb-3">
        <Card.Header>
          <h5 className="mb-0">Growth Stage Overview</h5>
        </Card.Header>
        <Card.Body>
          <div style={{ height: "300px" }}>
            <Bar data={getChartData()} options={chartOptions} />
          </div>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Parcel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Crop Type</label>
              <select
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Crop Type</option>
                {cropTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Planting Date</label>
              <input
                type="date"
                name="plantingDate"
                value={formData.plantingDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Growth Stage</label>
              <select
                name="growthStage"
                value={formData.growthStage}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Growth Stage</option>
                {growthStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
        
            <div className="mb-3">
              <label className="form-label">Expected Harvest Date</label>
              <input
                type="date"
                name="expectedHarvestDate"
                value={formData.expectedHarvestDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedShape?.geometry.type === "Point" ? "Localisation Details" : "Parcel Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedShape && (
            <div className="details-container">
              <p><strong>ID:</strong> {selectedShape.properties.id || "N/A"}</p>
              {selectedShape.geometry.type !== "Point" ? (
                <>
                  <p><strong>Color:</strong> <span className="color-dot" style={{ backgroundColor: selectedShape.properties.color }}></span></p>
                  <p><strong>Crop Type:</strong> {selectedShape.properties.cropType || "N/A"}</p>
                  <p><strong>Growth Stage:</strong> {selectedShape.properties.growthStage || "N/A"}</p>
                  <p><strong>Planting Date:</strong> {selectedShape.properties.plantingDate || "N/A"}</p>
                  <p><strong>Expected Harvest Date:</strong> {selectedShape.properties.expectedHarvestDate || "N/A"}</p>
                </>
              ) : (
                <p><strong>Comment:</strong> {selectedShape.properties.comment || "N/A"}</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Map Modal */}
      <Modal show={showMapModal} onHide={handleCloseMapModal} size="lg" centered>
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

      <ProfileActivationDialog open={showActivationDialog} onClose={handleCloseDialog} />
    </div>
  );
}

export default ParcelInfo;