import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Modal, Button } from 'react-bootstrap';

// Enregistrer les composants Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Styles inline avec un thème d'agriculture verte
const styles = {
  section: { 
    padding: '40px 20px', 
    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', // Gradient vert clair
    borderRadius: '20px',
    margin: '20px 0',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  leafOverlay: { // Motif de feuilles en filigrane
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'url("https://www.transparenttextures.com/patterns/leaf.png") repeat',
    opacity: 0.05,
    pointerEvents: 'none',
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: '30px',
    position: 'relative',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2e7d32', // Vert foncé
    fontFamily: '"Poppins", sans-serif',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#4caf50', // Vert moyen
    fontFamily: '"Poppins", sans-serif',
    fontStyle: 'italic',
  },
  titleUnderline: {
    width: '80px',
    height: '4px',
    background: '#4caf50',
    margin: '10px auto',
    borderRadius: '2px',
  },
  container: { 
    padding: '20px', 
    maxWidth: '100%', 
    textAlign: 'center',
    animation: 'fadeIn 1s ease-out',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  shapeButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontFamily: '"Poppins", sans-serif',
    backgroundColor: '#4caf50', // Vert moyen
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  shapeButtonHover: {
    backgroundColor: '#388e3c', // Vert plus foncé au survol
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },
  shapeButtonActive: {
    backgroundColor: '#2e7d32', // Vert encore plus foncé pour l'état actif
    transform: 'translateY(0)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  cardContainer: { 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '40px',
    flexWrap: 'wrap'
  },
  card: { 
    width: '500px',
    height: '450px',
    border: 'none',
    borderRadius: '15px',
    padding: '20px',
    background: '#ffffff', 
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
  },
  cardHover: { 
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
  cardTitle: { 
    margin: '0 0 15px 0', 
    fontSize: '16px',
    textAlign: 'center', 
    color: '#2e7d32', 
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '600',
  },
  error: { color: '#d32f2f', fontSize: '16px', margin: '10px 0', fontFamily: '"Poppins", sans-serif' },
  loading: { color: '#666', fontSize: '16px', margin: '10px 0', fontFamily: '"Poppins", sans-serif' },
  detailsButton: { 
    padding: '10px 20px', 
    fontSize: '16px', 
    fontFamily: '"Poppins", sans-serif', 
    backgroundColor: '#4caf50', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '30px', 
    cursor: 'pointer', 
    marginTop: '20px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  detailsButtonHover: { 
    backgroundColor: '#388e3c',
  },
  yieldText: {
    fontSize: '18px', 
    marginBottom: '20px', 
    color: '#3c2f2f', 
    fontFamily: '"Poppins", sans-serif',
    fontWeight: '500',
  },
};

// CSS pour l'animation de fade-in
const cssAnimation = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
`;

// Ajouter le style CSS au document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = cssAnimation;
document.head.appendChild(styleSheet);

// Objet de correspondance pour convertir les codes ISO Alpha-2 en noms complets
const countryCodeToName = {
  TN: 'Tunisia',
  BR: 'Brazil',
  US: 'United States',
  CN: 'China',
  IN: 'India',
  GB: 'United Kingdom',
  ET: 'Ethiopia',
};

const WheatPrediction = () => {
  const [userId, setUserId] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer userId
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getProfile', {
          withCredentials: true,
        });
        setUserId(response.data._id);
      } catch (error) {
        console.error('Erreur lors de la récupération du userId :', error);
        setError('Erreur lors de l\'authentification');
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  // Récupérer shapes et prédictions
  useEffect(() => {
    const fetchShapesAndPredictions = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:5000/parcelle/parcelle/${userId}`, {
          withCredentials: true,
        });
        const allShapes = response.data.flatMap((parcelle) =>
          parcelle.shapes.map((shape) => ({
            _id: shape._id,
            averageTemperature: shape.averageTemperature,
            country: shape.country,
            properties: shape.properties,
            parcelleId: parcelle._id,
          }))
        );

        const predictionsData = await Promise.all(
          allShapes.map(async (shape) => {
            try {
              const usageResponse = await axios.get(`http://localhost:5000/stock/usage/${shape._id}`, {
                withCredentials: true,
              });
              const totalPesticides = usageResponse.data
                .filter((usage) => usage.input?.type.toLowerCase() === 'pesticide')
                .reduce((sum, usage) => sum + (usage.quantity || 0), 0);

              const countryName = countryCodeToName[shape.country] || shape.country || 'Unknown Country';
              if (countryName === 'Unknown Country' || !shape.averageTemperature) {
                return {
                  shape,
                  error: 'Données incomplètes (pays ou température manquant)',
                  chartData: null,
                  currentYield: null,
                };
              }

              const payload = {
                pesticides: totalPesticides || 200,
                temp: parseFloat(shape.averageTemperature),
                country: countryName,
              };

              const predictResponse = await axios.post('http://localhost:5000/api/wheat/predict', payload, {
                headers: { 'Content-Type': 'application/json' },
              });

              const { pesticides: pesticidesData, temp: tempData, current_yield } = predictResponse.data;

              const pesticidesYields = pesticidesData.yields;
              const tempYields = tempData.yields;
              const allYields = [...pesticidesYields, ...tempYields];
              const minYield = Math.min(...allYields);
              const maxYield = Math.max(...allYields);
              const paddingYield = (maxYield - minYield) * 0.05;
              const yMin = minYield - paddingYield;
              const yMax = maxYield + paddingYield;

              const formattedPesticideRanges = pesticidesData.ranges.map(range => Number(range).toFixed(0));
              const formattedTempRanges = tempData.ranges.map(range => Number(range).toFixed(1));

              return {
                shape,
                totalPesticides,
                chartData: {
                  pesticides: {
                    labels: formattedPesticideRanges,
                    datasets: [
                      {
                        label: 'Pesticides (tonnes)',
                        data: pesticidesData.yields,
                        borderColor: '#2e7d32',
                        backgroundColor: 'rgba(46, 125, 50, 0.2)',
                        fill: false,
                        pointRadius: 3,
                        pointBackgroundColor: '#2e7d32',
                        borderWidth: 3,
                        tension: 0.3,
                      },
                      {
                        label: `Votre valeur (${payload.pesticides})`,
                        data: Array(pesticidesData.ranges.length).fill(current_yield),
                        borderColor: '#a5d6a7',
                        borderDash: [5, 5],
                        pointRadius: pesticidesData.ranges.map((val) => val === pesticidesData.user_value ? 5 : 0),
                        pointBackgroundColor: '#a5d6a7',
                        borderWidth: 2,
                      },
                    ],
                    yMin,
                    yMax,
                  },
                  temp: {
                    labels: formattedTempRanges,
                    datasets: [
                      {
                        label: 'Température (°C)',
                        data: tempData.yields,
                        borderColor: '#fbc02d',
                        backgroundColor: 'rgba(251, 192, 45, 0.2)',
                        fill: false,
                        pointRadius: 3,
                        pointBackgroundColor: '#fbc02d',
                        borderWidth: 3,
                        tension: 0.3,
                      },
                      {
                        label: `Votre valeur (${payload.temp.toFixed(1)})`,
                        data: Array(tempData.ranges.length).fill(current_yield),
                        borderColor: '#a5d6a7',
                        borderDash: [5, 5],
                        pointRadius: tempData.ranges.map((val) => val === tempData.user_value ? 5 : 0),
                        pointBackgroundColor: '#a5d6a7',
                        borderWidth: 2,
                      },
                    ],
                    yMin,
                    yMax,
                  },
                },
                currentYield: current_yield,
                error: null,
              };
            } catch (error) {
              return {
                shape,
                error: error.response?.data?.error || error.message || 'Erreur lors de la prédiction',
                chartData: null,
                currentYield: null,
              };
            }
          })
        );

        setShapes(allShapes);
        setPredictions(predictionsData);
        if (allShapes.length > 0) {
          setSelectedShape(allShapes[0]._id);
        }
        setError(null);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchShapesAndPredictions();
    }
  }, [userId]);

  const chartOptions = (xLabel, yMin, yMax) => ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { 
        position: 'top', 
        labels: { font: { size: 12, family: 'Poppins' }, color: '#2e7d32' }
      },
      title: { 
        display: false 
      },
      tooltip: { 
        backgroundColor: 'rgba(60, 47, 47, 0.9)', 
        titleFont: { size: 12 },
        bodyFont: { size: 10 }
      },
      annotation: {
        annotations: [
          ...(xLabel === 'Pesticides (tonnes)' ? [{
            type: 'box',
            xMin: 50,
            xMax: 150,
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            borderColor: '#2e7d32',
            label: {
              content: 'Plage écologique',
              enabled: true,
              position: 'center',
              font: { size: 14, family: 'Poppins' },
            },
          }] : []),
        ],
      },
    },
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { 
          color: '#3c2f2f', 
          font: { size: 10, family: 'Poppins' },
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        title: { display: true, text: xLabel, color: '#2e7d32', font: { size: 14, family: 'Poppins' } }
      },
      y: { 
        grid: { color: 'rgba(200, 200, 200, 0.2)' }, 
        ticks: { 
          color: '#3c2f2f', 
          font: { size: 10, family: 'Poppins' },
          callback: (value) => `${value.toFixed(1)} t/ha`,
          stepSize: 0.2
        },
        title: { display: true, text: 'Rendement', color: '#2e7d32', font: { size: 14, family: 'Poppins' } },
        min: yMin,
        max: yMax,
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
  });

  const handleShapeChange = (shapeId) => {
    setSelectedShape(shapeId);
    setShowModal(false);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const selectedPrediction = predictions.find((pred) => pred.shape._id === selectedShape);

  return (
    <section style={styles.section}>
      <div style={styles.leafOverlay} />
      <div style={styles.titleContainer}>
        <h2 style={styles.title}>Prévisions de Rendement</h2>
        <div style={styles.titleUnderline}></div>
        <p style={styles.subtitle}>Optimisez vos cultures avec l'agriculture verte 🌱</p>
      </div>
      <div style={styles.container}>
        {loading && <p style={styles.loading}>Chargement...</p>}
        {error && <p style={styles.error}>Erreur : {error}</p>}
        {!loading && !error && shapes.length === 0 && (
          <p style={styles.error}>Aucune parcelle trouvée. Veuillez ajouter des parcelles.</p>
        )}
        {!loading && !error && shapes.length > 0 && (
          <div>
            {/* Boutons de sélection des parcelles */}
            <div style={styles.buttonGroup}>
              {shapes.map((shape) => (
                <button
                  key={shape._id}
                  style={{
                    ...styles.shapeButton,
                    ...(selectedShape === shape._id ? styles.shapeButtonActive : {}),
                  }}
                  onClick={() => handleShapeChange(shape._id)}
                  onMouseEnter={(e) => {
                    if (selectedShape !== shape._id) {
                      e.currentTarget.style.backgroundColor = styles.shapeButtonHover.backgroundColor;
                      e.currentTarget.style.transform = styles.shapeButtonHover.transform;
                      e.currentTarget.style.boxShadow = styles.shapeButtonHover.boxShadow;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedShape !== shape._id) {
                      e.currentTarget.style.backgroundColor = styles.shapeButton.backgroundColor;
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  <span>🌾</span> Parcelle {shape.properties.id}
                </button>
              ))}
            </div>

            {selectedPrediction && (
              <div>
                {selectedPrediction.currentYield && (
                  <p style={styles.yieldText}>Rendement prévu : {selectedPrediction.currentYield.toFixed(2)} tonnes/ha</p>
                )}
                {selectedPrediction.chartData && (
                  <div style={styles.cardContainer}>
                    <div 
                      style={styles.card} 
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = styles.cardHover.transform;
                        e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.08)';
                      }}
                    >
                      <h6 style={styles.cardTitle}>Pesticides</h6>
                      <Line
                        data={selectedPrediction.chartData.pesticides}
                        options={chartOptions('Pesticides (tonnes)', selectedPrediction.chartData.pesticides.yMin, selectedPrediction.chartData.pesticides.yMax)}
                        height={350}
                      />
                    </div>
                    <div 
                      style={styles.card} 
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = styles.cardHover.transform;
                        e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.08)';
                      }}
                    >
                      <h6 style={styles.cardTitle}>Température</h6>
                      <Line
                        data={selectedPrediction.chartData.temp}
                        options={chartOptions('Température (°C)', selectedPrediction.chartData.temp.yMin, selectedPrediction.chartData.temp.yMax)}
                        height={350}
                      />
                    </div>
                  </div>
                )}
                <button
                  style={styles.detailsButton}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.detailsButtonHover.backgroundColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.detailsButton.backgroundColor}
                  onClick={handleShowModal}
                >
                  Voir les détails
                </button>

                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Détails de la parcelle {selectedPrediction?.shape.properties.id}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p><strong>Commentaire :</strong> {selectedPrediction?.shape.properties.comment || 'Aucun'}</p>
                    <p><strong>Pays :</strong> {countryCodeToName[selectedPrediction?.shape.country] || selectedPrediction?.shape.country}</p>
                    <p><strong>Température :</strong> {selectedPrediction?.shape.averageTemperature?.toFixed(1) || 'N/A'}°C</p>
                    <p><strong>Pesticides :</strong> {selectedPrediction?.totalPesticides?.toFixed(2) || 200} tonnes</p>
                    {selectedPrediction?.currentYield && (
                      <p><strong>Rendement prévu :</strong> {selectedPrediction.currentYield.toFixed(2)} tonnes/ha</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Fermer
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default WheatPrediction;