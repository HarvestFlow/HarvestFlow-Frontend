import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button, Modal, Pagination, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Map as MapIcon } from "react-bootstrap-icons";
import center from "@turf/center";
import bbox from "@turf/bbox";
import L from "leaflet";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./ParcelInfo.css";
import ProfileActivationDialog from "../farmerprofile/ProfileActivationDialog";

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
      acc[stage] = shapes.filter((shape) => shape.properties.growthStage === stage).length;
      return acc;
    }, {});

    return {
      labels: growthStages,
      datasets: [
        {
          label: "Number of Parcels",
          data: growthStages.map((stage) => stageCounts[stage] || 0),
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
            "#FF9F40", "#C9CBCF", "#7BC043", "#F4A261", "#2A9D8F"
          ],
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

  const handleShowDetails = (shape) => {
    navigate(`/dashboard/observations/${shape._id}`, { state: { parcelleId: shape.parcelleId, shapeId: shape._id } });
  };

  const renderShapeMap = (shape) => {
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
            <strong>ID:</strong> {shape.properties.id} <br />
            <strong>Crop Type:</strong> {shape.properties.cropType || "N/A"} <br />
            <strong>Growth Stage:</strong> {shape.properties.growthStage || "N/A"} <br />
            <strong>Planting Date:</strong> {shape.properties.plantingDate || "N/A"} <br />
            <strong>Estimated Yield:</strong> {shape.properties.estimatedYield || "N/A"} <br />
            <strong>Expected Harvest Date:</strong> {shape.properties.expectedHarvestDate || "N/A"}
          </Popup>
        </GeoJSON>
      </MapContainer>
    );
  };

  const renderAllShapesMap = () => {
    if (shapes.length === 0) return null;

    const allBounds = shapes.map((shape) => bbox(shape));
    const minLng = Math.min(...allBounds.map((b) => b[0]));
    const minLat = Math.min(...allBounds.map((b) => b[1]));
    const maxLng = Math.max(...allBounds.map((b) => b[2]));
    const maxLat = Math.max(...allBounds.map((b) => b[3]));
    const bounds = [
      [minLat, minLng],
      [maxLat, maxLng],
    ];

    return (
      <MapContainer
        bounds={bounds}
        style={{ height: "250px", width: "100%", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shapes.map((shape, index) => (
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
              <strong>ID:</strong> {shape.properties.id} <br />
              <strong>Crop Type:</strong> {shape.properties.cropType || "N/A"} <br />
              <strong>Growth Stage:</strong> {shape.properties.growthStage || "N/A"} <br />
              <strong>Planting Date:</strong> {shape.properties.plantingDate || "N/A"} <br />
              <strong>Estimated Yield:</strong> {shape.properties.estimatedYield || "N/A"} <br />
              <strong>Expected Harvest Date:</strong> {shape.properties.expectedHarvestDate || "N/A"}
            </Popup>
          </GeoJSON>
        ))}
      </MapContainer>
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShapes = shapes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(shapes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCloseDialog = () => {
    setShowActivationDialog(false);
  };

  return (
    // Supprimez le conteneur app-container et main-content, gérés par Sidebar.jsx
    <div className="parcel-info-container">
<div className="header-container mb-4 d-flex align-items-center mt-3 ml-3">
<i className="bi bi-map me-2 text-primary" style={{ fontSize: "2rem" }}></i>  <h5
    className="text-dark fw-semibold py-2 bg-white border-bottom border-primary mb-0"
    style={{
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    }}
  >
    Parcels Information
  </h5>
</div>
      <div className="mb-3 map-container">
        <h4 className="mb-2">Parcel Map</h4>
        {renderAllShapesMap()}
      </div>

      <Card className="table-card mb-3">
        <Card.Header>
          <h5 className="mb-0">Parcel Details</h5>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table className="simple-table" bordered hover>
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
                          className="me-1 mb-1"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleShowDetails(shape)}
                          className="mb-1"
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

      <Card className="">
  <Card.Header>
    <h5 className="mb-0">Growth Stage Overview</h5>
  </Card.Header>
  <Card.Body>
    <div style={{ height: "300px" }}>
      <Bar data={getChartData()} options={chartOptions} />
    </div>
  </Card.Body>
</Card>

      <Modal show={showModal} onHide={handleCloseModal} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Farm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Crop Type</Form.Label>
              <Form.Select name="cropType" value={formData.cropType} onChange={handleChange}>
                <option value="">Select Crop Type</option>
                {cropTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Planting Date</Form.Label>
              <Form.Control
                type="date"
                name="plantingDate"
                value={formData.plantingDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Growth Stage</Form.Label>
              <Form.Select name="growthStage" value={formData.growthStage} onChange={handleChange}>
                <option value="">Select Growth Stage</option>
                {growthStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estimated Yield</Form.Label>
              <Form.Control
                type="number"
                name="estimatedYield"
                value={formData.estimatedYield}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expected Harvest Date</Form.Label>
              <Form.Control
                type="date"
                name="expectedHarvestDate"
                value={formData.expectedHarvestDate}
                onChange={handleChange}
              />
            </Form.Group>
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