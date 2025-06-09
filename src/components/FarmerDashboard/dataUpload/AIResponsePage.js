import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Typography, Stack, Button, Paper, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Toolbar, AppBar, CssBaseline, Divider, CircularProgress, Snackbar, Alert,
  Table, TableHead, TableBody, TableRow, TableCell,
} from '@mui/material';
import {
  Menu as MenuIcon, ArrowBack as ArrowBackIcon, Download as DownloadIcon, Refresh as RefreshIcon,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement,
  Title, Tooltip as ChartTooltip, Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Register Chart.js components
ChartJS.register(
  CategoryScale, LinearScale, LineElement, PointElement,
  Title, ChartTooltip, Legend
);

function AIResponsePage() {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const drawerWidth = 240;

  // Fetch user profile
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getProfile', { withCredentials: true });
        setUserId(response.data._id);
      } catch (err) {
        setError('Impossible de récupérer le profil utilisateur');
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  // Fetch AI responses
 useEffect(() => {
    if (userId) fetchAIResponses();
  }, [userId]);

  const fetchAIResponses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/trade/${userId}/${fileId}/responses`, {
        withCredentials: true,
      });
      setResponses(res.data);
    } catch (error) {
      setError('Erreur lors de la récupération des réponses IA. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Retry analysis
  const retryAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      await axios.post(
        `http://localhost:5000/api/trade/${userId}/${fileId}/analyze`,
        { tradeData: [], messages: [{ role: 'user', content: 'Réessayez l\'analyse.' }] },
        { withCredentials: true }
      );
      await fetchAIResponses();
      setSnackbar({ open: true, message: 'Analyse réessayée avec succès', severity: 'success' });
    } catch (error) {
      setError('Échec de la réanalyse : ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Parse JSON and Markdown from response
  const parseJSONFromResponse = (response, sectionKey) => {
    try {
      const regex = /```json\n({[^`]+})\n```/g;
      const match = response.match(regex);
      if (match) {
        for (const jsonBlock of match) {
          const jsonString = jsonBlock.replace('```json\n', '').replace('\n```', '');
          const parsed = JSON.parse(jsonString);
          if (parsed[sectionKey]) return parsed[sectionKey];
        }
      }
      return null;
    } catch (error) {
      console.error(`Erreur lors du parsing de ${sectionKey}:`, error);
      return null;
    }
  };

  const parseTrendSummary = (response) => {
    try {
      const lines = response.split('\n');
      const summaryLines = lines.filter(line => line.startsWith('- ') && line.includes(' : '));
      return summaryLines.map(line => line.replace('- ', '').trim());
    } catch (error) {
      console.error('Erreur lors du parsing du résumé des tendances:', error);
      return [];
    }
  };

  // Prepare chart data
  const prepareChartData = (response) => {
    const profitPredictions = parseJSONFromResponse(response, 'profitPredictions') || [];

    const profitPredictionData = {
      labels: profitPredictions.map(item => item.month),
      datasets: profitPredictions.length > 0 && profitPredictions[0].profits
        ? Object.keys(profitPredictions[0].profits).map((product, index) => ({
            label: `${product} (€)`,
            data: profitPredictions.map(item => item.profits[product] || 0),
            borderColor: getColor(index),
            backgroundColor: `rgba(${parseInt(getColor(index).slice(1, 3), 16)}, ${parseInt(getColor(index).slice(3, 5), 16)}, ${parseInt(getColor(index).slice(5, 7), 16)}, 0.2)`,
            fill: false,
            tension: 0.4,
          }))
        : [],
    };

    // Calculate total profits per product
    const totalProfits = profitPredictions.length > 0 && profitPredictions[0].profits
      ? Object.keys(profitPredictions[0].profits).map(product => ({
          product,
          total: profitPredictions.reduce((sum, item) => sum + (item.profits[product] || 0), 0).toFixed(2),
        }))
      : [];

    return { profitPredictionData, totalProfits };
  };

  const getColor = (index) => {
    const colors = [
      '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6',
      '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#6366F1',
    ];
    return colors[index % colors.length];
  };

  const getChartOptions = (title, xTitle, yTitle) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { size: 14, family: 'Roboto' }, color: '#1F2937' } },
      title: { display: true, text: title, font: { size: 18, family: 'Roboto', weight: '600' }, color: '#1F2937' },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#1F2937',
        bodyColor: '#1F2937',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const dataset = context.dataset;
            const index = context.dataIndex;
            const value = context.parsed.y;
            const prevValue = index > 0 ? dataset.data[index - 1] : value;
            const change = index > 0 ? ((value - prevValue) / prevValue * 100).toFixed(2) : 0;
            return `${dataset.label}: ${value.toFixed(2)} € (${change > 0 ? '+' : ''}${change}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: xTitle, font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
      y: {
        title: { display: true, text: yTitle, font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
    },
  });

  const exportToPDF = () => {
    const input = document.getElementById('report-container');
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

      pdf.save(`AI_Profit_Predictions_${fileId}.pdf`);
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sections = [
    { id: 'predictions', label: 'Prédictions des Profits', icon: <TrendingUp /> },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
          Analyse IA
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              selected={section.id === 'predictions'}
              onClick={() => {}}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#3B82F6',
                  color: '#fff',
                  '& .MuiListItemIcon-root': { color: '#fff' },
                  '&:hover': { backgroundColor: '#2563EB' },
                },
                '&:hover': { backgroundColor: '#F1F5F9' },
              }}
            >
              <ListItemIcon sx={{ color: '#1F2937' }}>
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  if (loading) return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Analyse en cours...</Typography>
    </Box>
  );
  if (error) return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography color="error">Erreur : {error}</Typography>
      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={retryAnalysis}
        sx={{ mt: 2, bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
      >
        Réessayer l'analyse
      </Button>
    </Box>
  );
  if (responses.length === 0) return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography>Aucune réponse IA disponible</Typography>
      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={retryAnalysis}
        sx={{ mt: 2, bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
      >
        Lancer une nouvelle analyse
      </Button>
    </Box>
  );

  const latestResponse = responses[0];
  const { profitPredictionData, totalProfits } = prepareChartData(latestResponse.response);
  const trendSummary = parseTrendSummary(latestResponse.response);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#fff',
          color: '#1F2937',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
            <IconButton onClick={() => navigate(`/trade-data/${fileId}`)}>
              <ArrowBackIcon sx={{ color: '#1F2937' }} />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ fontWeight: 600, fontFamily: 'Poppins' }}>
              Prédictions des Profits
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={exportToPDF}
            sx={{ bgcolor: '#F59E0B', '&:hover': { bgcolor: '#D97706' } }}
          >
            Exporter en PDF
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#fff', boxShadow: '2px 0 8px rgba(0,0,0,0.1)' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#fff', boxShadow: '2px 0 8px rgba(0,0,0,0.1)' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'linear-gradient(135deg, #E2E8F0 0%, #F3F4F6 100%)',
        }}
      >
        <Toolbar />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
        <Box id="report-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', bgcolor: '#fff' }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1F2937', fontWeight: 600 }}>
                Prédictions des Profits
              </Typography>
              <Stack spacing={3}>
                {profitPredictionData.labels.length > 0 && profitPredictionData.datasets.length > 0 ? (
                  <>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2, color: '#1F2937', fontWeight: 500 }}>
                        Prédictions des Profits (6 mois)
                      </Typography>
                      <Box sx={{ height: 300 }}>
                        <Line
                          data={profitPredictionData}
                          options={getChartOptions('Prédictions des Profits', 'Mois', 'Profit (€)')}
                        />
                      </Box>
                    </Box>
                    {trendSummary.length > 0 && (
                      <Box>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: '#1F2937', fontWeight: 500 }}>
                          Résumé des Tendances
                        </Typography>
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <Typography sx={{ color: '#1F2937', mb: 1 }}>{children}</Typography>,
                            ul: ({ children }) => <ul style={{ color: '#1F2937', paddingLeft: '20px' }}>{children}</ul>,
                            li: ({ children }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
                          }}
                        >
                          {trendSummary.map(line => `- ${line}`).join('\n')}
                        </ReactMarkdown>
                      </Box>
                    )}
                    {totalProfits.length > 0 && (
                      <Box>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: '#1F2937', fontWeight: 500 }}>
                          Profits Totaux Prédits
                        </Typography>
                        <Table sx={{ minWidth: 300, mb: 2 }}>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600, color: '#1F2937' }}>Produit</TableCell>
                              <TableCell sx={{ fontWeight: 600, color: '#1F2937' }}>Total (€)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {totalProfits.map(({ product, total }) => (
                              <TableRow key={product}>
                                <TableCell sx={{ color: '#1F2937' }}>{product}</TableCell>
                                <TableCell sx={{ color: '#1F2937' }}>{total}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    )}
                  </>
                ) : (
                  <Typography sx={{ color: '#EF4444' }}>
                    Prédictions des profits non disponibles : données insuffisantes (product, unit_price, ou total_cost manquant).
                  </Typography>
                )}
              </Stack>
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}

export default AIResponsePage;