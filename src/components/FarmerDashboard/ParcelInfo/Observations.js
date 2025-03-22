import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Card, Row, Col, Form } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../SideNavBar/SideNavBar";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import CurrentWeather from "../../weather/current-weather/current-weather";
import Forecast from "../../weather/forecast/forecast";
import "./Observations.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Observations() {
  const { shapeId } = useParams();
  const { state } = useLocation();
  const [observations, setObservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [shapeCoordinates, setShapeCoordinates] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
  const WEATHER_API_KEY = "806a508219bb761f07cbef033270c0b0";

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
    const fetchShapeCoordinates = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/parcelle/shape/${shapeId}`);
        const coordinates = response.data.coordinates;
        if (coordinates && coordinates[0] && coordinates[0][0]) {
          const firstPoint = coordinates[0][0];
          setShapeCoordinates({ lon: firstPoint[0], lat: firstPoint[1] });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées :", error);
      }
    };

    const fetchObservations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/parcelle/dailyObservation/${state.parcelleId}/${shapeId}`
        );
        setObservations(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des observations :", error);
      }
    };

    if (state?.parcelleId && shapeId) {
      fetchObservations();
      fetchShapeCoordinates();
    }
  }, [state, shapeId]);

  useEffect(() => {
    if (shapeCoordinates) {
      const fetchWeatherData = async () => {
        try {
          const currentWeatherResponse = await axios.get(
            `${WEATHER_API_URL}/weather?lat=${shapeCoordinates.lat}&lon=${shapeCoordinates.lon}&appid=${WEATHER_API_KEY}&units=metric`,
            { withCredentials: false }
          );
          const forecastResponse = await axios.get(
            `${WEATHER_API_URL}/forecast?lat=${shapeCoordinates.lat}&lon=${shapeCoordinates.lon}&appid=${WEATHER_API_KEY}&units=metric`,
            { withCredentials: false }
          );
          setCurrentWeather({ city: "Shape Location", ...currentWeatherResponse.data });
          setForecast(forecastResponse.data);
          setError(null);
        } catch (err) {
          console.error("Erreur lors de la récupération des données météo :", err);
          setError("Échec du chargement des données météo.");
        }
      };
      fetchWeatherData();
    }
  }, [shapeCoordinates]);

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

  const handleEditGrowthStage = (obsId) => {
    setEditingId(obsId);
  };

  const handleSaveGrowthStage = async (obsId, newStage) => {
    try {
      await axios.put(`http://localhost:5000/parcelle/dailyObservation/${obsId}`, {
        cropHealth: { growthStage: newStage },
      });
      setObservations((prev) =>
        prev.map((obs) =>
          obs._id === obsId ? { ...obs, cropHealth: { ...obs.cropHealth, growthStage: newStage } } : obs
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du stade de croissance :", error);
    }
  };

  const getChartData = () => {
    const dates = observations.map((obs) => new Date(obs.date).toLocaleDateString());
    const stages = observations.map((obs) => {
      const stageIndex = growthStages.indexOf(obs.cropHealth?.growthStage || "");
      return stageIndex === -1 ? null : stageIndex + 1;
    });

    return {
      labels: dates,
      datasets: [
        {
          label: "Progression des stades de croissance",
          data: stages,
          fill: false,
          borderColor: "#36A2EB",
          tension: 0.1,
          pointBackgroundColor: "#36A2EB",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#36A2EB",
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Progression des stades de croissance pour le Shape ${shapeId}`,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const stageIndex = context.raw - 1;
            return stageIndex >= 0 && stageIndex < growthStages.length
              ? growthStages[stageIndex]
              : "Inconnu";
          },
        },
      },
    },
    scales: {
      y: {
        min: 1,
        max: growthStages.length,
        ticks: {
          stepSize: 1,
          callback: (value) => growthStages[value - 1] || "",
        },
        title: { display: true, text: "Stade de croissance" },
      },
      x: { title: { display: true, text: "Date" } },
    },
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h4 className="text-center mb-4">Observations quotidienne {shapeId}</h4>

       

        {/* Première rangée : Météo Actuelle et Observations Quotidiennes */}
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Header className="simple-header">
                <h4 className="mb-0">Météo Actuelle</h4>
              </Card.Header>
              <Card.Body>
                {error && <p className="text-danger">{error}</p>}
                {currentWeather ? (
                  <CurrentWeather data={currentWeather} />
                ) : (
                  <p>Chargement des données météo actuelles...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} className="mb-4">
            <Card>
            <Card.Header className="simple-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Observations Quotidiennes</h4>
        <Button className="bg-green-400" size="sm" onClick={handleAddObservation}>
          Ajouter une observation
        </Button>
              </Card.Header>
              <Card.Body>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Stade de croissance</th>
                      <th>Couleur des feuilles</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {observations.length > 0 ? (
                      observations.map((obs) => (
                        <tr key={obs._id}>
                          <td>{new Date(obs.date).toLocaleDateString()}</td>
                          <td>
                            {editingId === obs._id ? (
                              <Form.Select
                                value={obs.cropHealth?.growthStage || ""}
                                onChange={(e) => handleSaveGrowthStage(obs._id, e.target.value)}
                              >
                                <option value="">Sélectionner un stade</option>
                                {growthStages.map((stage) => (
                                  <option key={stage} value={stage}>
                                    {stage}
                                  </option>
                                ))}
                              </Form.Select>
                            ) : (
                              obs.cropHealth?.growthStage || "N/A"
                            )}
                          </td>
                          <td>{obs.cropHealth?.leafColor || "N/A"}</td>
                          <td>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleShowDetails(obs)}
                              className="me-2"
                            >
                              Détails
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleEditGrowthStage(obs._id)}
                            >
                              Modifier
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Aucune observation trouvée
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Deuxième rangée : Prévisions Météo */}
        <Row>
          <Col md={12} className="mb-4">
            <Card>
              <Card.Header className="simple-header">
                <h4 className="mb-0">Prévisions Météo</h4>
              </Card.Header>
              <Card.Body>
                {forecast ? (
                  <Forecast data={forecast} />
                ) : (
                  <p>Chargement des prévisions météo...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Troisième rangée : Graphique */}
        <Row>
          <Col md={6} className="mb-4">
            <Card className="chart-card">
              <Card.Header className="simple-header">
                <h4 className="mb-0">Progression des Stades de Croissance</h4>
              </Card.Header>
              <Card.Body>
                {observations.length > 0 ? (
                  <div style={{ height: "300px" }}>
                    <Line data={getChartData()} options={chartOptions} />
                  </div>
                ) : (
                  <p className="text-center">Aucune observation disponible pour afficher le graphique.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal pour les détails */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Détails de l'observation -{" "}
              {selectedObservation?.date && new Date(selectedObservation.date).toLocaleDateString()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedObservation && (
              <div className="observation-details">
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="simple-header">Météo</Card.Header>
                      <Card.Body>
                        <p>
                          <strong>Température :</strong>{" "}
                          {selectedObservation.weather?.temperature?.min || "N/A"} -{" "}
                          {selectedObservation.weather?.temperature?.max || "N/A"}°C
                        </p>
                        <p>
                          <strong>Précipitations :</strong>{" "}
                          {selectedObservation.weather?.precipitation || "N/A"} mm
                        </p>
                        <p>
                          <strong>Humidité :</strong> {selectedObservation.weather?.humidity || "N/A"}%
                        </p>
                        <p>
                          <strong>Vitesse du vent :</strong>{" "}
                          {selectedObservation.weather?.windSpeed || "N/A"} km/h
                        </p>
                        <p>
                          <strong>Direction du vent :</strong>{" "}
                          {selectedObservation.weather?.windDirection || "N/A"}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="simple-header">Sol</Card.Header>
                      <Card.Body>
                        <p>
                          <strong>Humidité :</strong> {selectedObservation.soil?.moisture || "N/A"}%
                        </p>
                        <p>
                          <strong>Température :</strong>{" "}
                          {selectedObservation.soil?.temperature || "N/A"}°C
                        </p>
                        <p>
                          <strong>pH :</strong> {selectedObservation.soil?.pH || "N/A"}
                        </p>
                        <p>
                          <strong>Niveau de compaction :</strong>{" "}
                          {selectedObservation.soil?.compactionLevel || "N/A"}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="simple-header">Santé des cultures</Card.Header>
                      <Card.Body>
                        <p>
                          <strong>Stade de croissance :</strong>{" "}
                          {selectedObservation.cropHealth?.growthStage || "N/A"}
                        </p>
                        <p>
                          <strong>Hauteur des plantes :</strong>{" "}
                          {selectedObservation.cropHealth?.plantHeight || "N/A"} cm
                        </p>
                        <p>
                          <strong>Couleur des feuilles :</strong>{" "}
                          {selectedObservation.cropHealth?.leafColor || "N/A"}
                        </p>
                        <p>
                          <strong>Présence de mauvaises herbes :</strong>{" "}
                          {selectedObservation.cropHealth?.weedPresence || "N/A"}
                        </p>
                        <p>
                          <strong>Présence de nuisibles :</strong>
                          {selectedObservation.cropHealth?.pestPresence?.length > 0 ? (
                            <ul>
                              {selectedObservation.cropHealth.pestPresence.map((pest, index) => (
                                <li key={index}>
                                  {pest.pestType} (Sévérité : {pest.severity}, Zone affectée :{" "}
                                  {pest.affectedArea}%)
                                </li>
                              ))}
                            </ul>
                          ) : (
                            "Aucun"
                          )}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header className="simple-header">Notes</Card.Header>
                      <Card.Body>
                        <p>{selectedObservation.notes || "Aucune note disponible"}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Observations;