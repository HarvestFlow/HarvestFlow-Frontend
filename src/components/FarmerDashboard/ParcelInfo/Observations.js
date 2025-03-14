import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Card, Row, Col } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../SideNavBar/SideNavBar";
import "./Observations.css"; // Fichier CSS pour personnalisation

function Observations() {
  const { shapeId } = useParams();
  const { state } = useLocation();
  const [observations, setObservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/parcelle/dailyObservation/${state.parcelleId}/${shapeId}`
        );
        setObservations(response.data);
      } catch (error) {
        console.error("Error fetching observations:", error);
      }
    };
    if (state?.parcelleId && shapeId) {
      fetchObservations();
    }
  }, [state, shapeId]);

  const handleAddObservation = () => {
    navigate(`/observations/add/${shapeId}`, { state: { parcelleId: state.parcelleId } });
  };

  const handleShowDetails = (observation) => {
    setSelectedObservation(observation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedObservation(null);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h2 className="text-center mb-3">Daily Observations for Shape {shapeId}</h2>
        <Button variant="success" onClick={handleAddObservation} className="mb-3">
          Add Observation
        </Button>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Growth Stage</th>
              <th>Leaf Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {observations.length > 0 ? (
              observations.map((obs) => (
                <tr key={obs._id}>
                  <td>{new Date(obs.date).toLocaleDateString()}</td>
                  <td>{obs.cropHealth?.growthStage || "N/A"}</td>
                  <td>{obs.cropHealth?.leafColor || "N/A"}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShowDetails(obs)}
                      className="me-2"
                    >
                      Details
                    </Button>
                    <Button variant="primary" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No observations found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Modal pour afficher les détails */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Observation Details - {selectedObservation?.date && new Date(selectedObservation.date).toLocaleDateString()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedObservation && (
              <div className="observation-details">
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-primary text-white">Weather</Card.Header>
                      <Card.Body>
                        <p><strong>Temperature:</strong> {selectedObservation.weather?.temperature?.min || "N/A"} - {selectedObservation.weather?.temperature?.max || "N/A"}°C</p>
                        <p><strong>Precipitation:</strong> {selectedObservation.weather?.precipitation || "N/A"} mm</p>
                        <p><strong>Humidity:</strong> {selectedObservation.weather?.humidity || "N/A"}%</p>
                        <p><strong>Wind Speed:</strong> {selectedObservation.weather?.windSpeed || "N/A"} km/h</p>
                        <p><strong>Wind Direction:</strong> {selectedObservation.weather?.windDirection || "N/A"}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-success text-white">Soil</Card.Header>
                      <Card.Body>
                        <p><strong>Moisture:</strong> {selectedObservation.soil?.moisture || "N/A"}%</p>
                        <p><strong>Temperature:</strong> {selectedObservation.soil?.temperature || "N/A"}°C</p>
                        <p><strong>pH:</strong> {selectedObservation.soil?.pH || "N/A"}</p>
                        <p><strong>Compaction Level:</strong> {selectedObservation.soil?.compactionLevel || "N/A"}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-warning text-white">Crop Health</Card.Header>
                      <Card.Body>
                        <p><strong>Growth Stage:</strong> {selectedObservation.cropHealth?.growthStage || "N/A"}</p>
                        <p><strong>Plant Height:</strong> {selectedObservation.cropHealth?.plantHeight || "N/A"} cm</p>
                        <p><strong>Leaf Color:</strong> {selectedObservation.cropHealth?.leafColor || "N/A"}</p>
                        <p><strong>Weed Presence:</strong> {selectedObservation.cropHealth?.weedPresence || "N/A"}</p>
                        <p><strong>Pest Presence:</strong>
                          {selectedObservation.cropHealth?.pestPresence?.length > 0 ? (
                            <ul>
                              {selectedObservation.cropHealth.pestPresence.map((pest, index) => (
                                <li key={index}>
                                  {pest.pestType} (Severity: {pest.severity}, Affected Area: {pest.affectedArea}%)
                                </li>
                              ))}
                            </ul>
                          ) : (
                            "None"
                          )}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="bg-info text-white">Notes</Card.Header>
                      <Card.Body>
                        <p>{selectedObservation.notes || "No notes available"}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Observations;