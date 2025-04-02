import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Card, Row, Col, Accordion } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Cloud, Droplet, Tree, Tools } from "react-bootstrap-icons";
import "./AddObservation.css";

function AddObservation() {
  const { shapeId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    weather: { temperature: { min: "", max: "" }, precipitation: "", humidity: "", windSpeed: "", windDirection: "" },
    soil: { moisture: "", temperature: "", pH: "", compactionLevel: "" },
    cropHealth: { growthStage: "", plantHeight: "", leafColor: "", pestPresence: [], weedPresence: "" },
    interventions: [],
    notes: "",
  });

  const [pest, setPest] = useState({ pestType: "", severity: "", affectedArea: "" });

  // Pre-fill temperature fields with current weather data from state
  useEffect(() => {
    if (state?.currentWeather) {
      setFormData((prev) => ({
        ...prev,
        weather: {
          ...prev.weather,
          temperature: {
            min: Math.round(state.currentWeather.main.temp_min) || "",
            max: Math.round(state.currentWeather.main.temp_max) || "",
          },
          humidity: state.currentWeather.main.humidity || "",
          windSpeed: state.currentWeather.wind.speed || "",
        },
      }));
    }
  }, [state?.currentWeather]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field, subField] = name.split(".");
    if (section === "weather" && field === "temperature") {
      setFormData({
        ...formData,
        weather: { ...formData.weather, temperature: { ...formData.weather.temperature, [subField]: value } },
      });
    } else if (section === "weather" || section === "soil" || section === "cropHealth") {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePestChange = (e) => {
    const { name, value } = e.target;
    setPest({ ...pest, [name]: value });
  };

  const addPest = () => {
    if (pest.pestType) {
      setFormData({
        ...formData,
        cropHealth: {
          ...formData.cropHealth,
          pestPresence: [...formData.cropHealth.pestPresence, { ...pest, affectedArea: Number(pest.affectedArea) }],
        },
      });
      setPest({ pestType: "", severity: "", affectedArea: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state?.parcelleId || !shapeId) {
      console.error("Missing parcelleId or shapeId:", { parcelleId: state?.parcelleId, shapeId });
      return;
    }

    const cleanedFormData = {
      date: formData.date,
      weather: {
        temperature: {
          min: formData.weather.temperature.min ? Number(formData.weather.temperature.min) : undefined,
          max: formData.weather.temperature.max ? Number(formData.weather.temperature.max) : undefined,
        },
        precipitation: formData.weather.precipitation ? Number(formData.weather.precipitation) : undefined,
        humidity: formData.weather.humidity ? Number(formData.weather.humidity) : undefined,
        windSpeed: formData.weather.windSpeed ? Number(formData.weather.windSpeed) : undefined,
        windDirection: formData.weather.windDirection || undefined,
        weatherSource: "manual",
      },
      soil: {
        moisture: formData.soil.moisture ? Number(formData.soil.moisture) : undefined,
        temperature: formData.soil.temperature ? Number(formData.soil.temperature) : undefined,
        pH: formData.soil.pH ? Number(formData.soil.pH) : undefined,
        compactionLevel: formData.soil.compactionLevel || undefined,
        measuredBy: "manual",
      },
      cropHealth: {
        growthStage: formData.cropHealth.growthStage || undefined,
        plantHeight: formData.cropHealth.plantHeight ? Number(formData.cropHealth.plantHeight) : undefined,
        leafColor: formData.cropHealth.leafColor || undefined,
        pestPresence: formData.cropHealth.pestPresence.length ? formData.cropHealth.pestPresence : undefined,
        weedPresence: formData.cropHealth.weedPresence || undefined,
      },
      interventions: formData.interventions.length ? formData.interventions : undefined,
      notes: formData.notes || undefined,
    };

    try {
      await axios.post(
        `http://localhost:5000/parcelle/dailyObservation/${state.parcelleId}/${shapeId}`,
        cleanedFormData,
        { withCredentials: true }
      );
      navigate(`/dashboard/observations/${shapeId}`, { state: { parcelleId: state.parcelleId } });
    } catch (error) {
      console.error("Error adding observation:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <h2 className="text-center mb-4">Ajouter une observation</h2>
      <Form onSubmit={handleSubmit}>
        {/* Date */}
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Form.Group>
                  <Form.Label><strong>Date</strong></Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-control-modern"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Météo et Sol en parallèle */}
        <Row className="justify-content-center">
          {/* Météo */}
          <Col md={6} className="mb-6">
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-primary text-white">
                <Cloud className="me-2" /> Météo
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Température Min (°C)</Form.Label>
                      <Form.Control
                        type="number"
                        name="weather.temperature.min"
                        value={formData.weather.temperature.min}
                        onChange={handleChange}
                        placeholder="ex. 5"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Température Max (°C)</Form.Label>
                      <Form.Control
                        type="number"
                        name="weather.temperature.max"
                        value={formData.weather.temperature.max}
                        onChange={handleChange}
                        placeholder="ex. 12"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Précipitations (mm)</Form.Label>
                      <Form.Control
                        type="number"
                        name="weather.precipitation"
                        value={formData.weather.precipitation}
                        onChange={handleChange}
                        placeholder="ex. 2"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Humidité (%)</Form.Label>
                      <Form.Control
                        type="number"
                        name="weather.humidity"
                        value={formData.weather.humidity}
                        onChange={handleChange}
                        placeholder="ex. 85"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Vitesse du vent (km/h)</Form.Label>
                      <Form.Control
                        type="number"
                        name="weather.windSpeed"
                        value={formData.weather.windSpeed}
                        onChange={handleChange}
                        placeholder="ex. 15"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Direction du vent</Form.Label>
                      <Form.Select
                        name="weather.windDirection"
                        value={formData.weather.windDirection}
                        onChange={handleChange}
                        className="form-control-modern"
                      >
                        <option value="">Sélectionner</option>
                        <option value="N">Nord</option>
                        <option value="NE">Nord-Est</option>
                        <option value="E">Est</option>
                        <option value="SE">Sud-Est</option>
                        <option value="S">Sud</option>
                        <option value="SW">Sud-Ouest</option>
                        <option value="W">Ouest</option>
                        <option value="NW">Nord-Ouest</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Sol */}
          <Col md={6} className="mb-6">
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-success text-white">
                <Droplet className="me-2" /> Sol
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Humidité du sol (%)</Form.Label>
                      <Form.Control
                        type="number"
                        name="soil.moisture"
                        value={formData.soil.moisture}
                        onChange={handleChange}
                        placeholder="ex. 60"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Température du sol (°C)</Form.Label>
                      <Form.Control
                        type="number"
                        name="soil.temperature"
                        value={formData.soil.temperature}
                        onChange={handleChange}
                        placeholder="ex. 8"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>pH</Form.Label>
                      <Form.Control
                        type="number"
                        name="soil.pH"
                        value={formData.soil.pH}
                        onChange={handleChange}
                        step="0.1"
                        placeholder="ex. 6.5"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Niveau de compactage</Form.Label>
                      <Form.Select
                        name="soil.compactionLevel"
                        value={formData.soil.compactionLevel}
                        onChange={handleChange}
                        className="form-control-modern"
                      >
                        <option value="">Sélectionner</option>
                        <option value="low">Faible</option>
                        <option value="medium">Moyen</option>
                        <option value="high">Élevé</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Santé de la culture et Notes en parallèle */}
        <Row className="justify-content-center">
          {/* Santé de la culture */}
          <Col md={6} className="mb-6">
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-warning text-white">
                <Tree className="me-2" /> Santé de la culture
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stade de croissance</Form.Label>
                      <Form.Control
                        type="text"
                        name="cropHealth.growthStage"
                        value={formData.cropHealth.growthStage}
                        onChange={handleChange}
                        placeholder="ex. tallage"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hauteur des plants (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        name="cropHealth.plantHeight"
                        value={formData.cropHealth.plantHeight}
                        onChange={handleChange}
                        placeholder="ex. 15"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Couleur des feuilles</Form.Label>
                      <Form.Select
                        name="cropHealth.leafColor"
                        value={formData.cropHealth.leafColor}
                        onChange={handleChange}
                        className="form-control-modern"
                      >
                        <option value="">Sélectionner</option>
                        <option value="green">Vert</option>
                        <option value="light_green">Vert clair</option>
                        <option value="yellowing">Jaunissant</option>
                        <option value="brown">Brun</option>
                        <option value="wilted">Fané</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mauvaises herbes</Form.Label>
                      <Form.Control
                        type="text"
                        name="cropHealth.weedPresence"
                        value={formData.cropHealth.weedPresence}
                        onChange={handleChange}
                        placeholder="ex. adventices près des bordures"
                        className="form-control-modern"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Accordion className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Ajouter un nuisible</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Type de nuisible</Form.Label>
                            <Form.Control
                              type="text"
                              name="pestType"
                              value={pest.pestType}
                              onChange={handlePestChange}
                              placeholder="ex. pucerons"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Sévérité</Form.Label>
                            <Form.Select name="severity" value={pest.severity} onChange={handlePestChange}>
                              <option value="">Sélectionner</option>
                              <option value="low">Faible</option>
                              <option value="medium">Moyen</option>
                              <option value="high">Élevé</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Zone affectée (%)</Form.Label>
                            <Form.Control
                              type="number"
                              name="affectedArea"
                              value={pest.affectedArea}
                              onChange={handlePestChange}
                              placeholder="ex. 10"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button variant="outline-success" size="sm" onClick={addPest}>
                        Ajouter le nuisible
                      </Button>
                      {formData.cropHealth.pestPresence.length > 0 && (
                        <ul className="mt-2">
                          {formData.cropHealth.pestPresence.map((p, index) => (
                            <li key={index}>{`${p.pestType} (${p.severity}, ${p.affectedArea}%)`}</li>
                          ))}
                        </ul>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>

          {/* Notes */}
          <Col md={6} className="mb-6">
            <Card className="shadow-sm h-100">
              <Card.Header className="bg-info text-white">
                <Tools className="me-2" /> Notes
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Ajoutez vos observations personnelles ici..."
                    rows={3}
                    className="form-control-modern"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Bouton de soumission */}
        <div className="text-center">
          <Button variant="primary" type="submit" size="lg">
            Enregistrer l’observation
          </Button>
        </div>
      </Form>
    </>
  );
}

export default AddObservation;