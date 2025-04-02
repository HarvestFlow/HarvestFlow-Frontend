// frontend/src/components/CountryStats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaLeaf, FaTractor, FaChartLine, FaDownload } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import { saveAs } from 'file-saver';
import './CountryStats.css';
import countries from 'i18n-iso-countries';

// Charger les données des pays en anglais
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CountryStats = () => {
  const [countryName, setCountryName] = useState(''); // Nom complet du pays (ex: "Tunisia")
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Récupérer le pays de l'utilisateur au chargement du composant
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getProfile", { withCredentials: true });
        if (response.status === 200) {
          const alpha2Code = response.data.country; // Code Alpha-2 (ex: "TN")
          if (alpha2Code) {
            // Convertir le code Alpha-2 en nom complet
            const fullCountryName = countries.getName(alpha2Code, 'en', { select: 'official' });
            if (fullCountryName) {
              setCountryName(fullCountryName); // Ex: "Tunisia"
              // Déclencher automatiquement la requête pour les statistiques
              fetchStats(fullCountryName);
            } else {
              setError(`Code pays invalide : ${alpha2Code}`);
            }
          } else {
            setError('Aucun pays trouvé dans le profil de l\'utilisateur.');
          }
        }
      } catch (err) {
        setError('Erreur lors de la récupération du profil utilisateur : ' + (err.response?.data?.message || err.message));
      }
    };

    fetchUserProfile();
  }, []); // Exécuter une seule fois au chargement du composant

  // Fonction pour récupérer les statistiques
  const fetchStats = async (country) => {
    setError('');
    setStats(null);
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/api/wheat/stats/${country}`);
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la récupération des données');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!stats) return;

    const headers = ['Année', 'Superficie Récoltée (ha)', 'Rendement (kg/ha)', 'Production (t)'];
    const rows = stats.summary.map(row => [
      row['Année'],
      row['Superficie Récoltée (ha)'],
      row['Rendement (kg/ha)'],
      row['Production (t)'],
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${stats.country_name}_wheat_stats.csv`);
  };

  const productionChartData = stats && {
    labels: stats.chart_data.years,
    datasets: [
      {
        label: 'Production (t)',
        data: stats.chart_data.production,
        borderColor: '#2E7D32', // Vert principal
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#1B5E20',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2E7D32',
      },
    ],
  };

  const yieldChartData = stats && {
    labels: stats.chart_data.years,
    datasets: [
      {
        label: 'Rendement (kg/ha)',
        data: stats.chart_data.yield, // Corrigé : utiliser yield au lieu de production
        borderColor: '#4CAF50', // Vert clair
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#1B5E20',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4CAF50',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, family: 'Roboto' },
          color: '#1B5E20',
        },
      },
      title: {
        display: true,
        font: { size: 18, family: 'Roboto', weight: 'bold' },
        color: '#1B5E20',
      },
      tooltip: {
        backgroundColor: '#2E7D32',
        titleFont: { family: 'Roboto' },
        bodyFont: { family: 'Roboto' },
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: {
        ticks: { color: '#1B5E20', font: { family: 'Roboto' } },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#1B5E20', font: { family: 'Roboto' } },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
      },
    },
  };

  return (
    <div className="country-stats-container">
      {/* Header Section */}
      <div className="country-stats-header">
        <h1>
          <FaLeaf /> Statistiques sur le blé
        </h1>
        <p>Analyse avancée pour les agriculteurs modernes</p>
      </div>

      {/* Form Section */}
      <div className="country-stats-form">
        {countryName ? (
          <p className="country-name-display">
            <FaTractor /> Pays : <strong>{countryName}</strong>
          </p>
        ) : (
          <p className="country-name-display">
            <FaTractor /> Chargement du pays...
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="country-stats-error">{error}</div>}

      {/* Stats Section */}
      {stats && (
        <div className="country-stats-content">
          {/* Country Header */}
          <h2>Statistiques pour {stats.country_name} (Code: {stats.country_code})</h2>

          {/* Summary Table */}
          <div className="country-stats-table">
            <div className="country-stats-table-header">
              <h3>Résumé des données (dernières 5 années disponibles) :</h3>
              <button onClick={exportToCSV}>
                <FaDownload /> Exporter en CSV
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Année</th>
                    <th>Superficie Récoltée (ha)</th>
                    <th>Rendement (kg/ha)</th>
                    <th>Production (t)</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.summary.map((row, index) => (
                    <tr key={index}>
                      <td>{row['Année']}</td>
                      <td>{row['Superficie Récoltée (ha)'].toLocaleString()}</td>
                      <td>{row['Rendement (kg/ha)'].toLocaleString()}</td>
                      <td>{row['Production (t)'].toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Global Stats */}
          <div className="country-stats-global">
            <h3>Statistiques globales :</h3>
            <div className="country-stats-global-grid">
              <div className="country-stats-global-card">
                <p>Production moyenne :</p>
                <p>{stats.stats.production_mean.toLocaleString()} kg</p>
              </div>
              <div className="country-stats-global-card">
                <p>Rendement moyen :</p>
                <p>{stats.stats.yield_mean.toLocaleString()} kg/ha</p>
              </div>
              <div className="country-stats-global-card">
                <p>Superficie moyenne :</p>
                <p>{stats.stats.area_harvested_mean.toLocaleString()} ha</p>
              </div>
              <div className="country-stats-global-card">
                <p>Année avec production max :</p>
                <p>
                  {stats.stats.production_max_year} ({stats.stats.production_max.toLocaleString()} kg)
                </p>
              </div>
              <div className="country-stats-global-card">
                <p>Année avec production min :</p>
                <p>
                  {stats.stats.production_min_year} ({stats.stats.production_min.toLocaleString()} kg)
                </p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="country-stats-charts">
            <h3>Graphiques :</h3>
            <div className="country-stats-charts-grid">
              <div className="country-stats-chart">
                <Line
                  data={productionChartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: { ...chartOptions.plugins.title, text: `Production de blé - ${stats.country_name}` },
                    },
                  }}
                />
              </div>
              <div className="country-stats-chart">
                <Line
                  data={yieldChartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: { ...chartOptions.plugins.title, text: `Rendement de blé - ${stats.country_name}` },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="country-stats-loading">
          <ClipLoader color="#2E7D32" size={50} />
          <p>Chargement des statistiques...</p>
        </div>
      )}
    </div>
  );
};

export default CountryStats;