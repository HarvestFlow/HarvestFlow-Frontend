import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Alert,
  Fade,
  Tabs,
  Tab,
  Drawer,
} from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TransactionForm from './TransactionForm';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const API_URL = 'http://localhost:5000';

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalCredits: 0, totalDebits: 0, balance: 0 });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', account: '' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const accounts = [
    'Vente de produits agricoles',
    'Achat d’intrants',
    'Main-d’œuvre',
    'Frais de transport',
    'Commissions',
    'Services externes',
  ];

  // Données simulées pour l'évolution des revenus
  const revenueData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Revenus (€)',
        data: [0, 20000, 40000, 60000, 80000, 100000],
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Bénéfices (€)',
        data: [0, 10000, 25000, 40000, 50000, 60000],
        borderColor: '#388e3c',
        backgroundColor: 'rgba(56, 142, 60, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Données pour la répartition des dépenses
  const expenseData = {
    labels: ['Salaires', 'Fournitures', 'Marketing', 'Autres'],
    datasets: [
      {
        data: [35, 25, 20, 20],
        backgroundColor: ['#d32f2f', '#4caf50', '#f44336', '#388e3c'],
        hoverOffset: 20,
      },
    ],
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/getProfile`, { withCredentials: true });
        setIsAuthenticated(true);
        setUserId(response.data._id);
        if (!response.data.isActivated) console.log('Account not activated');
      } catch (err) {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchTransactions(userId, filters);
    }
  }, [userId, filters]);

  const fetchTransactions = async (userId, filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/transaction/transactions`, {
        params: { userId, ...filters },
      });
      setTransactions(response.data.transactions);
      setSummary(response.data.summary);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Erreur lors du chargement des transactions',
        severity: 'error',
      });
      setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
      console.error('Erreur lors de la récupération des transactions:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/transaction/transactions/${id}`);
      setNotification({ open: true, message: 'Transaction supprimée avec succès !', severity: 'success' });
      if (userId) {
        fetchTransactions(userId, filters);
      }
      setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Échec de la suppression',
        severity: 'error',
      });
      setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Journal Général - Harvest Flow', 14, 10);
      autoTable(doc, {
        head: [['Date', 'Description', 'Compte', 'Type', 'Débit (€)', 'Crédit (€)', 'Référence']],
        body: transactions.map((row) => [
          new Date(row.date).toLocaleDateString(),
          row.description,
          row.account,
          row.type,
          row.type === 'Dépense' ? row.amount : '-',
          row.type === 'Recette' ? row.amount : '-',
          row.reference,
        ]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: '#2e7d32', textColor: '#fff' },
      });
      doc.save(`journal_general_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Erreur lors de l’exportation du PDF',
        severity: 'error',
      });
      setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
      console.error('Erreur lors de l’exportation PDF:', error);
    }
  };

  const chartData = {
    labels: ['Revenus', 'Dépenses'],
    datasets: [
      {
        label: 'Montant (€)',
        data: [summary.totalCredits, summary.totalDebits],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box>
      <Fade in={notification.open}>
        <Alert severity={notification.severity} sx={{ mb: 2, mx: 'auto', maxWidth: 'lg' }}>
          {notification.message}
        </Alert>
      </Fade>
      <Container maxWidth="lg" sx={{ py: 4, background: 'linear-gradient(180deg, #f5f7f5 0%, #e8f5e9 100%)' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#2e7d32',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          <AgricultureIcon sx={{ mr: 1, fontSize: 40, color: '#388e3c' }} />
          Gestion Financière - Harvest Flow
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            '& .MuiTab-root': { color: '#388e3c', fontWeight: 'medium' },
            '& .Mui-selected': { color: '#2e7d32', fontWeight: 'bold' },
            '& .MuiTabs-indicator': { backgroundColor: '#2e7d32' },
          }}
        >
          <Tab label="Résumé" />
          <Tab label="Graphiques" />
          <Tab label="Journal Général" />
        </Tabs>
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'medium' }}>
                  Total Crédits
                </Typography>
                <Typography variant="h5" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  €{summary.totalCredits.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'medium' }}>
                  Total Débits
                </Typography>
                <Typography variant="h5" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                  €{summary.totalDebits.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'medium' }}>
                  Solde
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: summary.balance >= 0 ? '#2e7d32' : '#d32f2f', fontWeight: 'bold' }}
                >
                  €{summary.balance.toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
        {activeTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                }}
              >
                <Typography variant="h6" sx={{ color: '#388e3c', mb: 2 }}>
                  Évolution des Revenus et Bénéfices
                </Typography>
                <Box sx={{ height: 250 }}>
                  <Line
                    data={revenueData}
                    options={{
                      plugins: { legend: { display: true, position: 'top' } },
                      scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Montant (€)' } },
                        x: { title: { display: true, text: 'Mois' } },
                      },
                      animation: { duration: 1000, easing: 'easeOutCubic' },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                }}
              >
                <Typography variant="h6" sx={{ color: '#388e3c', mb: 2 }}>
                  Répartition des Dépenses
                </Typography>
                <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                  <Doughnut
                    data={expenseData}
                    options={{
                      plugins: {
                        legend: { display: true, position: 'right' },
                        tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw}%` } },
                      },
                      animation: { duration: 1000, easing: 'easeOutCubic' },
                      cutout: '70%',
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: '#388e3c', mb: 2 }}>
                  Aperçu Financier
                </Typography>
                <Box sx={{ height: 200 }}>
                  <Bar
                    data={chartData}
                    options={{
                      plugins: { legend: { display: false } },
                      scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Montant (€)' } },
                      },
                      animation: { duration: 1000, easing: 'easeOutCubic' },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#388e3c' }}>
                    Journal Général
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                      transition: 'all 0.3s',
                      '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)', transform: 'scale(1.05)' },
                    }}
                    onClick={toggleDrawer}
                  >
                    Nouvelle Transaction
                  </Button>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Date de début"
                        name="startDate"
                        type="date"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Date de fin"
                        name="endDate"
                        type="date"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        select
                        fullWidth
                        label="Compte"
                        name="account"
                        value={filters.account}
                        onChange={handleFilterChange}
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      >
                        <MenuItem value="">Tous</MenuItem>
                        {accounts.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                    mb: 2,
                    transition: 'all 0.3s',
                    '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)', transform: 'scale(1.05)' },
                  }}
                  onClick={exportPDF}
                >
                  Exporter en PDF
                </Button>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="journal général">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Compte</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Débit (€)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Crédit (€)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Référence</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            Chargement...
                          </TableCell>
                        </TableRow>
                      ) : transactions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            Aucune transaction trouvée
                          </TableCell>
                        </TableRow>
                      ) : (
                        transactions.map((row) => (
                          <TableRow key={row._id} sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
                            <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.account}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.type === 'Dépense' ? row.amount : '-'}</TableCell>
                            <TableCell>{row.type === 'Recette' ? row.amount : '-'}</TableCell>
                            <TableCell>{row.reference}</TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleDelete(row._id)}
                                sx={{ transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
                              >
                                Supprimer
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 3 }}>
            <Typography variant="h6" sx={{ color: '#388e3c', mb: 2 }}>
              Nouvelle Écriture Comptable
            </Typography>
            <TransactionForm
              userId={userId}
              onSuccess={() => {
                fetchTransactions(userId, filters);
                toggleDrawer();
              }}
            />
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default FinanceDashboard;