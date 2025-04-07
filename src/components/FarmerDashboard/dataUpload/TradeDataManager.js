import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  CardActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from '@mui/material';
import {
  Agriculture as AgricultureIcon,
  Visibility as VisibilityIcon,
  Sort as SortIcon,
  Nature as ProductionIcon,
  Inventory as StocksIcon,
  Description as OffresIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Importer le style CSS directement dans le composant
const styles = `
  .container-btn-file {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: #307750;
    color: #fff;
    border-style: none;
    padding: 0.8em 1.5em;
    border-radius: 0.5em;
    overflow: hidden;
    z-index: 1;
    box-shadow: 4px 8px 10px -3px rgba(0, 0, 0, 0.356);
    transition: all 250ms;
  }
  .container-btn-file input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .container-btn-file > svg {
    margin-right: 0.8em;
  }
  .container-btn-file::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 0;
    border-radius: 0.5em;
    background-color: #469b61;
    z-index: -1;
    transition: all 350ms;
  }
  .container-btn-file:hover::before {
    width: 100%;
  }
  .toggle-button-group {
    background-color: #f1f8e9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .toggle-button {
    color: #2e7d32;
    border: none;
    padding: 6px 12px;
    text-transform: none;
    font-weight: 500;
    transition: all 0.3s;
  }
  .toggle-button:hover {
    background-color: #e8f5e9;
  }
  .toggle-button-selected {
    background-color: #2e7d32 !important;
    color: #fff !important;
  }
  .card-container {
    transition: transform 0.3s, box-shadow 0.3s;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #e0e0e0;
  }
  .card-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  .card-header {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: linear-gradient(90deg, #e0f7fa 0%, #b9fbc0 100%);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .card-content {
    padding: 16px;
  }
  .card-actions {
    padding: 8px 16px;
    justify-content: flex-end;
  }
  .filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
`;

// Ajouter le style au document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const TradeDataManager = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('Aucun fichier choisi');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' pour plus récent, 'asc' pour plus ancien
  const [page, setPage] = useState(1);
  const filesPerPage = 6; // Nombre de fichiers par page (ajusté pour la grille)

  // Récupérer le userId
  useEffect(() => {
    let mounted = true;

    const fetchProfileData = () => {
      axios
        .get('http://localhost:5000/user/getProfile', {
          withCredentials: true,
          timeout: 5000,
        })
        .then((response) => {
          if (mounted && response.status === 200) {
            setUserId(response.data._id);
          }
        })
        .catch((err) => {
          if (mounted) setError(err.message);
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    };

    fetchProfileData();
    return () => {
      mounted = false;
    };
  }, []);

  // Charger la liste des fichiers
  useEffect(() => {
    if (userId) fetchTradeFiles();
  }, [userId]);

  const fetchTradeFiles = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/trade/files/${userId}`);
      const sortedFiles = (res.data.files || []).sort(
        (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
      );
      setFiles(sortedFiles);
      setFilteredFiles(sortedFiles);
    } catch (error) {
      console.error('Erreur lors de la récupération des fichiers:', error);
      setFiles([]);
      setFilteredFiles([]);
    }
  };

  // Filtrer et trier les fichiers
  useEffect(() => {
    let updatedFiles = [...files];

    // Filtrer par type
    if (filterType !== 'all') {
      updatedFiles = updatedFiles.filter((file) => file.dataType === filterType);
    }

    // Trier par date
    updatedFiles.sort((a, b) => {
      const dateA = new Date(a.uploadedAt);
      const dateB = new Date(b.uploadedAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredFiles(updatedFiles);
    setPage(1); // Réinitialiser la page lors d'un changement de filtre ou de tri
  }, [filterType, sortOrder, files]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus(e.target.files[0] ? e.target.files[0].name : 'Aucun fichier choisi');
  };

  const handleDataTypeChange = (event, newDataType) => {
    if (newDataType !== null) {
      setDataType(newDataType);
      setFile(null);
      setUploadStatus('Aucun fichier choisi');
    }
  };

  const handleUpload = async () => {
    if (!file || !userId || !dataType) {
      setUploadStatus(
        !file
          ? 'Veuillez sélectionner un fichier.'
          : !userId
          ? 'Utilisateur non authentifié.'
          : 'Veuillez sélectionner un type de données.'
      );
      setSnackbar({
        open: true,
        message: 'Erreur : Veuillez remplir tous les champs requis.',
        severity: 'error',
      });
      return;
    }

    const formData = new FormData();
    formData.append('tradeData', file);
    formData.append('userId', userId);
    formData.append('dataType', dataType);

    try {
      const res = await axios.post('http://localhost:5000/api/trade/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setUploadStatus('Upload réussi !');
      setSnackbar({
        open: true,
        message: `Données de type "${dataType}" uploadées avec succès !`,
        severity: 'success',
      });
      setFile(null);
      setDataType('');
      fetchTradeFiles();
    } catch (error) {
      setUploadStatus('Échec de l’upload.');
      console.error(error);
      setSnackbar({
        open: true,
        message: 'Échec de l’upload. Veuillez réessayer.',
        severity: 'error',
      });
    }
  };

  const handleOpenFile = (fileId) => {
    navigate(`/dashboard/trade-data/${fileId}`);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculer les fichiers à afficher pour la page actuelle
  const startIndex = (page - 1) * filesPerPage;
  const endIndex = startIndex + filesPerPage;
  const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography color="error">Erreur : {error}</Typography>;

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #b9fbc0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Navbar */}
      <Box sx={{ width: '100%', maxWidth: 1200, mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'center' }}>
          <AgricultureIcon sx={{ fontSize: 50, color: '#2e7d32' }} />
          <Typography variant="h3" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
            HarvestFlow
          </Typography>
        </Stack>
      </Box>

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

      <Stack spacing={4} sx={{ width: '100%', maxWidth: 1200 }}>
        {/* Section de téléversement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            sx={{
              p: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              borderRadius: 3,
              bgcolor: '#ffffff',
              border: '1px solid #e0e0e0',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, color: '#2e7d32', textAlign: 'center' }}>
              Téléverser une Nouvelle Base de Données
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              {/* Sélecteur de type de données avec ToggleButtonGroup */}
              <ToggleButtonGroup
                value={dataType}
                exclusive
                onChange={handleDataTypeChange}
                className="toggle-button-group"
              >
                <ToggleButton
                  value="production"
                  className="toggle-button"
                  classes={{ selected: 'toggle-button-selected' }}
                >
                  Production
                </ToggleButton>
                <ToggleButton
                  value="stocks"
                  className="toggle-button"
                  classes={{ selected: 'toggle-button-selected' }}
                >
                  Stocks
                </ToggleButton>
                <ToggleButton
                  value="offres"
                  className="toggle-button"
                  classes={{ selected: 'toggle-button-selected' }}
                >
                  Offres
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Bouton personnalisé pour choisir un fichier */}
              <button className="container-btn-file" disabled={!dataType}>
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                >
                  <path
                    d="M28.8125 .03125L.8125 5.34375C.339844 
                    5.433594 0 5.863281 0 6.34375L0 43.65625C0 
                    44.136719 .339844 44.566406 .8125 44.65625L28.8125 
                    49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 
                    50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 
                    30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 
                    .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 
                    6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 
                    29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 
                    43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 
                    13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 
                    21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 
                    22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 
                    15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 
                    28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 
                    27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 
                    14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 
                    20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"
                  ></path>
                </svg>
                {file ? file.name : 'Upload File'}
                <input
                  className="file"
                  name="text"
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileChange}
                />
              </button>

              <Button
                variant="contained"
                color="success"
                onClick={handleUpload}
                disabled={loading || !dataType || !file}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 0.8,
                  bgcolor: '#2e7d32',
                  '&:hover': { bgcolor: '#1b5e20' },
                }}
              >
                Téléverser
              </Button>
            </Stack>
            {uploadStatus && (
              <Typography
                sx={{ mt: 1, textAlign: 'center', fontSize: '0.9rem' }}
                color={uploadStatus.includes('réussi') ? 'green' : 'red'}
              >
                {uploadStatus}
              </Typography>
            )}
          </Paper>
        </motion.div>

        {/* Liste des fichiers téléversés sous forme de grille de cartes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: '#2e7d32', textAlign: 'center' }}>
            Vos Bases de Données
          </Typography>
          {files.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#666' }}>
              Aucune base de données disponible. Commencez par uploader un fichier.
            </Typography>
          ) : (
            <Box>
              {/* Filtres et tri */}
              <Box className="filter-container">
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="filter-type-label">Filtrer par type</InputLabel>
                  <Select
                    labelId="filter-type-label"
                    value={filterType}
                    label="Filtrer par type"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    <MenuItem value="production">Production</MenuItem>
                    <MenuItem value="stocks">Stocks</MenuItem>
                    <MenuItem value="offres">Offres</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  startIcon={<SortIcon />}
                  onClick={handleSortToggle}
                  sx={{ color: '#2e7d32', borderColor: '#2e7d32' }}
                >
                  Trier par date ({sortOrder === 'desc' ? 'Plus récent' : 'Plus ancien'})
                </Button>
              </Box>

              {/* Grille de cartes */}
              <Grid container spacing={3}>
                {paginatedFiles.map((file, index) => (
                  <Grid item xs={12} sm={6} md={4} key={file._id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="card-container">
                        <Box className="card-header">
                          {file.dataType === 'production' && (
                            <ProductionIcon sx={{ color: '#2e7d32', fontSize: 24, mr: 1 }} />
                          )}
                          {file.dataType === 'stocks' && (
                            <StocksIcon sx={{ color: '#0288d1', fontSize: 24, mr: 1 }} />
                          )}
                          {file.dataType === 'offres' && (
                            <OffresIcon sx={{ color: '#f57c00', fontSize: 24, mr: 1 }} />
                          )}
                          <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                            {file.filename}
                          </Typography>
                        </Box>
                        <CardContent className="card-content">
                          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                            <strong>Type :</strong> {file.dataType}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                            <strong>Nombre de lignes :</strong> {file.rowCount}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666' }}>
                            <strong>Téléversé le :</strong>{' '}
                            {new Date(file.uploadedAt).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                        <CardActions className="card-actions">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleOpenFile(file._id)}
                          >
                            Ouvrir
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Stack direction="row" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(filteredFiles.length / filesPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            </Box>
          )}
        </motion.div>
      </Stack>
    </Box>
  );
};

export default TradeDataManager;