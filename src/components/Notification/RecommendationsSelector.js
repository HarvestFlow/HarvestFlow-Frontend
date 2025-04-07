import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Recommendations.css"; // Réutilisons le même fichier CSS pour cohérence

function RecommendationsSelector() {
  const [parcelles, setParcelles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchParcelles = async () => {
      try {
        const response = await axios.get(`${API_URL}/parcelle`, { withCredentials: true });
        setParcelles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des parcelles :", error);
        setParcelles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParcelles();
  }, []);

  const handleSelectShape = (parcelleId, shapeId) => {
    navigate(`/dashboard/recommendations/${shapeId}`, { state: { parcelleId } });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Chargement des parcelles...</p>
      </div>
    );
  }

  return (
    <>
      <div className="header-container mb-4 d-flex align-items-center mt-3 ml-3">
        <i className="bi bi-list-check me-2 text-primary" style={{ fontSize: "2rem" }}></i>
        <h5 className="text-dark fw-semibold py-2 bg-white border-bottom border-primary mb-0">
          Sélectionner une Parcelle pour les Recommandations
        </h5>
      </div>

      <Row>
        {parcelles.length > 0 ? (
          parcelles.map((parcelle) => (
            <Col md={4} key={parcelle._id} className="mb-4">
              <Card>
                <Card.Header className="simple-header">
                  <h4 className="mb-0">{parcelle.name || "Parcelle sans nom"}</h4>
                </Card.Header>
                <Card.Body>
                  {parcelle.shapes && parcelle.shapes.length > 0 ? (
                    parcelle.shapes.map((shape) => (
                      <Button
                        key={shape._id}
                        variant="outline-primary"
                        className="d-block mb-2"
                        onClick={() => handleSelectShape(parcelle._id, shape._id)}
                      >
                        Shape {shape._id.slice(-6)} {/* Affiche les 6 derniers caractères pour brièveté */}
                      </Button>
                    ))
                  ) : (
                    <p className="text-muted">Aucun shape disponible</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">Aucune parcelle trouvée.</p>
          </Col>
        )}
      </Row>
    </>
  );
}

export default RecommendationsSelector;