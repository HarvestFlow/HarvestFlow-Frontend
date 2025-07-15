import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { saveAs } from 'file-saver';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_URL = 'http://localhost:5000';

function AdminContactDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [contactRequests, setContactRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filterUser, setFilterUser] = useState('');

  // Fetch user profile to verify admin status
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/getProfile`, {
        withCredentials: true,
        timeout: 5000,
      });
      setIsAuthenticated(true);
      setIsAdmin(response.data.isAdmin || true);
      if (response.data.isAdmin) {
        setError('Accès refusé : Seuls les administrateurs peuvent accéder à ce tableau de bord.');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.response || error.message);
      setError('Veuillez vous connecter pour accéder à ce tableau de bord.');
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  // Fetch all contact requests
  const fetchContactRequests = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user/contact-requests`, {
        params: { userId: isAuthenticated ? (await axios.get(`${API_URL}/user/getProfile`, { withCredentials: true })).data._id : null },
        withCredentials: true,
      });
      setContactRequests(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Échec de la récupération des demandes de contact.');
      setContactRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchContactRequests();
    }
  }, [isAuthenticated, isAdmin]);

  // Filter and search contact requests
  const filteredRequests = useMemo(() => {
    return contactRequests.filter((request) => {
      const matchesSearch = searchQuery
        ? request.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.toEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.offerTitle?.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesDateRange =
        (!dateRange.start || new Date(request.createdAt) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(request.createdAt) <= new Date(dateRange.end + 'T23:59:59'));

      const matchesUser = filterUser ? request.userId?._id === filterUser : true;

      return matchesSearch && matchesDateRange && matchesUser;
    });
  }, [contactRequests, searchQuery, dateRange, filterUser]);

  // Chart data for contact request trends
  const chartData = useMemo(() => {
    const dailyCounts = {};
    contactRequests.forEach((request) => {
      const date = new Date(request.createdAt).toLocaleDateString('fr-FR');
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    const labels = Object.keys(dailyCounts).sort((a, b) => new Date(a) - new Date(b));
    const data = labels.map((label) => dailyCounts[label]);

    return {
      labels,
      datasets: [
        {
          label: 'Demandes de contact par jour',
          data,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [contactRequests]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14, family: 'Arial', weight: 'bold' } } },
      title: { display: true, text: 'Tendances des Demandes de Contact', font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Nombre de demandes', font: { size: 14 } } },
      x: { title: { display: true, text: 'Date', font: { size: 14 } } },
    },
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Utilisateur', 'Email', 'Entreprise', 'Destinataire', 'Offre', 'Date'];
    const csvRows = [
      headers.join(','),
      ...filteredRequests.map((request) =>
        [
          request.firstname || 'N/A',
          request.email || 'N/A',
          request.company || 'N/A',
          request.toEmail || 'N/A',
          request.offerTitle || 'N/A',
          formatDate(request.createdAt),
        ].join(',')
      ),
    ];
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `contact_requests_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A');

  // Unique users for filter dropdown
  const uniqueUsers = useMemo(() => {
    const users = [...new Set(contactRequests.map((request) => request.userId?._id))].map((id) =>
      contactRequests.find((request) => request.userId?._id === id)?.userId
    );
    return users.filter((user) => user);
  }, [contactRequests]);

  return (
    <div className="dashboard-container">
      <style>
        {`
          .dashboard-container {
            min-height: 100vh;
            background: linear-gradient(to bottom, #f0fdf4, #ffffff);
            font-family: 'Arial', sans-serif;
          }
          .top-nav {
            background: #10b981;
            color: white;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            position: sticky;
            top: 0;
            z-index: 1000;
          }
          .top-nav h1 {
            font-size: 1.75rem;
            font-weight: bold;
          }
          .nav-links {
            display: flex;
            gap: 1rem;
          }
          .nav-links button {
            background: #059669;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s ease, transform 0.2s ease;
          }
          .nav-links button:hover {
            background: #047857;
            transform: scale(1.05);
          }
          .dashboard-header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 2rem;
            text-align: center;
            border-radius: 1rem;
            margin: 2rem auto;
            max-width: 1200px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation: fadeIn 0.5s ease;
          }
          .dashboard-header h1 {
            font-size: 2.25rem;
            margin-bottom: 0.5rem;
          }
          .dashboard-header p {
            font-size: 1.25rem;
            opacity: 0.9;
          }
          .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin: 2rem auto;
            max-width: 1200px;
            background: #e6f3e6;
            padding: 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.5s ease;
          }
          .controls input, .controls select {
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            flex: 1;
            min-width: 160px;
            font-size: 1rem;
            background: white;
            color: #1f2937;
          }
          .controls input::placeholder {
            color: #6b7280;
          }
          .chart-container {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin: 2rem auto;
            max-width: 800px;
            animation: slideIn 0.5s ease;
          }
          .contact-table {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            border-collapse: collapse;
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .contact-table th,
          .contact-table td {
            padding: 1.25rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            font-size: 1rem;
            color: #1f2937;
          }
          .contact-table th {
            background: #e6f3e6;
            color: #2e7d32;
            font-weight: 700;
            font-size: 1.1rem;
          }
          .contact-table tr {
            transition: background 0.2s ease, transform 0.2s ease;
          }
          .contact-table tr:hover {
            background: #f5f7f6;
            transform: translateY(-2px);
          }
          .contact-card {
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 1rem auto;
            max-width: 500px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
          .contact-card:hover {
            transform: translateY(-5px);
          }
          .contact-card p {
            font-size: 1rem;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }
          .error-message {
            background: #ffebee;
            color: #d32f2f;
            padding: 1rem;
            border-radius: 0.5rem;
            text-align: center;
            margin: 2rem auto;
            max-width: 1200px;
            font-size: 1.1rem;
          }
          .loading-message {
            text-align: center;
            color: #1f2937;
            font-size: 1.25rem;
            margin: 2rem 0;
          }
          .action-button {
            background: #10b981;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s ease, transform 0.2s ease;
          }
          .action-button:hover {
            background: #059669;
            transform: scale(1.05);
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @media (max-width: 768px) {
            .contact-table {
              display: none;
            }
            .contact-card {
              display: block;
            }
            .controls {
              flex-direction: column;
            }
            .nav-links {
              flex-wrap: wrap;
              gap: 0.5rem;
            }
            .nav-links button {
              padding: 0.5rem;
              font-size: 0.9rem;
            }
            .top-nav h1 {
              font-size: 1.5rem;
            }
            .dashboard-header h1 {
              font-size: 1.75rem;
            }
            .dashboard-header p {
              font-size: 1rem;
            }
          }
          @media (min-width: 769px) {
            .contact-card {
              display: none;
            }
          }
        `}
      </style>

      <div className="top-nav">
        <h1>Farmer Nexus Admin</h1>
        <div className="nav-links">
          <button onClick={() => navigate('/admin/dashboard')}>Tableau de Bord</button>
          <button onClick={() => navigate('/admin/users')}>Utilisateurs</button>
          <button onClick={() => fetchContactRequests()}>Demandes de Contact</button>
          <button onClick={() => navigate('/login')}>Déconnexion</button>
        </div>
      </div>

      <div className="dashboard-header">
        <h1>Demandes de Contact</h1>
        <p>Analysez et gérez les demandes de contact envoyées par les utilisateurs</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="controls">
        <input
          type="text"
          placeholder="Rechercher par nom, email, entreprise..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        >
          <option value="">Tous les utilisateurs</option>
          {uniqueUsers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstname || user.email || 'Utilisateur inconnu'}
            </option>
          ))}
        </select>
        <button className="action-button" onClick={fetchContactRequests}>
          Rafraîchir
        </button>
        <button className="action-button" onClick={exportToCSV}>
          Exporter en CSV
        </button>
      </div>

      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>

      {isLoading ? (
        <div className="loading-message">
          <span className="animate-spin inline-block mr-2">⌀</span> Chargement...
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-4xl text-gray-400 mb-4">📥</span>
          <p className="text-lg text-gray-700">Aucune demande de contact trouvée.</p>
        </div>
      ) : (
        <>
          <table className="contact-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Entreprise</th>
                <th>Destinataire</th>
                <th>Offre</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={request._id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <td>{request.firstname || 'N/A'}</td>
                  <td>{request.email || 'N/A'}</td>
                  <td>{request.company || 'N/A'}</td>
                  <td>{request.toEmail || 'N/A'}</td>
                  <td>{request.offerTitle || 'N/A'}</td>
                  <td>{formatDate(request.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRequests.map((request, index) => (
            <div key={request._id} className="contact-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <p><strong>Utilisateur:</strong> {request.firstname || 'N/A'}</p>
              <p><strong>Email:</strong> {request.email || 'N/A'}</p>
              <p><strong>Entreprise:</strong> {request.company || 'N/A'}</p>
              <p><strong>Destinataire:</strong> {request.toEmail || 'N/A'}</p>
              <p><strong>Offre:</strong> {request.offerTitle || 'N/A'}</p>
              <p><strong>Date:</strong> {formatDate(request.createdAt)}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AdminContactDashboard;