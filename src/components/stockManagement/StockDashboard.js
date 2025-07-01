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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = 'http://localhost:5000';

const StockDashboard = () => {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: '', search: '' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formType, setFormType] = useState('product');
  const [selectedItem, setSelectedItem] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newCarrierDialog, setNewCarrierDialog] = useState(false);
  const navigate = useNavigate();

  const stockData = {
    labels: ['Intrants', 'Produits Finis'],
    datasets: [
      {
        data: [
          products.filter((p) => p.type === 'Intrant').reduce((sum, p) => sum + p.quantity, 0),
          products.filter((p) => p.type === 'Produit Fini').reduce((sum, p) => sum + p.quantity, 0),
        ],
        backgroundColor: ['#4caf50', '#388e3c'],
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
      } catch (err) {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };
    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      fetchProducts();
      fetchMovements();
      fetchAlerts();
      fetchCarriers();
      fetchTransactions();
    }
  }, [userId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stock/products`, {
        params: { userId },
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      setNotification({ open: true, message: 'Erreur lors du chargement des produits', severity: 'error' });
      console.error(error);
    }
  };

  const fetchMovements = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stock/movements`, {
        params: { userId },
        withCredentials: true,
      });
      setMovements(response.data);
    } catch (error) {
      setNotification({ open: true, message: 'Erreur lors du chargement des mouvements', severity: 'error' });
      console.error(error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stock/alerts`, {
        params: { userId },
        withCredentials: true,
      });
      setAlerts(response.data);
    } catch (error) {
      setNotification({ open: true, message: 'Erreur lors du chargement des alertes', severity: 'error' });
      console.error(error);
    }
  };

  const fetchCarriers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/carriers`, {
        params: { userId },
        withCredentials: true,
      });
      setCarriers(response.data);
    } catch (error) {
      setNotification({ open: true, message: 'Erreur lors du chargement des transporteurs', severity: 'error' });
      console.error(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/transaction/transactions`, {
        params: { userId },
        withCredentials: true,
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      setNotification({ open: true, message: 'Erreur lors du chargement des transactions', severity: 'error' });
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleDrawer = (type = 'product', item = null) => {
    setFormType(type);
    setSelectedItem(item);
    setDrawerOpen(!drawerOpen);
  };

  const handleSubmit = async (data) => {
    try {
      data.userId = userId;
      if (formType === 'product') {
        if (selectedItem) {
          await axios.put(`${API_URL}/api/stock/products/${selectedItem._id}`, data, { withCredentials: true });
          setNotification({ open: true, message: 'Produit mis à jour !', severity: 'success' });
        } else {
          await axios.post(`${API_URL}/api/stock/products`, data, { withCredentials: true });
          setNotification({ open: true, message: 'Produit ajouté !', severity: 'success' });
        }
        fetchProducts();
      } else if (formType === 'movement') {
        await axios.post(`${API_URL}/api/stock/movements`, data, { withCredentials: true });
        setNotification({ open: true, message: 'Mouvement enregistré !', severity: 'success' });
        fetchMovements();
      } else if (formType === 'carrier') {
        if (selectedItem) {
          await axios.put(`${API_URL}/api/carriers/${selectedItem._id}`, data, { withCredentials: true });
          setNotification({ open: true, message: 'Transporteur mis à jour !', severity: 'success' });
        } else {
          await axios.post(`${API_URL}/api/carriers`, data, { withCredentials: true });
          setNotification({ open: true, message: 'Transporteur ajouté !', severity: 'success' });
        }
        fetchCarriers();
      } else if (formType === 'transaction') {
        await axios.post(`${API_URL}/transaction/transactions`, data, { withCredentials: true });
        setNotification({ open: true, message: 'Transaction enregistrée !', severity: 'success' });
        fetchTransactions();
      }
      fetchAlerts();
      toggleDrawer();
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Erreur lors de l’opération',
        severity: 'error',
      });
    }
    setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
  };

  const handleCreateCarrier = async (data) => {
    try {
      data.userId = userId;
      const response = await axios.post(`${API_URL}/api/carriers`, data, { withCredentials: true });
      setCarriers([...carriers, response.data]);
      setNotification({ open: true, message: 'Transporteur créé avec succès !', severity: 'success' });
      setNewCarrierDialog(false);
      return response.data._id; // Return the new carrier's ID for transaction form
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Erreur lors de la création du transporteur',
        severity: 'error',
      });
    }
    setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
  };

  const handleDelete = async (id, type) => {
    try {
      await axios.delete(`${API_URL}/api/${type}/${id}`, {
        data: { userId },
        withCredentials: true,
      });
      setNotification({ open: true, message: `${type === 'products' ? 'Produit' : type === 'movements' ? 'Mouvement' : type === 'carriers' ? 'Transporteur' : 'Transaction'} supprimé !`, severity: 'success' });
      if (type === 'products') fetchProducts();
      else if (type === 'movements') fetchMovements();
      else if (type === 'carriers') fetchCarriers();
      else if (type === 'transactions') fetchTransactions();
    } catch (error) {
      setNotification({ open: true, message: 'Erreur lors de la suppression', severity: 'error' });
    }
    setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
  };

  if (!isAuthenticated) return null;

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
          Gestion de Stock - Harvest Flow
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
          <Tab label="Produits" />
          <Tab label="Mouvements" />
          <Tab label="Alertes" />
          <Tab label="Transporteurs" />
          <Tab label="Transactions" />
        </Tabs>
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: '#388e3c', mb: 2 }}>
                  Répartition des Stocks
                </Typography>
                <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                  <Doughnut
                    data={stockData}
                    options={{
                      plugins: {
                        legend: { display: true, position: 'right' },
                        tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw} unités` } },
                      },
                      animation: { duration: 1000, easing: 'easeOutCubic' },
                      cutout: '70%',
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: '#388e3c', mb: 2 }}>
                  Résumé du Stock
                </Typography>
                <Typography>Total Intrants: {stockData.datasets[0].data[0]} unités</Typography>
                <Typography>Total Produits Finis: {stockData.datasets[0].data[1]} unités</Typography>
                <Typography>Alertes Actives: {alerts.length}</Typography>
                <Typography>Transporteurs: {carriers.length}</Typography>
                <Typography>Transactions: {transactions.length}</Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
        {activeTab === 1 && (
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
                    Liste des Produits
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                      '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)', transform: 'scale(1.05)' },
                    }}
                    onClick={() => toggleDrawer('product')}
                  >
                    Ajouter Produit
                  </Button>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="Type"
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      >
                        <MenuItem value="">Tous</MenuItem>
                        <MenuItem value="Intrant">Intrant</MenuItem>
                        <MenuItem value="Produit Fini">Produit Fini</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Rechercher"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                        sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="tableau produits">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Nom</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Quantité</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Unité</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Prix (€)</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products
                        .filter(
                          (p) =>
                            (!filters.type || p.type === filters.type) &&
                            (!filters.search || p.name.toLowerCase().includes(filters.search.toLowerCase()))
                        )
                        .map((row) => (
                          <TableRow key={row._id} sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{row.unit}</TableCell>
                            <TableCell>{row.unitPrice}</TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => toggleDrawer('product', row)}
                                sx={{ mr: 1 }}
                              >
                                Modifier
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleDelete(row._id, 'products')}
                              >
                                Supprimer
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
                    Mouvements de Stock
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                      '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)', transform: 'scale(1.05)' },
                    }}
                    onClick={() => toggleDrawer('movement')}
                  >
                    Nouveau Mouvement
                  </Button>
                </Box>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="tableau mouvements">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Produit</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Quantité</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Référence</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {movements.map((row) => (
                        <TableRow key={row._id} sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
                          <TableCell>{row.productId?.name}</TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                          <TableCell>{row.reference || '-'}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDelete(row._id, 'movements')}
                            >
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}
        {activeTab === 3 && (
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
                <Typography variant="h6" sx={{ color: '#388e3c', mb: 2 }}>
                  Alertes de Stock
                </Typography>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="tableau alertes">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Produit</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Quantité</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Date d’Expiration</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Alerte</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {alerts.map((row) => (
                        <TableRow key={row._id} sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>
                            {row.expirationDate ? new Date(row.expirationDate).toLocaleDateString() : '-'}
                          </TableCell>
                          <TableCell>
                            {row.quantity <= 10 ? 'Stock faible' : 'Expiration proche'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}
        {activeTab === 4 && (
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
                    Liste des Transporteurs
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                      '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)', transform: 'scale(1.05)' },
                    }}
                    onClick={() => toggleDrawer('carrier')}
                  >
                    Ajouter Transporteur
                  </Button>
                </Box>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="tableau transporteurs">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Nom</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Contact</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Entreprise</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Type de Véhicule</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Capacité</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {carriers.map((row) => (
                        <TableRow key={row._id} sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.contact}</TableCell>
                          <TableCell>{row.companyName || '-'}</TableCell>
                          <TableCell>{row.vehicleType}</TableCell>
                          <TableCell>{row.capacity ? `${row.capacity} tonnes` : '-'}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => toggleDrawer('carrier', row)}
                              sx={{ mr: 1 }}
                            >
                              Modifier
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDelete(row._id, 'carriers')}
                            >
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}
        {activeTab === 5 && (
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
                    Liste des Transactions
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                      '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)', transform: 'scale(1.05)' },
                    }}
                    onClick={() => toggleDrawer('transaction')}
                  >
                    Nouvelle Transaction
                  </Button>
                </Box>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="tableau transactions">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Compte</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Montant</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Transporteur</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((row) => (
                        <TableRow key={row._id} sx={{ '&:hover': { backgroundColor: '#f1f8e9' } }}>
                          <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.account}</TableCell>
                          <TableCell>{row.type}</TableCell>
                          <TableCell>{row.amount} {row.currency}</TableCell>
                          <TableCell>{row.carrierId ? row.carrierId.name : '-'}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleDelete(row._id, 'transactions')}
                            >
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        )}
        <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer()}>
          <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 3 }}>
            <Typography variant="h6" sx={{ color: '#388e3c', mb: 2 }}>
              {formType === 'product' ? (selectedItem ? 'Modifier Produit' : 'Ajouter Produit') :
               formType === 'movement' ? 'Nouveau Mouvement' :
               formType === 'carrier' ? (selectedItem ? 'Modifier Transporteur' : 'Ajouter Transporteur') :
               'Nouvelle Transaction'}
            </Typography>
            {formType === 'product' ? (
              <Box component="form" onSubmit={(e) => {
                e.preventDefault();
                const data = {
                  name: e.target.name.value,
                  type: e.target.type.value,
                  quantity: Number(e.target.quantity.value),
                  unit: e.target.unit.value,
                  unitPrice: Number(e.target.unitPrice.value),
                  expirationDate: e.target.expirationDate.value || undefined,
                  lotNumber: e.target.lotNumber.value || undefined,
                };
                handleSubmit(data);
              }}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="name"
                  defaultValue={selectedItem?.name}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Type"
                  name="type"
                  defaultValue={selectedItem?.type}
                  required
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Intrant">Intrant</MenuItem>
                  <MenuItem value="Produit Fini">Produit Fini</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Quantité"
                  name="quantity"
                  type="number"
                  defaultValue={selectedItem?.quantity}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Unité"
                  name="unit"
                  defaultValue={selectedItem?.unit}
                  required
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="kg">kg</MenuItem>
                  <MenuItem value="litre">litre</MenuItem>
                  <MenuItem value="sac">sac</MenuItem>
                  <MenuItem value="unité">unité</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Prix Unitaire (€)"
                  name="unitPrice"
                  type="number"
                  defaultValue={selectedItem?.unitPrice}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Date d’Expiration"
                  name="expirationDate"
                  type="date"
                  defaultValue={selectedItem?.expirationDate ? selectedItem.expirationDate.split('T')[0] : ''}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Numéro de Lot"
                  name="lotNumber"
                  defaultValue={selectedItem?.lotNumber}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                    '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)' },
                  }}
                >
                  Enregistrer
                </Button>
              </Box>
            ) : formType === 'movement' ? (
              <Box component="form" onSubmit={(e) => {
                e.preventDefault();
                const data = {
                  productId: e.target.productId.value,
                  type: e.target.type.value,
                  quantity: Number(e.target.quantity.value),
                  reference: e.target.reference.value || undefined,
                  destination: e.target.destination.value || undefined,
                };
                handleSubmit(data);
              }}>
                <TextField
                  select
                  fullWidth
                  label="Produit"
                  name="productId"
                  required
                  sx={{ mb: 2 }}
                >
                  {products.map((p) => (
                    <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Type"
                  name="type"
                  required
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Entrée">Entrée</MenuItem>
                  <MenuItem value="Sortie">Sortie</MenuItem>
                  <MenuItem value="Transfert">Transfert</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Quantité"
                  name="quantity"
                  type="number"
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Référence"
                  name="reference"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Destination"
                  name="destination"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                    '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)' },
                  }}
                >
                  Enregistrer
                </Button>
              </Box>
            ) : formType === 'carrier' ? (
              <Box component="form" onSubmit={(e) => {
                e.preventDefault();
                const data = {
                  name: e.target.name.value,
                  contact: e.target.contact.value,
                  address: e.target.address.value || undefined,
                  companyName: e.target.companyName.value || undefined,
                  vehicleType: e.target.vehicleType.value,
                  capacity: Number(e.target.capacity.value) || undefined,
                };
                handleSubmit(data);
              }}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="name"
                  defaultValue={selectedItem?.name}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Contact"
                  name="contact"
                  defaultValue={selectedItem?.contact}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Adresse"
                  name="address"
                  defaultValue={selectedItem?.address}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Nom de l’Entreprise"
                  name="companyName"
                  defaultValue={selectedItem?.companyName}
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Type de Véhicule"
                  name="vehicleType"
                  defaultValue={selectedItem?.vehicleType || 'Autre'}
                  required
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Camion">Camion</MenuItem>
                  <MenuItem value="Fourgon">Fourgon</MenuItem>
                  <MenuItem value="Remorque">Remorque</MenuItem>
                  <MenuItem value="Autre">Autre</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Capacité (tonnes)"
                  name="capacity"
                  type="number"
                  defaultValue={selectedItem?.capacity}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                    '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)' },
                  }}
                >
                  Enregistrer
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={(e) => {
                e.preventDefault();
                const data = {
                  date: e.target.date.value || undefined,
                  description: e.target.description.value,
                  account: e.target.account.value,
                  type: e.target.type.value,
                  amount: Number(e.target.amount.value),
                  currency: e.target.currency.value,
                  reference: e.target.reference.value,
                  carrierId: e.target.carrierId.value || undefined,
                };
                handleSubmit(data);
              }}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  defaultValue={selectedItem?.date ? selectedItem.date.split('T')[0] : ''}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  defaultValue={selectedItem?.description}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Compte"
                  name="account"
                  defaultValue={selectedItem?.account}
                  required
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Vente de produits agricoles">Vente de produits agricoles</MenuItem>
                  <MenuItem value="Achat d’intrants">Achat d’intrants</MenuItem>
                  <MenuItem value="Main-d’œuvre">Main-d’œuvre</MenuItem>
                  <MenuItem value="Frais de transport">Frais de transport</MenuItem>
                  <MenuItem value="Commissions">Commissions</MenuItem>
                  <MenuItem value="Services externes">Services externes</MenuItem>
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Type"
                  name="type"
                  defaultValue={selectedItem?.type}
                  required
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Recette">Recette</MenuItem>
                  <MenuItem value="Dépense">Dépense</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Montant"
                  name="amount"
                  type="number"
                  defaultValue={selectedItem?.amount}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  fullWidth
                  label="Devise"
                  name="currency"
                  defaultValue={selectedItem?.currency || 'EUR'}
                  required
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="TND">TND</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Référence"
                  name="reference"
                  defaultValue={selectedItem?.reference}
                  required
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TextField
                    select
                    fullWidth
                    label="Transporteur"
                    name="carrierId"
                    defaultValue={selectedItem?.carrierId?._id || ''}
                    sx={{ mr: 1 }}
                  >
                    <MenuItem value="">Aucun</MenuItem>
                    {carriers.map((c) => (
                      <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                    ))}
                  </TextField>
                  <Button
                    variant="outlined"
                    onClick={() => setNewCarrierDialog(true)}
                    sx={{ minWidth: 'auto' }}
                  >
                    Nouveau
                  </Button>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
                    '&:hover': { background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)' },
                  }}
                >
                  Enregistrer
                </Button>
              </Box>
            )}
          </Box>
        </Drawer>
        <Dialog open={newCarrierDialog} onClose={() => setNewCarrierDialog(false)}>
          <DialogTitle>Ajouter un Nouveau Transporteur</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={(e) => {
              e.preventDefault();
              const data = {
                name: e.target.name.value,
                contact: e.target.contact.value,
                address: e.target.address.value || undefined,
                companyName: e.target.companyName.value || undefined,
                vehicleType: e.target.vehicleType.value,
                capacity: Number(e.target.capacity.value) || undefined,
              };
              handleCreateCarrier(data).then((newCarrierId) => {
                if (newCarrierId) {
                  // Optionally update the transaction form with the new carrier ID
                }
              });
            }}>
              <TextField
                fullWidth
                label="Nom"
                name="name"
                required
                sx={{ mb: 2, mt: 1 }}
              />
              <TextField
                fullWidth
                label="Contact"
                name="contact"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Adresse"
                name="address"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Nom de l’Entreprise"
                name="companyName"
                sx={{ mb: 2 }}
              />
              <TextField
                select
                fullWidth
                label="Type de Véhicule"
                name="vehicleType"
                defaultValue="Autre"
                required
                sx={{ mb: 2 }}
              >
                <MenuItem value="Camion">Camion</MenuItem>
                <MenuItem value="Fourgon">Fourgon</MenuItem>
                <MenuItem value="Remorque">Remorque</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Capacité (tonnes)"
                name="capacity"
                type="number"
                sx={{ mb: 2 }}
              />
              <DialogActions>
                <Button onClick={() => setNewCarrierDialog(false)}>Annuler</Button>
                <Button type="submit" variant="contained" sx={{ background: '#2e7d32' }}>
                  Créer
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default StockDashboard;