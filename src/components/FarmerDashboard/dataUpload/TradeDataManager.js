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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  LinearProgress,
  IconButton,
  Grid,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  Sort as SortIcon,
  Nature as ProductionIcon,
  Inventory as StocksIcon,
  Description as OffresIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Styles pour le bouton d'upload
const styles = `
  .container-btn-file {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: #307750;
    color: #fff;
    border-style: none;
    padding: 1em 2em;
    border-radius: 0.5em;
    overflow: hidden;
    z-index: 1;
    box-shadow: 4px 8px 10px -3px rgba(0, 0, 0, 0.356);
    transition: all 250ms;
    font-size: 1.2rem;
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
    width: 24px;
    height: 24px;
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
  .container-btn-file:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const filesPerPage = 6;

  const supportedFileTypes = [
    '.csv',
    '.xlsx',
    '.ods',
    '.json',
    '.xml',
    '.txt',
    '.geojson',
    '.pdf',
  ];

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
      setSnackbar({
        open: true,
        message: 'Erreur lors de la récupération des fichiers.',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    let updatedFiles = [...files];

    if (filterType !== 'all') {
      updatedFiles = updatedFiles.filter((file) => file.dataType === filterType);
    }

    updatedFiles.sort((a, b) => {
      const dateA = new Date(a.uploadedAt);
      const dateB = new Date(b.uploadedAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredFiles(updatedFiles);
    setPage(1);
  }, [filterType, sortOrder, files]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (!supportedFileTypes.includes(`.${fileExtension}`)) {
        setUploadStatus('Type de fichier non supporté.');
        setSnackbar({
          open: true,
          message: `Type de fichier non supporté. Utilisez : ${supportedFileTypes.join(', ')}`,
          severity: 'error',
        });
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setUploadStatus(selectedFile.name);
    } else {
      setFile(null);
      setUploadStatus('Aucun fichier choisi');
    }
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

    setIsUploading(true);
    setUploadProgress(0);

    // Simuler la progression (~6 secondes)
    const simulateProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 600);
    };
    simulateProgress();

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
      const errorMessage = error.response?.data?.message || 'Échec de l’upload. Veuillez réessayer.';
      setUploadStatus(errorMessage);
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleOpenFile = (fileId) => {
    navigate(`/dashboard/trade-data/${fileId}`);
  };

  const handleDeleteFile = async (fileId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/trade/${userId}/${fileId}`, {
          withCredentials: true,
        });
        setSnackbar({
          open: true,
          message: 'Fichier supprimé avec succès !',
          severity: 'success',
        });
        fetchTradeFiles();
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Échec de la suppression. Veuillez réessayer.';
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error',
        });
      }
    }
  };

  const handleEditFile = (fileId) => {
    navigate(`/dashboard/edit-trade-data/${fileId}`);
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

  const startIndex = (page - 1) * filesPerPage;
  const endIndex = startIndex + filesPerPage;
  const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

  if (loading) return <Typography sx={{ textAlign: 'center', color: '#1F2937', mt: 4 }}>Chargement...</Typography>;
  if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Erreur : {error}</Typography>;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #b9fbc0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200, mb: 4 }}>
        <Typography variant="h3" sx={{ color: '#2e7d32', fontWeight: 'bold', textAlign: 'center' }}>
          Trade Data Upload
        </Typography>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={(event, reason) => {
          if (reason !== 'clickaway') {
            setSnackbar({ ...snackbar, open: false });
          }
        }}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            sx={{
              p: { xs: 3, md: 4 },
              boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              borderRadius: 3,
              bgcolor: '#ffffff',
              border: '1px solid #2e7d32',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3, justifyContent: 'center' }}>
              <CloudUploadIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
              <Typography variant="h5" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                Téléverser une Nouvelle Base de Données
              </Typography>
            </Stack>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <ToggleButtonGroup
                  value={dataType}
                  exclusive
                  onChange={handleDataTypeChange}
                  sx={{
                    bgcolor: '#f1f8e9',
                    borderRadius: 2,
                    '& .MuiToggleButton-root': {
                      color: '#2e7d32',
                      border: 'none',
                      px: 2,
                      py: 0.8,
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#e8f5e9' },
                      '&.Mui-selected': { bgcolor: '#2e7d32', color: '#fff', '&:hover': { bgcolor: '#1b5e20' } },
                    },
                  }}
                >
                  <ToggleButton value="production">Production</ToggleButton>
                  <ToggleButton value="stocks">Stocks</ToggleButton>
                  <ToggleButton value="offres">Offres</ToggleButton>
                </ToggleButtonGroup>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={loading || !dataType || !file || isUploading}
                  sx={{
                    mt: 2,
                    width: '100%',
                    bgcolor: '#2e7d32',
                    color: '#fff',
                    borderRadius: 12,
                    px: 3,
                    py: 1,
                    '&:hover': { bgcolor: '#1b5e20' },
                  }}
                >
                  Téléverser
                </Button>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <button className="container-btn-file" disabled={!dataType}>
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
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
                    type="file"
                    accept=".csv,.xlsx,.ods,.json,.xml,.txt,.geojson,.pdf"
                    onChange={handleFileChange}
                  />
                </button>
              </Grid>
            </Grid>
            {isUploading && (
              <Box sx={{ mt: 2, width: '100%' }}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': { bgcolor: '#2e7d32' },
                  }}
                />
              </Box>
            )}
            {uploadStatus && (
              <Typography
                sx={{ mt: 1, textAlign: 'center', fontSize: '0.9rem' }}
                color={uploadStatus.includes('réussi') ? '#2e7d32' : '#EF4444'}
              >
                {uploadStatus}
              </Typography>
            )}
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: '#2e7d32', textAlign: 'center', fontWeight: 600 }}>
            Vos Bases de Données
          </Typography>
          {files.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#1F2937' }}>
              Aucune base de données disponible. Commencez par uploader un fichier.
            </Typography>
          ) : (
            <Paper
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                border: '1px solid #2e7d32',
                bgcolor: '#fff',
              }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems="center">
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="filter-type-label">Filtrer par type</InputLabel>
                  <Select
                    labelId="filter-type-label"
                    value={filterType}
                    label="Filtrer par type"
                    onChange={handleFilterChange}
                    sx={{ bgcolor: '#F9FAFB', borderRadius: 1 }}
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
                  sx={{
                    color: '#2e7d32',
                    borderColor: '#2e7d32',
                    borderRadius: 12,
                    '&:hover': { bgcolor: '#e8f5e9', borderColor: '#1b5e20' },
                  }}
                >
                  Trier par date ({sortOrder === 'desc' ? 'Plus récent' : 'Plus ancien'})
                </Button>
              </Stack>

              <TableContainer sx={{ maxHeight: 600, overflowX: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: '#66bb6a',
                          color: '#fff',
                          fontWeight: 600,
                          py: 1.5,
                          borderBottom: '1px solid #2e7d32',
                        }}
                      >
                        Nom du fichier
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#66bb6a',
                          color: '#fff',
                          fontWeight: 600,
                          py: 1.5,
                          borderBottom: '1px solid #2e7d32',
                        }}
                      >
                        Type
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#66bb6a',
                          color: '#fff',
                          fontWeight: 600,
                          py: 1.5,
                          borderBottom: '1px solid #2e7d32',
                        }}
                      >
                        Lignes
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#66bb6a',
                          color: '#fff',
                          fontWeight: 600,
                          py: 1.5,
                          borderBottom: '1px solid #2e7d32',
                        }}
                      >
                        Colonnes
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#66bb6a',
                          color: '#fff',
                          fontWeight: 600,
                          py: 1.5,
                          borderBottom: '1px solid #2e7d32',
                        }}
                      >
                        Téléversé le
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: '#66bb6a',
                          color: '#fff',
                          fontWeight: 600,
                          py: 1.5,
                          borderBottom: '1px solid #2e7d32',
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedFiles.map((file, index) => (
                      <TableRow
                        key={file._id}
                        sx={{
                          bgcolor: index % 2 === 0 ? '#F9FAFB' : '#FFFFFF',
                          '&:hover': { bgcolor: '#E8F5E9' },
                        }}
                      >
                        <TableCell sx={{ color: '#1F2937', py: 1.5 }}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            {file.dataType === 'production' && (
                              <ProductionIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                            )}
                            {file.dataType === 'stocks' && (
                              <StocksIcon sx={{ color: '#0288d1', fontSize: 20 }} />
                            )}
                            {file.dataType === 'offres' && (
                              <OffresIcon sx={{ color: '#f57c00', fontSize: 20 }} />
                            )}
                            <Typography variant="body2">{file.filename}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: '#1F2937', py: 1.5 }}>
                          {file.dataType.charAt(0).toUpperCase() + file.dataType.slice(1)}
                        </TableCell>
                        <TableCell sx={{ color: '#1F2937', py: 1.5 }}>{file.rowCount}</TableCell>
                        <TableCell sx={{ color: '#1F2937', py: 1.5 }}>
                          {file.columns.length > 3
                            ? `${file.columns.slice(0, 3).join(', ')}...`
                            : file.columns.join(', ')}
                        </TableCell>
                        <TableCell sx={{ color: '#1F2937', py: 1.5 }}>
                          {new Date(file.uploadedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{ py: 1.5 }}>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenFile(file._id)}
                              sx={{
                                bgcolor: '#3B82F6',
                                color: '#fff',
                                '&:hover': { bgcolor: '#2563EB' },
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleEditFile(file._id)}
                              sx={{
                                bgcolor: '#F59E0B',
                                color: '#fff',
                                '&:hover': { bgcolor: '#D97706' },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteFile(file._id)}
                              sx={{
                                bgcolor: '#EF4444',
                                color: '#fff',
                                '&:hover': { bgcolor: '#DC2626' },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Stack direction="row" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(filteredFiles.length / filesPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      color: '#2e7d32',
                      '&.Mui-selected': { bgcolor: '#2e7d32', color: '#fff' },
                    },
                  }}
                />
              </Stack>
            </Paper>
          )}
        </motion.div>
      </Stack>
    </Box>
  );
};

export default TradeDataManager;