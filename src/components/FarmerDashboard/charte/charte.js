import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { 
  FaSeedling, 
  FaMoneyBillWave, 
  FaWater, 
  FaSun, 
  FaTasks, 
  FaExclamationTriangle, 
  FaClock,
  FaLeaf 
} from 'react-icons/fa';
import './AdminDashboard.css';
import WheatPrediction from '../cropYield/WheatPrediction';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const lineData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [{
      label: 'Rendement Agricole (tonnes)',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#2E7D32',
      backgroundColor: 'rgba(46, 125, 50, 0.2)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#66BB6A',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    }],
  };

  const barData = {
    labels: ['Blé', 'Maïs', 'Orge', 'Soja'],
    datasets: [
      {
        label: 'Stock Actuel',
        data: [65, 59, 80, 81],
        backgroundColor: '#2E7D32',
        borderColor: '#1B5E20',
        borderWidth: 1,
      },
      {
        label: 'Stock Prévu',
        data: [70, 55, 85, 78],
        backgroundColor: '#A5D6A7',
        borderColor: '#81C784',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Céréales', 'Légumes', 'Fruits', 'Autres'],
    datasets: [{
      label: 'Revenus par Culture',
      data: [3000, 4500, 2000, 1500],
      backgroundColor: ['#2E7D32', '#A5D6A7', '#FBC02D', '#B0BEC5'],
      borderColor: ['#fff'],
      borderWidth: 2,
    }],
  };

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12, family: 'Poppins' }, color: '#6D4C41' } },
      title: { display: true, font: { size: 14, family: 'Poppins', weight: '500' }, text: '', color: '#6D4C41', align: 'start' },
      tooltip: { backgroundColor: 'rgba(60, 47, 47, 0.9)', titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart',
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: 'rgba(200, 200, 200, 0.2)' }, 
        ticks: { 
          color: '#3C2F2F', 
          font: { size: 10 },
          callback: (value) => value.toLocaleString('fr-FR') // Format numbers with commas
        } 
      },
      x: { 
        grid: { display: false }, 
        ticks: { color: '#3C2F2F', font: { size: 10 } } 
      },
    },
  };

  const lineOptions = { 
    ...baseOptions, 
    plugins: { ...baseOptions.plugins, title: { ...baseOptions.plugins.title, text: 'Rendement 2025' } },
    scales: {
      y: { display: false },
      x: { ticks: { font: { size: 10 } } },
    },
  };

  const barOptions = { 
    ...baseOptions, 
    plugins: { ...baseOptions.plugins, title: { ...baseOptions.plugins.title, text: 'Stock par Culture 2025' } },
    scales: {
      y: { 
        ticks: { 
          callback: (value) => `${value.toLocaleString('fr-FR')} t` 
        } 
      },
      x: { ticks: { font: { size: 12 } } },
    },
  };

  const doughnutOptions = {
    ...baseOptions,
    plugins: { 
      ...baseOptions.plugins, 
      title: { ...baseOptions.plugins.title, text: 'Revenus par Culture' },
      legend: { position: 'right', labels: { font: { size: 12, family: 'Poppins' }, color: '#3C2F2F' } },
    },
    scales: {},
  };

  const tasks = [
    { task: 'Analyser échantillons de sol', count: 3 },
    { task: 'Planifier semis', count: 5 },
    { task: 'Vérifier capteurs IoT', count: 2 },
  ];

  return (
    <div className="dashboard-container">
      {/* En-tête */}
      <Row className="mb-4 align-items-center">
        <Col>
          <div className="dashboard-header">
            <FaLeaf className="header-icon me-2" />
            <span className="header-text">Dashboard | Agriculteur</span>
          </div>
        </Col>
      </Row>

      {/* Cartes de statistiques */}
      <Row className="mb-4">
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center">
              <FaSeedling size={20} className="me-3 icon-gray" />
              <div>
                <Card.Title as="h6" className="card-label">Agriculteurs Actifs</Card.Title>
                <Card.Text className="card-value">1,245</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center">
              <FaMoneyBillWave size={20} className="me-3 icon-gray" />
              <div>
                <Card.Title as="h6" className="card-label">Revenus Agricoles</Card.Title>
                <Card.Text className="card-value">$12,300</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center">
              <FaWater size={20} className="me-3 icon-gray" />
              <div>
                <Card.Title as="h6" className="card-label">Cultures en Cours</Card.Title>
                <Card.Text className="card-value">89</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center">
              <FaSun size={20} className="me-3 icon-gray" />
              <div>
                <Card.Title as="h6" className="card-label">Santé des Sols</Card.Title>
                <Card.Text className="card-value">3.5/5</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graphiques principaux */}
      <Row className="mb-4">
        <Col xs={12} md={8} className="mb-4">
          <Card className="chart-card">
            <Card.Body>
              <Bar data={barData} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="mb-4">
          <Card className="chart-card">
            <Card.Body>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Nouvelle section pour WheatPrediction (pleine largeur) */}
   {/* Section pour WheatPrediction (sans carte) */}
   <Row className="mb-4">
        <Col xs={12}>
          <div className="full-width-prediction">
            <div className="d-flex align-items-center mb-3">
              <FaLeaf className="me-2 icon-gray" size={16} />
              <h5 className="chart-title mb-0">Prédiction du Rendement du Blé</h5>
            </div>
            <WheatPrediction />
          </div>
        </Col>
      </Row>

      {/* Alertes */}
      <Row className="mb-4 justify-content-end">
        <Col xs={12} md={4}>
          <Card className="extra-card">
            <Card.Header className="extra-header">
              <FaExclamationTriangle className="me-2 icon-gray" size={16} /> 
              <span className="extra-header-text">Alertes Système</span>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2"><Badge bg="danger">Stock faible</Badge> Blé (10 tonnes)</li>
                <li className="mb-2"><Badge bg="warning">Irrigation</Badge> Champ #1234 en déficit</li>
                <li><Badge bg="info">Maintenance</Badge> Tracteur prévu demain</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graphiques inférieurs et tâches */}
      <Row>
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="chart-card vivid-chart">
            <Card.Body>
              <Line data={lineData} options={lineOptions} height={200} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="chart-card">
            <Card.Body>
              <h5 className="chart-title">Tâches en Attente</h5>
              {tasks.map((item, index) => (
                <div key={index} className="task-item d-flex align-items-center mb-2">
                  <FaClock className="me-2 task-icon" size={16} />
                  <span>{item.task} ({item.count})</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card className="stats-card">
            <Card.Body>
              <h6 className="chart-title">Irrigation Status</h6>
              <ProgressBar now={60} label="60%" variant="success" />
              <p className="mt-2 small-text">Mise à jour il y a 3 heures</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;