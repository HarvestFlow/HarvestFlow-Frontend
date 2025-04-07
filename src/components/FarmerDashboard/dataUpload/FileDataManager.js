import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, ArrowBack as ArrowBackIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';

// Enregistrer les composants Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FileDataManager = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [fileInfo, setFileInfo] = useState(null);
  const [tradeData, setTradeData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterYear, setFilterYear] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Récupérer le userId
  useEffect(() => {
    let mounted = true;

    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getProfile', {
          withCredentials: true,
          timeout: 5000,
        });

        if (mounted && response.status === 200) {
          setUserId(response.data._id);
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfileData();
    return () => {
      mounted = false;
    };
  }, []);

  // Charger les données du fichier
  useEffect(() => {
    if (userId) fetchTradeData();
  }, [userId]);

  const fetchTradeData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/trade/${userId}/${fileId}`);
      const normalizedData = res.data.data.map((entry) => ({
        ...entry,
        Year: Number(entry.Year) || Number(entry.Année),
      }));
      setTradeData(normalizedData);
      setFileInfo({ columns: res.data.columns });

      // Récupérer les informations du fichier pour le titre
      const filesRes = await axios.get(`http://localhost:5000/api/trade/files/${userId}`);
      const file = filesRes.data.files.find((f) => f._id === fileId);
      setFileInfo((prev) => ({ ...prev, ...file }));
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setTradeData([]);
      setError('Erreur lors de la récupération des données');
    }
  };

  const handleEditChange = (index, key, value) => {
    const newData = [...tradeData];
    newData[index][key] = value;
    setTradeData(newData);
  };

  const saveEdit = async (index) => {
    if (!userId) {
      setSnackbar({
        open: true,
        message: 'Utilisateur non authentifié.',
        severity: 'error',
      });
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/trade/${userId}/${fileId}`, {
        rowIndex: index,
        updatedData: tradeData[index],
      }, { withCredentials: true });
      setTradeData(res.data.data);
      setEditIndex(null);
      setSnackbar({
        open: true,
        message: 'Données mises à jour avec succès !',
        severity: 'success',
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSnackbar({
        open: true,
        message: 'Erreur lors de la sauvegarde.',
        severity: 'error',
      });
    }
  };

  const handleDeleteFile = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/trade/${userId}/${fileId}`, { withCredentials: true });
      setSnackbar({
        open: true,
        message: 'Fichier supprimé avec succès !',
        severity: 'success',
      });
      navigate('/trade-data'); // Retour à la liste des fichiers
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setSnackbar({
        open: true,
        message: 'Erreur lors de la suppression.',
        severity: 'error',
      });
    }
  };

  // Filtrer les données par année
  const filteredData = tradeData.filter((entry) => {
    if (filterYear === 'all') return true;
    return (entry.Year || entry.Année) === Number(filterYear);
  });

  // Préparer les données pour le graphique
  const chartData = {
    labels: filteredData
      .filter((entry) => entry.Year || entry.Année)
      .map((entry) => entry.Year || entry.Année),
    datasets: [
      {
        label: 'Surface (ha)',
        data: filteredData
          .filter((entry) => entry['Surface (ha)'])
          .map((entry) => entry['Surface (ha)']),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Production Totale (q)',
        data: filteredData
          .filter((entry) => entry['Production Totale (q)'])
          .map((entry) => entry['Production Totale (q)']),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  // Conseils agronomiques basés sur les données
  const getAgronomicAdvice = () => {
    const latestData = tradeData
      .filter((entry) => entry.Year || entry.Année)
      .sort((a, b) => (b.Year || b.Année) - (a.Year || a.Année))[0];

    if (!latestData) return 'Aucune donnée pour fournir des conseils.';

    const surface = latestData['Surface (ha)'];
    const production = latestData['Production Totale (q)'];
    const year = latestData.Year || latestData.Année;

    if (surface && surface < 20) {
      return `En ${year}, la surface cultivée est faible (${surface} ha). Envisagez une analyse des sols ou une diversification des cultures.`;
    }
    if (production && production < 500) {
      return `En ${year}, la production est basse (${production} q). Vérifiez les conditions météorologiques ou les pratiques d'irrigation.`;
    }
    return `Les données de ${year} semblent bonnes ! Continuez à optimiser vos pratiques agricoles.`;
  };

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">Erreur : {error}</Typography>;

  return (
    <Box
      sx={{
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e0f7fa 100%)',
      }}
    >
      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Stack spacing={3}>
        {/* En-tête avec bouton de retour */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton onClick={() => navigate('/trade-data')}>
              <ArrowBackIcon sx={{ color: '#2e7d32' }} />
            </IconButton>
            <Typography variant="h4" sx={{ color: '#2e7d32' }}>
              {fileInfo?.filename || 'Base de Données'}
            </Typography>
            <IconButton onClick={handleDeleteFile} sx={{ ml: 'auto' }}>
              <DeleteIcon sx={{ color: '#d32f2f' }} />
            </IconButton>
          </Stack>
        </motion.div>

        {/* Tabs pour navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Tab label="Données Brutes" />
            <Tab label="Analyse Visuelle" />
            <Tab label="Conseils Agronomiques" />
          </Tabs>
        </motion.div>

        {/* Tab 1 : Données Brutes */}
        {tabValue === 0 && (
          <Stack spacing={3}>
            {/* Filtre par année */}
            {tradeData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography>Filtrer par année :</Typography>
                  <FormControl sx={{ width: 200 }}>
                    <InputLabel>Année</InputLabel>
                    <Select
                      value={filterYear}
                      onChange={(e) => setFilterYear(e.target.value)}
                      label="Année"
                      sx={{ bgcolor: '#f1f8e9' }}
                    >
                      <MenuItem value="all">Toutes les années</MenuItem>
                      {[...new Set(tradeData.map((entry) => entry.Year || entry.Année))].map(
                        (year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Stack>
              </motion.div>
            )}

            {/* Affichage des données */}
            {tradeData.length === 0 ? (
              <Typography>Aucune donnée disponible dans ce fichier.</Typography>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Paper sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        {fileInfo?.columns.map((key) => (
                          <TableCell key={key}>{key}</TableCell>
                        ))}
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.map((entry, index) => (
                        <TableRow key={index}>
                          {editIndex === index ? (
                            <>
                              {fileInfo?.columns.map((key) => (
                                <TableCell key={key}>
                                  <TextField
                                    value={entry[key] || ''}
                                    onChange={(e) =>
                                      handleEditChange(index, key, e.target.value)
                                    }
                                    size="small"
                                  />
                                </TableCell>
                              ))}
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  startIcon={<SaveIcon />}
                                  size="small"
                                  onClick={() => saveEdit(index)}
                                >
                                  Sauvegarder
                                </Button>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              {fileInfo?.columns.map((key) => (
                                <TableCell key={key}>
                                  {entry[key] !== undefined ? String(entry[key]) : '-'}
                                </TableCell>
                              ))}
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="info"
                                  startIcon={<EditIcon />}
                                  size="small"
                                  onClick={() => setEditIndex(index)}
                                >
                                  Modifier
                                </Button>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </motion.div>
            )}
          </Stack>
        )}

        {/* Tab 2 : Analyse Visuelle */}
        {tabValue === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                Évolution des Données Agricoles
              </Typography>
              {chartData.labels.length > 0 ? (
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: 'Analyse des Données Agricoles' },
                    },
                  }}
                />
              ) : (
                <Typography>Aucune donnée pour afficher le graphique.</Typography>
              )}
            </Paper>
          </motion.div>
        )}

        {/* Tab 3 : Conseils Agronomiques */}
        {tabValue === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                Conseils pour Optimiser Votre Production
              </Typography>
              <Typography>{getAgronomicAdvice()}</Typography>
            </Paper>
          </motion.div>
        )}
      </Stack>
    </Box>
  );
};

export default FileDataManager;