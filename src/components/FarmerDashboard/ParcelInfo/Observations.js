// src/components/FarmerDashboard/Observations/Observations.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Card, Row, Col, Form, Pagination } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import CurrentWeather from "../../weather/current-weather/current-weather";
import Forecast from "../../weather/forecast/forecast";
import "./Observations.css";
import { useNotifications } from "../../Notification/NotificationContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Observations() {
  const { shapeId } = useParams();
  const { state } = useLocation();
  const [observations, setObservations] = useState([]);
  const [inputUsages, setInputUsages] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [newUsage, setNewUsage] = useState({
    inputId: "",
    quantity: 0,
    date: new Date().toISOString().split("T")[0],
  });
  const [shapeCoordinates, setShapeCoordinates] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isActivated, setIsActivated] = useState(true);
  const navigate = useNavigate();
  const { notifications } = useNotifications();

  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
  const WEATHER_API_KEY = "806a508219bb761f07cbef033270c0b0";
  const API_URL = "http://localhost:5000";

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
        const response = await axios.get(`${API_URL}/user/getProfile`, { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserId(response.data._id);
          setIsActivated(response.data.isActivated);
          if (!response.data.isActivated) console.log("Account not activated");
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
    const fetchShapeCoordinates = async () => {
      try {
        const response = await axios.get(`${API_URL}/parcelle/shape/${shapeId}`);
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
          `${API_URL}/parcelle/dailyObservation/${state.parcelleId}/${shapeId}`
        );
        setObservations(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des observations :", error);
        setObservations([]);
      }
    };

    const fetchInputs = async () => {
      try {
        const response = await axios.get(`${API_URL}/stock/inputs`, { withCredentials: true });
        setInputs(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des intrants :", error);
        setInputs([]);
      }
    };

    const fetchInputUsages = async () => {
      try {
        const response = await axios.get(`${API_URL}/stock/usage/${shapeId}`, { withCredentials: true });
        setInputUsages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisations d'intrants :", error);
        setInputUsages([]);
      }
    };

    if (state?.parcelleId && shapeId) {
      fetchObservations();
      fetchShapeCoordinates();
      fetchInputs();
      fetchInputUsages();
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
          setCurrentWeather({ city: "Farm Location", ...currentWeatherResponse.data });
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
    navigate(`/dashboard/observations/add/${shapeId}`, {
      state: { parcelleId: state.parcelleId, currentWeather },
    });
  };

  const handleShowDetails = (observation) => {
    setSelectedObservation(observation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedObservation(null);
  };

  const handleAddInputUsage = async () => {
    try {
      const selectedInput = inputs.find((input) => input._id === newUsage.inputId);
      if (!selectedInput || newUsage.quantity > selectedInput.quantity) {
        setError("Quantité insuffisante en stock ou intrant invalide.");
        return;
      }

      const usageResponse = await axios.post(
        `${API_URL}/stock/usage`,
        { shapeId, inputId: newUsage.inputId, quantity: newUsage.quantity, date: newUsage.date },
        { withCredentials: true }
      );

      const newStockQuantity = selectedInput.quantity - newUsage.quantity;
      await axios.put(
        `${API_URL}/stock/${newUsage.inputId}`,
        { quantity: newStockQuantity },
        { withCredentials: true }
      );

      setInputUsages([...inputUsages, usageResponse.data]);
      setInputs((prev) =>
        prev.map((input) =>
          input._id === newUsage.inputId ? { ...input, quantity: newStockQuantity } : input
        )
      );
      setShowUsageModal(false);
      setNewUsage({ inputId: "", quantity: 0, date: new Date().toISOString().split("T")[0] });
      setError(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisation d'intrant :", error);
      setError("Échec de l'ajout de l'utilisation.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentObservations = observations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(observations.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      title: { display: true, text: "Progression des stades de croissance" },
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
    <>
      <div className="header-container mb-4 d-flex align-items-center mt-3 ml-3">
        <i className="bi bi-calendar3 me-2 text-primary" style={{ fontSize: "2rem" }}></i>
        <h5 className="text-dark fw-semibold py-2 bg-white border-bottom border-primary mb-0">
          Observations Quotidiennes
        </h5>
      </div>

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
                    <th>GDD Accumulé</th>
                    <th>Couleur des feuilles</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentObservations.length > 0 ? (
                    currentObservations.map((obs) => (
                      <tr key={obs._id}>
                        <td>{new Date(obs.date).toLocaleDateString()}</td>
                        <td>{obs.cropHealth?.growthStage || "N/A"}</td>
                        <td>{obs.cropHealth?.accumulatedGDD?.toFixed(2) || "N/A"}</td>
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
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Aucune observation trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {observations.length > itemsPerPage && (
                <Pagination className="justify-content-center mt-3">
                  <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, index) => (
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
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-4">
          <Card>
            <Card.Header className="simple-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Utilisation des Intrants</h4>
              <Button variant="success" size="sm" onClick={() => setShowUsageModal(true)}>
                Ajouter une utilisation
              </Button>
            </Card.Header>
            <Card.Body>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Catégorie</th>
                    <th>Type d'intrant</th>
                    <th>Nom</th>
                    <th>Quantité utilisée</th>
                    <th>Unité</th>
                  </tr>
                </thead>
                <tbody>
                  {inputUsages.length > 0 ? (
                    inputUsages.map((usage) => (
                      <tr key={usage._id}>
                        <td>{new Date(usage.date).toLocaleDateString()}</td>
                        <td>{usage.input?.category || "N/A"}</td>
                        <td>{usage.input?.type || "N/A"}</td>
                        <td>{usage.input?.name || "N/A"}</td>
                        <td>{usage.quantity}</td>
                        <td>{usage.input?.unit || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Aucune utilisation d'intrant enregistrée
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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

      <Row>
        <Col md={6} className="mb-4">
          <Card className="char">
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
                        <strong>GDD Accumulé :</strong>{" "}
                        {selectedObservation.cropHealth?.accumulatedGDD?.toFixed(2) || "N/A"}
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

      <Modal show={showUsageModal} onHide={() => setShowUsageModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une utilisation d'intrant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Intrant</Form.Label>
              <Form.Select
                value={newUsage.inputId}
                onChange={(e) => setNewUsage({ ...newUsage, inputId: e.target.value })}
              >
                <option value="">Sélectionner un intrant</option>
                {inputs.map((input) => (
                  <option key={input._id} value={input._id}>
                    {input.name} ({input.type}) - {input.quantity} {input.unit} restant
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantité utilisée</Form.Label>
              <Form.Control
                type="number"
                value={newUsage.quantity}
                onChange={(e) => setNewUsage({ ...newUsage, quantity: parseFloat(e.target.value) })}
                min="0"
                step="0.1"
                placeholder="Entrez la quantité"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date d'utilisation</Form.Label>
              <Form.Control
                type="date"
                value={newUsage.date}
                onChange={(e) => setNewUsage({ ...newUsage, date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUsageModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddInputUsage}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Observations;