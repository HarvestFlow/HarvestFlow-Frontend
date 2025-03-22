import React, { useState } from 'react';
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
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { 
  FaUsers, 
  FaDollarSign, 
  FaShoppingCart, 
  FaChartLine, 
  FaTasks, 
  FaExclamationTriangle, 
  FaClock 
} from 'react-icons/fa';
import './AdminDashboard.css';

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
  const [timeFilter, setTimeFilter] = useState('Mensuel');

  const lineData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [{
      label: 'Ventes Mensuelles',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.3)',
      tension: 0.4,
      fill: true,
    }],
  };

  const barData = {
    labels: ['Produit A', 'Produit B', 'Produit C', 'Produit D'],
    datasets: [{
      label: 'Stock',
      data: [65, 59, 80, 81],
      backgroundColor: ['#4CAF50', '#66BB6A', '#81C784', '#AED581'],
      borderColor: ['#388E3C', '#4CAF50', '#66BB6A', '#81C784'],
      borderWidth: 1,
    }],
  };

  const doughnutData = {
    labels: ['Électronique', 'Mode', 'Maison', 'Autres'],
    datasets: [{
      label: 'Revenus par Catégorie',
      data: [3000, 4500, 2000, 1500],
      backgroundColor: ['#4CAF50', '#66BB6A', '#81C784', '#AED581'],
      borderColor: ['#fff'],
      borderWidth: 2,
    }],
  };

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 12, family: 'Poppins' } } },
      title: { display: true, font: { size: 18, family: 'Poppins', weight: 'bold' }, text: '' },
      tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.9)', titleFont: { size: 14 }, bodyFont: { size: 12 } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(200, 200, 200, 0.2)' } },
      x: { grid: { display: false } },
    },
  };

  const lineOptions = { ...baseOptions, plugins: { ...baseOptions.plugins, title: { ...baseOptions.plugins.title, text: `Ventes ${timeFilter} 2025` } } };
  const barOptions = { ...baseOptions, plugins: { ...baseOptions.plugins, title: { ...baseOptions.plugins.title, text: 'Stock par Produit' } } };
  const doughnutOptions = {
    ...baseOptions,
    plugins: { ...baseOptions.plugins, title: { ...baseOptions.plugins.title, text: 'Revenus par Catégorie' } },
    scales: {},
  };

  const handleFilterChange = (filter) => setTimeFilter(filter);

  return (
    <>
      {/* En-tête */}
      <Row className="mb-4 align-items-center">
        <Col md={6}>
          <h2 className="dashboard-title">Tableau de Bord Admin</h2>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="outline-success" className="filter-btn me-2" onClick={() => handleFilterChange('Hebdomadaire')}>
            Hebdomadaire
          </Button>
          <Button variant="outline-success" className="filter-btn me-2" onClick={() => handleFilterChange('Mensuel')}>
            Mensuel
          </Button>
          <Button variant="outline-success" className="filter-btn" onClick={() => handleFilterChange('Annuel')}>
            Annuel
          </Button>
        </Col>
      </Row>

      {/* Cartes de statistiques */}
      <Row className="mb-4">
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center">
              <FaUsers size={35} className="me-3 icon-3d" />
              <div>
                <Card.Title as="h3" className="card-title">Utilisateurs Actifs</Card.Title>
                <Card.Text className="card-value">1,245</Card.Text>
                <Badge bg="light" text="dark" className="stats-badge">+5% ce mois</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center">
              <FaDollarSign size={35} className="me-3 icon-3d" />
              <div>
                <Card.Title as="h3" className="card-title">Ventes Totales</Card.Title>
                <Card.Text className="card-value">$12,300</Card.Text>
                <Badge bg="light" text="dark" className="stats-badge">+12% vs dernier mois</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center">
              <FaShoppingCart size={35} className="me-3 icon-3d" />
              <div>
                <Card.Title as="h3" className="card-title">Commandes en Cours</Card.Title>
                <Card.Text className="card-value">89</Card.Text>
                <Badge bg="warning" text="dark" className="stats-badge">3 en attente</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3">
          <Card className="stats-card">
            <Card.Body className="d-flex align-items-center">
              <FaChartLine size={35} className="me-3 icon-3d" />
              <div>
                <Card.Title as="h3" className="card-title">Taux de Conversion</Card.Title>
                <Card.Text className="card-value">3.5%</Card.Text>
                <Badge bg="light" text="dark" className="stats-badge">Stable</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Graphiques */}
      <Row className="mb-4">
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="chart-card">
            <Card.Body>
              <Line data={lineData} options={lineOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="chart-card">
            <Card.Body>
              <Bar data={barData} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="chart-card">
            <Card.Body>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Alertes et Tâches */}
      <Row>
        <Col xs={12} md={6} className="mb-4">
          <Card className="extra-card E">
            <Card.Header className="extra-header">
              <FaExclamationTriangle className="me-2" /> Alertes Système
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2"><Badge bg="danger">Stock faible</Badge> Produit A (10 unités)</li>
                <li className="mb-2"><Badge bg="warning">Délai</Badge> Commande #1234 en retard</li>
                <li><Badge bg="info">Maintenance</Badge> Serveur prévu demain</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <Card className="extra-card">
            <Card.Header className="extra-header">
              <FaTasks className="me-2" /> Tâches en Attente
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2"><FaClock className="me-2" /> Vérifier les retours (3)</li>
                <li className="mb-2"><FaClock className="me-2" /> Approuver nouveaux produits (5)</li>
                <li><FaClock className="me-2" /> Répondre aux tickets (2)</li>
              </ul>
              <Button variant="success" size="sm" className="mt-2 action-btn">Voir Toutes</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;