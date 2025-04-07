import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./Recommendations.css";

function RecommendationsSelector() {
  const [parcelles, setParcelles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchParcelles = async () => {
      try {
        const userId = state?.userId;
        if (!userId) {
          throw new Error("User ID non disponible");
        }
        const response = await axios.get(`${API_URL}/parcelle/parcelle/${userId}`, { withCredentials: true });
        setParcelles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des parcelles :", error);
        setParcelles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParcelles();
  }, [state]);

  const handleSelectShape = (parcelleId, shapeId) => {
    navigate(`/dashboard/recommendations/${shapeId}`, { state: { parcelleId } });
  };

  // Titre de recommandation journalière
  const getDailyRecommendation = () => {
    const temp = 25; // Température simulée
    const soilHealth = "Bonne"; // Santé du sol simulée
    const productionEfficiency = parcelles.length > 0 ? parcelles[0].shapes[0]?.properties?.estimatedYield || 7 : 7;

    return `Gérez mieux votre récolte : à ${temp}°C, sol ${soilHealth.toLowerCase()}, visez ${productionEfficiency} t/ha avec un arrosage ajusté.`;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" />
        <p>Chargement des parcelles...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="header-container mb-4 text-center">
          <h2 className="text-dark fw-bold py-2 border-bottom border-success d-inline-block">
            Sélectionner une Parcelle pour les Recommandations
          </h2>
        </div>

        <div className="recommendation-section mb-5 text-center">
          <h5 className="recommendation-title">{getDailyRecommendation()}</h5>
        </div>

        <div className="fields-container">
          {parcelles.length > 0 ? (
            parcelles.map((parcelle) => (
              <div key={parcelle._id} className="field-box">
                <div className="field-label">
                  {parcelle.shapes[0]?.properties?.comment || "Parcelle sans nom"}
                </div>
                <div className="shapes-list">
                  {parcelle.shapes && parcelle.shapes.length > 0 ? (
                    parcelle.shapes.map((shape) => (
                      <Button
                        key={shape._id}
                        variant="outline-success"
                        className="shape-button"
                        onClick={() => handleSelectShape(parcelle._id, shape._id)}
                      >
                        <i className="bi bi-tree me-2"></i>
                        {shape.properties?.comment || `Shape ${shape._id.slice(-6)}`}
                      </Button>
                    ))
                  ) : (
                    <p className="text-muted">Aucun shape disponible</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Aucune parcelle trouvée pour cet utilisateur.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecommendationsSelector;