import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card, Row, Col } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import "./Recommendations.css"; // Create this file for styling if necessary

function Recommendations() {
  const { shapeId } = useParams();
  const { state } = useLocation();
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null); // New state for selected recommendation
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/model/${state.parcelleId}/${shapeId}`
        );
        setRecommendations(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des recommandations :", error);
        setRecommendations([]);
      }
    };

    if (state?.parcelleId && shapeId) {
      fetchRecommendations();
    }
  }, [state, shapeId]);

  const parseRecommendation = (recommendation) => {
    if (!recommendation) return [];
    const lines = recommendation.split("\n").filter((line) => line.trim());
    return lines.map((line) => {
      const [attribute, action] = line.split(": ");
      return { attribute: attribute.replace(/^\d+\.\s*/, ""), action };
    });
  };

  const handleRowClick = (rec) => {
    setSelectedRecommendation(rec); // Set the clicked recommendation
  };

  return (
    <>
      <div className="header-container mb-4 d-flex align-items-center mt-3 ml-3">
        <i className="bi bi-list-check me-2 text-primary" style={{ fontSize: "2rem" }}></i>
        <h5 className="text-dark fw-semibold py-2 bg-white border-bottom border-primary mb-0">
          Recommandations
        </h5>
      </div>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="recommendation-card">
            <Card.Header className="simple-header">
              <h4 className="mb-0">Recommandation Actuelle</h4>
            </Card.Header>
            <Card.Body>
              {recommendations.length > 0 ? (
                <div className="recommendation-content">
                  {parseRecommendation(recommendations[0].recommendation).map((item, index) => (
                    <div key={index} className="mb-3">
                      <strong>{item.attribute}:</strong> <span>{item.action}</span>
                    </div>
                  ))}
                  <small className="text-muted">
                    Basé sur l'observation du{" "}
                    {new Date(recommendations[0].observationId.date).toLocaleDateString()}
                  </small>
                </div>
              ) : (
                <p className="text-muted text-center">
                  Aucune recommandation disponible. Ajoutez une observation pour en générer une.
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header className="simple-header">
              <h4 className="mb-0">Historique des Recommandations</h4>
            </Card.Header>
            <Card.Body>
              {recommendations.length > 0 ? (
                <>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Recommandation (Résumé)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recommendations.map((rec) => (
                        <tr
                          key={rec._id}
                          onClick={() => handleRowClick(rec)}
                          style={{ cursor: "pointer" }} // Add cursor pointer for better UX
                        >
                          <td>{new Date(rec.createdAt).toLocaleDateString()}</td>
                          <td>
                            {parseRecommendation(rec.recommendation)[0]?.attribute +
                              ": " +
                              parseRecommendation(rec.recommendation)[0]?.action.slice(0, 50) +
                              "..."}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {selectedRecommendation && (
                    <div className="mt-3">
                      <h5>Détails de la recommandation sélectionnée</h5>
                      {parseRecommendation(selectedRecommendation.recommendation).map((item, index) => (
                        <div key={index} className="mb-2">
                          <strong>{item.attribute}:</strong> <span>{item.action}</span>
                        </div>
                      ))}
                      <button
                        className="btn btn-secondary mt-2"
                        onClick={() => setSelectedRecommendation(null)}
                      >
                        Fermer
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted text-center">Aucun historique disponible.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Recommendations;