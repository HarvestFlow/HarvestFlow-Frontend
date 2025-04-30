import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Typography, Stack, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, CircularProgress,
  Paper, IconButton, Autocomplete, TextField, Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon, Download as DownloadIcon, Add as AddIcon, Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip as ChartTooltip, Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartTooltip, Legend);

// Utility function to get color for datasets
const getColor = (index) => {
  const colors = [
    '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#6366F1',
  ];
  return colors[index % colors.length];
};

const DynamicChartPage = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [fileInfo, setFileInfo] = useState(null);
  const [tradeData, setTradeData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('line');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [groupBy, setGroupBy] = useState('');
  const [filters, setFilters] = useState([]); // Array of { column, value }
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
      // Set default axes
      if (res.data.columns.includes('year')) setXAxis('year');
      else if (res.data.columns.includes('date')) setXAxis('date');
      else if (res.data.columns.length > 0) setXAxis(res.data.columns[0]);
      if (res.data.columns.includes('unit_price')) setYAxis('unit_price');
      else if (res.data.columns.includes('total_price')) setYAxis('total_price');
      else if (res.data.columns.length > 0) setYAxis(res.data.columns[1] || res.data.columns[0]);
      if (res.data.columns.includes('location')) setGroupBy('location');
      else if (res.data.columns.includes('crop')) setGroupBy('crop');
    } catch (error) {
      setError('Erreur lors de la récupération des données');
    } finally {
      setLoading(false);
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

  // Prepare chart data
  const prepareChartData = () => {
    if (!xAxis || !yAxis) return null;

    const numericColumns = ['year', 'surface', 'yield', 'production', 'unit_price', 'total_price', 'quantity'];
    const isNumericX = numericColumns.includes(xAxis);
    const isNumericY = numericColumns.includes(yAxis);

    let chartData = {};

    if (groupBy && groupBy !== xAxis && groupBy !== yAxis) {
      // Grouped data (e.g., unit_price by location)
      const groupedData = filteredData.reduce((acc, entry) => {
        const groupValue = entry[groupBy] || 'N/A';
        if (!acc[groupValue]) acc[groupValue] = [];
        acc[groupValue].push(entry);
        return acc;
      }, {});

      chartData = {
        labels: isNumericX
          ? [...new Set(filteredData.map(entry => entry[xAxis]).filter(v => v !== undefined))].sort((a, b) => a - b)
          : [...new Set(filteredData.map(entry => entry[xAxis]).filter(v => v !== undefined))].sort(),
        datasets: Object.entries(groupedData).map(([groupValue, entries], index) => {
          const color = getColor(index);
          const dataPoints = entries.map(entry => ({
            x: isNumericX ? Number(entry[xAxis]) || 0 : entry[xAxis] || 'N/A',
            y: isNumericY ? Number(entry[yAxis]) || 0 : entry[yAxis] || 'N/A',
          }));
          return {
            label: groupValue,
            data: chartType === 'scatter' ? dataPoints : dataPoints.map(dp => dp.y),
            borderColor: color,
            backgroundColor: chartType === 'scatter' ? `${color}66` : color,
            fill: chartType === 'line',
            tension: chartType === 'line' ? 0.4 : 0,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
          };
        }),
      };
    } else {
      // Simple X vs Y data
      chartData = {
        labels: isNumericX
          ? [...new Set(filteredData.map(entry => entry[xAxis]).filter(v => v !== undefined))].sort((a, b) => a - b)
          : [...new Set(filteredData.map(entry => entry[xAxis]).filter(v => v !== undefined))].sort(),
        datasets: [
          {
            label: `${yAxis} vs ${xAxis}`,
            data: chartType === 'scatter'
              ? filteredData.map(entry => ({
                  x: isNumericX ? Number(entry[xAxis]) || 0 : entry[xAxis] || 'N/A',
                  y: isNumericY ? Number(entry[yAxis]) || 0 : entry[yAxis] || 'N/A',
                }))
              : filteredData.map(entry => isNumericY ? Number(entry[yAxis]) || 0 : entry[yAxis] || 'N/A'),
            borderColor: '#10B981',
            backgroundColor: chartType === 'scatter' ? 'rgba(16, 185, 129, 0.4)' : '#10B981',
            fill: chartType === 'line',
            tension: chartType === 'line' ? 0.4 : 0,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      };
    }

    // Calculate dynamic stats
    const stats = {};
    if (numericColumns.includes(yAxis)) {
      const values = filteredData.map(entry => Number(entry[yAxis]) || 0).filter(v => !isNaN(v));
      stats.avgValue = values.length ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2) : '0';
      stats.maxValue = values.length ? Math.max(...values).toFixed(2) : '0';
      stats.minValue = values.length ? Math.min(...values).toFixed(2) : '0';
      stats.totalValue = values.length ? values.reduce((sum, v) => sum + v, 0).toFixed(2) : '0';
    }

    return { chartData, stats };
  };

  // Chart options
  const getChartOptions = () => ({
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
        text: `${yAxis.charAt(0).toUpperCase() + yAxis.slice(1)} vs ${xAxis.charAt(0).toUpperCase() + xAxis.slice(1)}${groupBy ? ` (par ${groupBy})` : ''}`,
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
            if (chartType === 'scatter') {
              return `${dataset.label}: (x: ${raw.x}, y: ${raw.y})`;
            }
            return `${dataset.label}: ${raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: ['year', 'unit_price', 'total_price', 'quantity', 'surface', 'yield', 'production'].includes(xAxis) ? 'linear' : 'category',
        grid: { display: false },
        title: {
          display: true,
          text: xAxis === 'year' ? 'Année' :
                xAxis === 'unit_price' ? 'Prix Unitaire ($)' :
                xAxis === 'total_price' ? 'Prix Total ($)' :
                xAxis === 'quantity' ? 'Quantité (tons)' :
                xAxis === 'surface' ? 'Superficie (ha)' :
                xAxis === 'yield' ? 'Rendement (kg/ha)' :
                xAxis === 'production' ? 'Production (t)' :
                xAxis.charAt(0).toUpperCase() + xAxis.slice(1),
          font: { size: 14, family: 'Roboto' },
          color: '#1F2937',
        },
        ticks: { color: '#1F2937' },
      },
      y: {
        type: ['year', 'unit_price', 'total_price', 'quantity', 'surface', 'yield', 'production'].includes(yAxis) ? 'linear' : 'category',
        grid: { color: 'rgba(0,0,0,0.1)' },
        title: {
          display: true,
          text: yAxis === 'year' ? 'Année' :
                yAxis === 'unit_price' ? 'Prix Unitaire ($)' :
                yAxis === 'total_price' ? 'Prix Total ($)' :
                yAxis === 'quantity' ? 'Quantité (tons)' :
                yAxis === 'surface' ? 'Superficie (ha)' :
                yAxis === 'yield' ? 'Rendement (kg/ha)' :
                yAxis === 'production' ? 'Production (t)' :
                yAxis.charAt(0).toUpperCase() + yAxis.slice(1),
          font: { size: 14, family: 'Roboto' },
          color: '#1F2937',
        },
        ticks: { color: '#1F2937' },
      },
    },
  });

  // Export to PDF
  const exportToPDF = () => {
    const input = document.getElementById('chart-container');
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

      pdf.save(`${fileInfo?.filename || 'chart'}_custom_chart.pdf`);
    });
  };

  const chartData = prepareChartData();

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Erreur : {error}</Typography>;
  if (!fileInfo) return <Typography sx={{ textAlign: 'center', mt: 4 }}>Aucune information disponible</Typography>;

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #E2E8F0 0%, #F3F4F6 100%)' }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Stack spacing={3}>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={() => navigate(`/trade-data/${fileId}`)}>
              <ArrowBackIcon sx={{ color: '#1F2937' }} />
            </IconButton>
            <Typography variant="h4" sx={{ color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
              Visualisation Dynamique - {fileInfo.filename}
            </Typography>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={exportToPDF}
              sx={{ ml: 'auto', bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
            >
              Exporter en PDF
            </Button>
          </Stack>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', bgcolor: '#fff' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
              Configurer le Graphique
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Type de Graphique</InputLabel>
                <Select value={chartType} onChange={e => setChartType(e.target.value)} label="Type de Graphique">
                  <MenuItem value="line">Courbe</MenuItem>
                  <MenuItem value="bar">Histogramme</MenuItem>
                  <MenuItem value="scatter">Nuage de Points</MenuItem>
                </Select>
              </FormControl>
              <Autocomplete
                options={columns}
                value={xAxis}
                onChange={(e, newValue) => setXAxis(newValue || '')}
                renderInput={params => (
                  <TextField {...params} label="Axe X" fullWidth />
                )}
                sx={{ minWidth: 200 }}
              />
              <Autocomplete
                options={columns}
                value={yAxis}
                onChange={(e, newValue) => setYAxis(newValue || '')}
                renderInput={params => (
                  <TextField {...params} label="Axe Y" fullWidth />
                )}
                sx={{ minWidth: 200 }}
              />
              <Autocomplete
                options={['', ...columns.filter(col => col !== xAxis && col !== yAxis)]}
                value={groupBy}
                onChange={(e, newValue) => setGroupBy(newValue || '')}
                renderInput={params => (
                  <TextField {...params} label="Grouper par" fullWidth />
                )}
                sx={{ minWidth: 200 }}
              />
            </Stack>

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
                  <Tooltip title="Supprimer le filtre">
                    <IconButton onClick={() => removeFilter(index)} sx={{ color: '#EF4444' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', bgcolor: '#fff' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
              Graphique Personnalisé
            </Typography>
            <Box id="chart-container">
              {chartData && chartData.chartData && chartData.chartData.labels.length > 0 ? (
                <Stack spacing={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
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
                      <Box sx={{ height: 450 }}>
                        {chartType === 'line' && (
                          <Line data={chartData.chartData} options={getChartOptions()} />
                        )}
                        {chartType === 'bar' && (
                          <Bar data={chartData.chartData} options={getChartOptions()} />
                        )}
                        {chartType === 'scatter' && (
                          <Scatter data={chartData.chartData} options={getChartOptions()} />
                        )}
                      </Box>
                    </Paper>
                  </motion.div>
                  {chartData.stats && Object.keys(chartData.stats).length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
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
                          Statistiques ({yAxis})
                        </Typography>
                        <Stack spacing={1}>
                          <Typography sx={{ color: '#1F2937' }}>
                            Valeur moyenne : <strong>{chartData.stats.avgValue}</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Valeur maximale : <strong>{chartData.stats.maxValue}</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Valeur minimale : <strong>{chartData.stats.minValue}</strong>
                          </Typography>
                          <Typography sx={{ color: '#1F2937' }}>
                            Total : <strong>{chartData.stats.totalValue}</strong>
                          </Typography>
                        </Stack>
                      </Paper>
                    </motion.div>
                  )}
                </Stack>
              ) : (
                <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                  Aucune donnée disponible pour afficher le graphique. Veuillez sélectionner des axes ou ajuster les filtres.
                </Typography>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Stack>
    </Box>
  );
};

export default DynamicChartPage;