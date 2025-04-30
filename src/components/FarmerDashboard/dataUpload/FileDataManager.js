import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Typography, Stack, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, Paper,
  Tabs, Tab, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, IconButton, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Chip, Autocomplete,
} from '@mui/material';
import {
  Edit as EditIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon, Delete as DeleteIcon,
  Add as AddIcon, ViewColumn as ViewColumnIcon, Download as DownloadIcon, BarChart as BarChartIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip as ChartTooltip, Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartTooltip, Legend);

// Predefined column options for autocomplete
const columnOptions = [
  'quantity', 'unit_price', 'total_price', 'year', 'surface', 'yield', 'production', 'crop', 'date', 'location', 'quality', 'buyer',
];

// Utility function to get color for datasets
const getColor = (index) => {
  const colors = [
    '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#6366F1',
  ];
  return colors[index % colors.length];
};

const FileDataManager = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [fileInfo, setFileInfo] = useState(null);
  const [tradeData, setTradeData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newColumnDialog, setNewColumnDialog] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [deleteColumnDialog, setDeleteColumnDialog] = useState({ open: false, column: '' });
  // Filter states
  const [filters, setFilters] = useState([]); // Array of { column, value }

  // Fetch user profile
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getProfile', { withCredentials: true });
        setUserId(response.data._id);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfileData();
  }, []);

  // Fetch trade data
  useEffect(() => {
    if (userId) fetchTradeData();
  }, [userId]);

  const fetchTradeData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/trade/${userId}/${fileId}`);
      if (!res.data || !res.data.data || !Array.isArray(res.data.data)) {
        throw new Error('Invalid API response');
      }
      setTradeData(res.data.data);
      setColumns(res.data.columns);
      const filesRes = await axios.get(`http://localhost:5000/api/trade/files/${userId}`);
      const file = filesRes.data.files.find(f => f._id === fileId) || {};
      setFileInfo({
        columns: res.data.columns,
        dataType: res.data.columns.some(col => ['year', 'surface', 'yield', 'production'].includes(col)) ? 'agricultural' : 'trade',
        filename: file.filename || 'Unknown',
      });
    } catch (error) {
      setError('Erreur lors de la récupération des données');
    } finally {
      setLoading(false);
    }
  };

  // Handle column reordering
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedColumns = Array.from(columns);
    const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, movedColumn);

    setColumns(reorderedColumns);

    try {
      await axios.put(`http://localhost:5000/api/trade/${userId}/${fileId}/columns`, { columns: reorderedColumns }, { withCredentials: true });
    } catch (error) {
      setSnackbar({ open: true, message: 'Erreur lors de la réorganisation des colonnes', severity: 'error' });
    }
  };

  // Add new column
  const handleAddColumn = async () => {
    if (!newColumnName) {
      setSnackbar({ open: true, message: 'Veuillez entrer un nom de colonne', severity: 'error' });
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/trade/${userId}/${fileId}/column`, { columnName: newColumnName }, { withCredentials: true });
      setColumns(res.data.columns);
      setTradeData(res.data.data);
      setNewColumnDialog(false);
      setNewColumnName('');
      setSnackbar({ open: true, message: 'Colonne ajoutée avec succès', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Erreur lors de l\'ajout de la colonne', severity: 'error' });
    }
  };

  // Delete column
  const handleDeleteColumn = async () => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/trade/${userId}/${fileId}/column`, {
        data: { columnName: deleteColumnDialog.column },
        withCredentials: true,
      });
      setColumns(res.data.columns);
      setTradeData(res.data.data);
      setFilters(filters.filter(f => f.column !== deleteColumnDialog.column));
      setDeleteColumnDialog({ open: false, column: '' });
      setSnackbar({ open: true, message: 'Colonne supprimée avec succès', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Erreur lors de la suppression de la colonne', severity: 'error' });
    }
  };

  // Add new row
  const handleAddRow = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/trade/${userId}/${fileId}/row`, {}, { withCredentials: true });
      setTradeData(res.data.data);
      setSnackbar({ open: true, message: 'Ligne ajoutée avec succès', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Erreur lors de l\'ajout de la ligne', severity: 'error' });
    }
  };

  // Delete row
  const handleDeleteRow = async (index) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/trade/${userId}/${fileId}/row`, {
        data: { rowIndex: index },
        withCredentials: true,
      });
      setTradeData(res.data.data);
      setSnackbar({ open: true, message: 'Ligne supprimée avec succès', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Erreur lors de la suppression de la ligne', severity: 'error' });
    }
  };

  // Handle edit changes
  const handleEditChange = (index, key, value) => {
    const newData = [...tradeData];
    newData[index][key] = ['year', 'surface', 'yield', 'production', 'unit_price', 'total_price', 'quantity'].includes(key) ? Number(value) || 0 : value;
    setTradeData(newData);
  };

  // Save edits
  const saveEdit = async (index) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/trade/${userId}/${fileId}`,
        { rowIndex: index, updatedData: tradeData[index] },
        { withCredentials: true }
      );
      setTradeData(res.data.data);
      setEditIndex(null);
      setSnackbar({ open: true, message: 'Données mises à jour avec succès', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Erreur lors de la sauvegarde', severity: 'error' });
    }
  };

  // Delete file
  const handleDeleteFile = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/trade/${userId}/${fileId}`, { withCredentials: true });
      setSnackbar({ open: true, message: 'Fichier supprimé avec succès', severity: 'success' });
      navigate('/trade-data');
    } catch (error) {
      setSnackbar({ open: true, message: 'Erreur lors de la suppression', severity: 'error' });
    }
  };

  // Handle adding a new filter
  const addFilter = () => {
    setFilters([...filters, { column: columns[0] || '', value: 'all' }]);
  };

  // Handle filter change
  const handleFilterChange = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
  };

  // Remove filter
  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  // Apply filters to data
  const filteredData = tradeData.filter(entry =>
    filters.every(({ column, value }) =>
      value === 'all' || String(entry[column]) === String(value)
    )
  );

  // Prepare automatic chart data
  const prepareAutomaticChartData = () => {
    if (fileInfo?.dataType === 'agricultural') {
      const productionSurfaceData = {
        labels: filteredData.map(entry => entry.year || 'N/A'),
        datasets: [
          {
            label: 'Superficie Récoltée (ha)',
            data: filteredData.map(entry => entry.surface || 0),
            borderColor: '#10B981',
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
              gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            yAxisID: 'y',
          },
          {
            label: 'Production (t)',
            data: filteredData.map(entry => entry.production || 0),
            borderColor: '#3B82F6',
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            yAxisID: 'y1',
          },
        ],
      };

      const yieldData = {
        labels: filteredData.map(entry => entry.year || 'N/A'),
        datasets: [
          {
            label: 'Rendement (kg/ha)',
            data: filteredData.map(entry => entry.yield || 0),
            backgroundColor: 'rgba(245, 158, 11, 0.6)',
            borderColor: '#F59E0B',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(245, 158, 11, 0.8)',
          },
        ],
      };

      const avgYield = filteredData.length
        ? (filteredData.reduce((sum, entry) => sum + (entry.yield || 0), 0) / filteredData.length).toFixed(1)
        : '0';
      const totalProduction = filteredData.reduce((sum, entry) => sum + (entry.production || 0), 0);
      const avgSurface = filteredData.length
        ? (filteredData.reduce((sum, entry) => sum + (entry.surface || 0), 0) / filteredData.length).toFixed(0)
        : '0';
      const minYieldYear = filteredData.length
        ? filteredData.reduce((min, entry) => ((entry.yield || 0) < (min.yield || 0) ? entry : min), filteredData[0]).year || 'N/A'
        : 'N/A';

      return {
        productionSurfaceData,
        yieldData,
        stats: { avgYield, totalProduction, avgSurface, minYieldYear },
      };
    } else {
      const priceTrendData = {
        labels: filteredData.map(entry => entry.date || 'N/A'),
        datasets: [
          {
            label: 'Prix Unitaire ($)',
            data: filteredData.map(entry => entry.unit_price || 0),
            borderColor: '#10B981',
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
              gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
          {
            label: 'Prix Total ($)',
            data: filteredData.map(entry => entry.total_price || 0),
            borderColor: '#F59E0B',
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, 'rgba(245, 158, 11, 0.3)');
              gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#F59E0B',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      };

      const quantityByLocation = filteredData.reduce((acc, entry) => {
        acc[entry.location] = (acc[entry.location] || 0) + (entry.quantity || 0);
        return acc;
      }, {});
      const quantityByLocationData = {
        labels: Object.keys(quantityByLocation),
        datasets: [
          {
            label: 'Quantité (tons)',
            data: Object.values(quantityByLocation),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: '#3B82F6',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
          },
        ],
      };

      const priceByQuality = filteredData.reduce((acc, entry) => {
        if (!acc[entry.quality]) acc[entry.quality] = { sumUnit: 0, sumTotal: 0, count: 0 };
        acc[entry.quality].sumUnit += (entry.unit_price || 0);
        acc[entry.quality].sumTotal += (entry.total_price || 0);
        acc[entry.quality].count += 1;
        return acc;
      }, {});
      const priceByQualityData = {
        labels: Object.keys(priceByQuality),
        datasets: [
          {
            label: 'Prix Unitaire Moyen ($)',
            data: Object.keys(priceByQuality).map(quality => priceByQuality[quality].sumUnit / priceByQuality[quality].count),
            backgroundColor: 'rgba(245, 158, 11, 0.6)',
            borderColor: '#F59E0B',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(245, 158, 11, 0.8)',
          },
          {
            label: 'Prix Total Moyen ($)',
            data: Object.keys(priceByQuality).map(quality => priceByQuality[quality].sumTotal / priceByQuality[quality].count),
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderColor: '#10B981',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(16, 185, 129, 0.8)',
          },
        ],
      };

      const priceVsQuantityData = {
        datasets: [
          {
            label: 'Prix Unitaire vs Quantité',
            data: filteredData.map(entry => ({
              x: entry.quantity || 0,
              y: entry.unit_price || 0,
              location: entry.location || 'N/A',
            })),
            backgroundColor: filteredData.map(entry => {
              switch (entry.location) {
                case 'France': return 'rgba(16, 185, 129, 0.6)';
                case 'USA': return 'rgba(59, 130, 246, 0.6)';
                case 'India': return 'rgba(245, 158, 11, 0.6)';
                case 'Brazil': return 'rgba(236, 72, 153, 0.6)';
                case 'Canada': return 'rgba(139, 92, 246, 0.6)';
                default: return 'rgba(107, 114, 128, 0.6)';
              }
            }),
            pointRadius: 6,
            pointHoverRadius: 10,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          },
          {
            label: 'Prix Total vs Quantité',
            data: filteredData.map(entry => ({
              x: entry.quantity || 0,
              y: entry.total_price || 0,
              location: entry.location || 'N/A',
            })),
            backgroundColor: filteredData.map(entry => {
              switch (entry.location) {
                case 'France': return 'rgba(16, 185, 129, 0.4)';
                case 'USA': return 'rgba(59, 130, 246, 0.4)';
                case 'India': return 'rgba(245, 158, 11, 0.4)';
                case 'Brazil': return 'rgba(236, 72, 153, 0.4)';
                case 'Canada': return 'rgba(139, 92, 246, 0.4)';
                default: return 'rgba(107, 114, 128, 0.4)';
              }
            }),
            pointRadius: 6,
            pointHoverRadius: 10,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          },
        ],
      };

      const avgUnitPrice = filteredData.length
        ? (filteredData.reduce((sum, entry) => sum + (entry.unit_price || 0), 0) / filteredData.length).toFixed(2)
        : '0';
      const avgTotalPrice = filteredData.length
        ? (filteredData.reduce((sum, entry) => sum + (entry.total_price || 0), 0) / filteredData.length).toFixed(2)
        : '0';
      const totalQuantity = filteredData.reduce((sum, entry) => sum + (entry.quantity || 0), 0);
      const maxUnitPrice = filteredData.length ? Math.max(...filteredData.map(entry => entry.unit_price || 0)) : 0;
      const maxUnitPriceLocation = filteredData.find(entry => (entry.unit_price || 0) === maxUnitPrice)?.location || 'N/A';

      return {
        priceTrendData,
        quantityByLocationData,
        priceByQualityData,
        priceVsQuantityData,
        stats: { avgUnitPrice, avgTotalPrice, totalQuantity, maxUnitPrice, maxUnitPriceLocation },
      };
    }
    return {};
  };

  // Common chart options
  const getChartOptions = (title, xTitle, yTitle, yTitle2 = null) => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
      },
      title: {
        display: true,
        text: title,
        font: { size: 18, family: 'Roboto', weight: '600' },
        color: '#1F2937',
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const { dataset, raw } = context;
            if (dataset.label.includes('vs Quantité')) {
              return `${dataset.label}: Prix: $${raw.y}, Quantité: ${raw.x} tons, Pays: ${raw.location}`;
            }
            return `${dataset.label}: ${typeof raw === 'object' ? `(${raw.x}, ${raw.y})` : raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: { display: false },
        title: { display: true, text: xTitle, font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.1)' },
        title: { display: true, text: yTitle, font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
      ...(yTitle2 && {
        y1: {
          grid: { drawOnChartArea: false },
          title: { display: true, text: yTitle2, font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
          position: 'right',
          ticks: { color: '#1F2937' },
        },
      }),
    },
  });

  // Export to PDF
  const exportToPDF = () => {
    const input = document.getElementById('charts-container');
    if (!input) {
      setSnackbar({ open: true, message: 'Erreur : conteneur introuvable', severity: 'error' });
      return;
    }
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${fileInfo?.filename || 'report'}.pdf`);
    });
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Erreur : {error}</Typography>;
  if (!fileInfo) return <Typography sx={{ textAlign: 'center', mt: 4 }}>Aucune information disponible</Typography>;

  const automaticChartData = prepareAutomaticChartData();

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #E2E8F0 0%, #F3F4F6 100%)' }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Dialog open={newColumnDialog} onClose={() => setNewColumnDialog(false)}>
        <DialogTitle>Ajouter une nouvelle colonne</DialogTitle>
        <DialogContent>
          <Autocomplete
            freeSolo
            options={columnOptions}
            value={newColumnName}
            onChange={(e, newValue) => setNewColumnName(newValue || '')}
            renderInput={params => (
              <TextField
                {...params}
                label="Nom de la colonne"
                fullWidth
                onChange={e => setNewColumnName(e.target.value)}
                sx={{ mt: 2 }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewColumnDialog(false)}>Annuler</Button>
          <Button onClick={handleAddColumn} variant="contained" color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteColumnDialog.open}
        onClose={() => setDeleteColumnDialog({ open: false, column: '' })}
      >
        <DialogTitle>Supprimer la colonne</DialogTitle>
        <DialogContent>
          <Typography>Voulez-vous vraiment supprimer la colonne "{deleteColumnDialog.column}" ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteColumnDialog({ open: false, column: '' })}>Annuler</Button>
          <Button onClick={handleDeleteColumn} variant="contained" color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={3}>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={() => navigate('/trade-data')}>
              <ArrowBackIcon sx={{ color: '#1F2937' }} />
            </IconButton>
            <Typography variant="h4" sx={{ color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
              {fileInfo.filename}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddRow}
              sx={{ ml: 2, bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
            >
              Ajouter une ligne
            </Button>
            <Button
              variant="contained"
              startIcon={<ViewColumnIcon />}
              onClick={() => setNewColumnDialog(true)}
              sx={{ bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
            >
              Ajouter une colonne
            </Button>
            <Button
              variant="contained"
              startIcon={<BarChartIcon />}
              onClick={() => navigate(`/Dashboard/trade-data/${fileId}/charts`)}
              sx={{ bgcolor: '#F59E0B', '&:hover': { bgcolor: '#D97706' } }}
            >
              Visualiser les données
            </Button>
            <IconButton onClick={handleDeleteFile} sx={{ ml: 'auto' }}>
              <DeleteIcon sx={{ color: '#EF4444' }} />
            </IconButton>
          </Stack>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          >
            <Tab label="Données" sx={{ fontWeight: 500 }} />
            <Tab label="Visualisation" sx={{ fontWeight: 500 }} />
            <Tab label="Conseils" sx={{ fontWeight: 500 }} />
          </Tabs>
        </motion.div>

        {tabValue === 0 && (
          <Stack spacing={3}>
            {tradeData.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography sx={{ color: '#1F2937', fontWeight: 500, fontFamily: 'Roboto' }}>
                      Filtres :
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={addFilter}
                      disabled={filters.length >= columns.length}
                      sx={{ color: '#3B82F6', borderColor: '#3B82F6', '&:hover': { bgcolor: '#E8F0FE' } }}
                    >
                      Ajouter un filtre
                    </Button>
                  </Stack>
                  {filters.map((filter, index) => (
                    <Stack key={index} direction="row" spacing={2} alignItems="center">
                      <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Colonne</InputLabel>
                        <Select
                          value={filter.column}
                          onChange={e => handleFilterChange(index, 'column', e.target.value)}
                          label="Colonne"
                        >
                          {columns
                            .filter(col => !filters.some(f => f.column === col && f !== filter))
                            .map(col => (
                              <MenuItem key={col} value={col}>
                                {col}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Valeur</InputLabel>
                        <Select
                          value={filter.value}
                          onChange={e => handleFilterChange(index, 'value', e.target.value)}
                          label="Valeur"
                        >
                          <MenuItem value="all">Tous</MenuItem>
                          {[...new Set(tradeData.map(entry => entry[filter.column]).filter(v => v !== undefined && v !== ''))]
                            .sort()
                            .map(value => (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <IconButton onClick={() => removeFilter(index)} sx={{ color: '#EF4444' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              </motion.div>
            )}

            {tradeData.length === 0 ? (
              <Typography sx={{ color: '#1F2937', textAlign: 'center', fontFamily: 'Roboto' }}>
                Aucune donnée disponible.
              </Typography>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                <Paper sx={{ borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <Droppable droppableId="columns" direction="horizontal">
                          {(provided) => (
                            <TableRow
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              sx={{ bgcolor: '#F9FAFB' }}
                            >
                              {columns.map((key, index) => (
                                <Draggable key={key} draggableId={key} index={index}>
                                  {(provided) => (
                                    <TableCell
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      sx={{ fontWeight: 600, color: '#1F2937', cursor: 'grab' }}
                                    >
                                      <Tooltip title="Supprimer la colonne">
                                        <Chip
                                          label={
                                            key === 'year' ? 'Année' :
                                            key === 'surface' ? 'Superficie (ha)' :
                                            key === 'yield' ? 'Rendement (kg/ha)' :
                                            key === 'production' ? 'Production (t)' :
                                            key === 'quantity' ? 'Quantité (tons)' :
                                            key === 'unit_price' ? 'Prix Unitaire ($)' :
                                            key === 'total_price' ? 'Prix Total ($)' :
                                            key.charAt(0).toUpperCase() + key.slice(1)
                                          }
                                          onDelete={() => setDeleteColumnDialog({ open: true, column: key })}
                                          deleteIcon={<DeleteIcon />}
                                          sx={{ bgcolor: '#E2E8F0', '&:hover': { bgcolor: '#CBD5E1' } }}
                                        />
                                      </Tooltip>
                                    </TableCell>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                              <TableCell sx={{ fontWeight: 600, color: '#1F2937' }}>Actions</TableCell>
                            </TableRow>
                          )}
                        </Droppable>
                      </TableHead>
                      <TableBody>
                        {filteredData.map((entry, index) => (
                          <TableRow key={index} sx={{ '&:hover': { bgcolor: '#F1F5F9' } }}>
                            {editIndex === index ? (
                              <>
                                {columns.map(key => (
                                  <TableCell key={key}>
                                    <TextField
                                      value={entry[key] ?? ''}
                                      onChange={e => handleEditChange(index, key, e.target.value)}
                                      size="small"
                                      type={['year', 'surface', 'yield', 'production', 'unit_price', 'total_price', 'quantity'].includes(key) ? 'number' : 'text'}
                                      sx={{ bgcolor: '#fff', borderRadius: 1 }}
                                    />
                                  </TableCell>
                                ))}
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={() => saveEdit(index)}
                                    sx={{ bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
                                  >
                                    Sauvegarder
                                  </Button>
                                </TableCell>
                              </>
                            ) : (
                              <>
                                {columns.map(key => (
                                  <TableCell key={key} sx={{ color: '#1F2937' }}>
                                    {entry[key] == null
                                      ? '-'
                                      : ['surface', 'production', 'quantity'].includes(key)
                                      ? Number(entry[key]).toLocaleString()
                                      : ['yield', 'unit_price', 'total_price'].includes(key)
                                      ? Number(entry[key]).toFixed(2)
                                      : String(entry[key])}
                                  </TableCell>
                                ))}
                                <TableCell>
                                  <Stack direction="row" spacing={1}>
                                    <Button
                                      variant="contained"
                                      startIcon={<EditIcon />}
                                      onClick={() => setEditIndex(index)}
                                      sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                                    >
                                      Modifier
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      startIcon={<DeleteIcon />}
                                      onClick={() => handleDeleteRow(index)}
                                      sx={{ color: '#EF4444', borderColor: '#EF4444', '&:hover': { bgcolor: '#FEE2E2' } }}
                                    >
                                      Supprimer
                                    </Button>
                                  </Stack>
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </DragDropContext>
                </Paper>
              </motion.div>
            )}
          </Stack>
        )}

        {tabValue === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', bgcolor: '#fff' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
                  Analyse des Données {fileInfo.dataType === 'agricultural' ? 'Agricoles' : 'de Transactions'}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={exportToPDF}
                    sx={{ bgcolor: '#F59E0B', '&:hover': { bgcolor: '#D97706' } }}
                  >
                    Exporter en PDF
                  </Button>
                </Stack>
              </Stack>

              <Stack spacing={2} sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography sx={{ color: '#1F2937', fontWeight: 500, fontFamily: 'Roboto' }}>
                    Filtres :
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addFilter}
                    disabled={filters.length >= columns.length}
                    sx={{ color: '#3B82F6', borderColor: '#3B82F6', '&:hover': { bgcolor: '#E8F0FE' } }}
                  >
                    Ajouter un filtre
                  </Button>
                </Stack>
                {filters.map((filter, index) => (
                  <Stack key={index} direction="row" spacing={2} alignItems="center">
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel>Colonne</InputLabel>
                      <Select
                        value={filter.column}
                        onChange={e => handleFilterChange(index, 'column', e.target.value)}
                        label="Colonne"
                      >
                        {columns
                          .filter(col => !filters.some(f => f.column === col && f !== filter))
                          .map(col => (
                            <MenuItem key={col} value={col}>
                              {col}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 200 }}>
                      <InputLabel>Valeur</InputLabel>
                      <Select
                        value={filter.value}
                        onChange={e => handleFilterChange(index, 'value', e.target.value)}
                        label="Valeur"
                      >
                        <MenuItem value="all">Tous</MenuItem>
                        {[...new Set(tradeData.map(entry => entry[filter.column]).filter(v => v !== undefined && v !== ''))]
                          .sort()
                          .map(value => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <IconButton onClick={() => removeFilter(index)} sx={{ color: '#EF4444' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>

              <Box id="charts-container">
                <Stack spacing={4}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                        border: '1px solid #E5E7EB',
                        bgcolor: 'linear-gradient(145deg, #FFFFFF, #F9FAFB)',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
                        Statistiques Clés
                      </Typography>
                      {fileInfo.dataType === 'agricultural' ? (
                        <Stack spacing={1}>
                          <Typography sx={{ color: '#1F2937' }}>
                            Rendement moyen : <strong>{automaticChartData.stats.avgYield} kg/ha</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Production totale : <strong>{automaticChartData.stats.totalProduction.toLocaleString()} t</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Superficie moyenne : <strong>{automaticChartData.stats.avgSurface} ha</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Année avec rendement minimal : <strong>{automaticChartData.stats.minYieldYear}</strong>
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack spacing={1}>
                          <Typography sx={{ color: '#1F2937' }}>
                            Prix unitaire moyen : <strong>${automaticChartData.stats.avgUnitPrice}</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Prix total moyen : <strong>${automaticChartData.stats.avgTotalPrice}</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Quantité totale : <strong>{automaticChartData.stats.totalQuantity.toLocaleString()} tons</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Prix unitaire maximum : <strong>${automaticChartData.stats.maxUnitPrice} ({automaticChartData.stats.maxUnitPriceLocation})</strong>
                          </Typography>
                        </Stack>
                      )}
                    </Paper>
                  </motion.div>

                  {fileInfo.dataType === 'agricultural' ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                            border: '1px solid #10B981',
                            bgcolor: '#fff',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)' },
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
                            Production et Superficie par Année
                          </Typography>
                          {automaticChartData.productionSurfaceData?.labels.length > 0 ? (
                            <Box sx={{ height: 350 }}>
                              <Line
                                data={automaticChartData.productionSurfaceData}
                                options={getChartOptions(
                                  'Évolution de la Production et Superficie',
                                  'Année',
                                  'Superficie (ha)',
                                  'Production (t)'
                                )}
                              />
                            </Box>
                          ) : (
                            <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                              Aucune donnée pour afficher ce graphique.
                            </Typography>
                          )}
                        </Paper>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                            border: '1px solid #F59E0B',
                            bgcolor: '#fff',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)' },
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
                            Rendement par Année
                          </Typography>
                          {automaticChartData.yieldData?.labels.length > 0 ? (
                            <Box sx={{ height: 350 }}>
                              <Bar
                                data={automaticChartData.yieldData}
                                options={getChartOptions('Rendement Agricole par Année', 'Année', 'Rendement (kg/ha)')}
                              />
                            </Box>
                          ) : (
                            <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                              Aucune donnée pour afficher ce graphique.
                            </Typography>
                          )}
                        </Paper>
                      </motion.div>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                            border: '1px solid #10B981',
                            bgcolor: '#fff',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)' },
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
                            Évolution des Prix
                          </Typography>
                          {automaticChartData.priceTrendData?.labels.length > 0 ? (
                            <Box sx={{ height: 350 }}>
                              <Line
                                data={automaticChartData.priceTrendData}
                                options={getChartOptions('Prix par Date', 'Date', 'Prix ($)')}
                              />
                            </Box>
                          ) : (
                            <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                              Aucune donnée pour afficher ce graphique.
                            </Typography>
                          )}
                        </Paper>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                            border: '1px solid #3B82F6',
                            bgcolor: '#fff',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)' },
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
                            Quantité par Pays
                          </Typography>
                          {automaticChartData.quantityByLocationData?.labels.length > 0 ? (
                            <Box sx={{ height: 350 }}>
                              <Bar
                                data={automaticChartData.quantityByLocationData}
                                options={getChartOptions('Quantité Vendue par Pays', 'Pays', 'Quantité (tons)')}
                              />
                            </Box>
                          ) : (
                            <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                              Aucune donnée pour afficher ce graphique.
                            </Typography>
                          )}
                        </Paper>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                            border: '1px solid #F59E0B',
                            bgcolor: '#fff',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)' },
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
                            Prix Moyen par Qualité
                          </Typography>
                          {automaticChartData.priceByQualityData?.labels.length > 0 ? (
                            <Box sx={{ height: 350 }}>
                              <Bar
                                data={automaticChartData.priceByQualityData}
                                options={getChartOptions('Prix Moyen par Qualité', 'Qualité', 'Prix moyen ($)')}
                              />
                            </Box>
                          ) : (
                            <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                              Aucune donnée pour afficher ce graphique.
                            </Typography>
                          )}
                        </Paper>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <Paper
                          sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                            border: '1px solid #3B82F6',
                            bgcolor: '#fff',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'translateY(-4px)' },
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
                            Prix vs Quantité
                          </Typography>
                          {automaticChartData.priceVsQuantityData?.datasets[0].data.length > 0 ? (
                            <Box sx={{ height: 350 }}>
                              <Scatter
                                data={automaticChartData.priceVsQuantityData}
                                options={getChartOptions('Prix vs Quantité par Pays', 'Quantité (tons)', 'Prix ($)')}
                              />
                            </Box>
                          ) : (
                            <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                              Aucune donnée pour afficher ce graphique.
                            </Typography>
                          )}
                        </Paper>
                      </motion.div>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Paper>
          </motion.div>
        )}

        {tabValue === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', bgcolor: '#fff' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
                Conseils pour Optimisation
              </Typography>
              <Typography sx={{ color: '#1F2937', fontFamily: 'Roboto' }}>
                {tradeData.length === 0 ? (
                  'Aucune donnée pour fournir des conseils.'
                ) : fileInfo.dataType === 'agricultural' ? (
                  `Analyse des données agricoles : Le rendement moyen est de ${automaticChartData.stats?.avgYield || 'N/A'} kg/ha, mais ${automaticChartData.stats?.minYieldYear || 'N/A'} montre un rendement faible. Envisagez une analyse des sols ou des techniques d'irrigation pour améliorer les rendements.`
                ) : (
                  `Analyse des transactions : Le prix unitaire moyen est de $${automaticChartData.stats?.avgUnitPrice || 'N/A'}, avec un pic à $${automaticChartData.stats?.maxUnitPrice || 'N/A'} en ${automaticChartData.stats?.maxUnitPriceLocation || 'N/A'}. Envisagez de cibler des marchés comme ${automaticChartData.stats?.maxUnitPriceLocation || 'N/A'} pour maximiser vos revenus.`
                )}
              </Typography>
            </Paper>
          </motion.div>
        )}
      </Stack>
    </Box>
  );
};

export default FileDataManager;