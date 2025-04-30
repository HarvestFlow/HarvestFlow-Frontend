import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTradeData } from "./TradeDataContext";
import {
  Box, Typography, Stack, Button, Snackbar, Alert, CircularProgress,
  Paper,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

const countryList = [
  { name: 'Afghanistan', code: '2' },
  { name: 'Albania', code: '3' },
  { name: 'Algeria', code: '4' },
  { name: 'Argentina', code: '9' },
  { name: 'Australia', code: '10' },
  { name: 'Brazil', code: '21' },
  { name: 'Canada', code: '33' },
  { name: 'China', code: '351' },
  { name: 'France', code: '68' },
  { name: 'Germany', code: '79' },
  { name: 'India', code: '100' },
  { name: 'Italy', code: '106' },
  { name: 'Japan', code: '110' },
  { name: 'Tunisia', code: '222' },
  { name: 'United States of America', code: '231' },
];

const elementList = [
  { code: '5610', name: 'Import Value (1000 US$)', description: 'Valeur des importations en milliers de dollars US.' },
  { code: '5910', name: 'Export Value (1000 US$)', description: 'Valeur des exportations en milliers de dollars US.' },
  { code: '5622', name: 'Import Quantity (tonnes)', description: 'Quantité importée en tonnes.' },
  { code: '5922', name: 'Export Quantity (tonnes)', description: 'Quantité exportée en tonnes.' },
  { code: 'compare', name: 'Compare Import & Export Value', description: 'Compare les valeurs d’importation et d’exportation.' },
];

const getColor = (index) => {
  const colors = [
    '#A9CBA4', '#6B9E78', '#4A704C', '#EF4444', '#8B5CF6',
    '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#6366F1',
  ];
  return colors[index % colors.length];
};

const TradeChartPage = () => {
  const navigate = useNavigate();
  const {
    tradeData, setTradeData,
    loading, setLoading,
    error, setError,
    snackbar, setSnackbar,
    selectedCountry, selectedPartners, selectedElement, yearRange,
    aiAnalysis, setAiAnalysis,
    aiLoading, setAiLoading,
    aiError, setAiError,
    lastRequestUrl, setLastRequestUrl,
  } = useTradeData();

  const fetchTradeData = async () => {
    setLoading(true);
    setAiAnalysis('');
    setAiError(null);
    try {
      const reporterCountryCode = countryList.find(c => c.name === selectedCountry)?.code || '222';
      const partnerCountryCodes = selectedPartners
        .map(partner => countryList.find(c => c.name === partner)?.code)
        .filter(Boolean)
        .join(',') || '231';
      const yearsQuery = Array.from(
        { length: Number(yearRange.end) - Number(yearRange.start) + 1 },
        (_, i) => Number(yearRange.start) + i
      ).join(',');
      const requestUrl = `https://faostatservices.fao.org/api/v1/en/data/TM?reporterarea=${reporterCountryCode}&partnerarea=${partnerCountryCodes}&item=15&year=${yearsQuery}&show_codes=true&show_unit=true&show_flags=true&show_notes=true&null_values=false&page_size=100&output_type=objects`;
      setLastRequestUrl(requestUrl);
      const response = await axios.get(requestUrl, { withCredentials: false });
      setTradeData(response.data.data);
      setLoading(false);
      await sendToAiForAnalysis(response.data.data);
    } catch (err) {
      const message = err.response
        ? `Erreur serveur FAO: ${err.response.status}`
        : 'Erreur réseau: impossible de se connecter au serveur FAO.';
      setError(message);
      setSnackbar({ open: true, message, severity: 'error' });
      setLoading(false);
    }
  };

  const sendToAiForAnalysis = async (data, retries = 3) => {
    setAiLoading(true);
    for (let i = 0; i < retries; i++) {
      try {
        const prompt = `
Analyse les données commerciales de blé suivantes pour ${selectedCountry} avec ses partenaires (${selectedPartners.join(', ')}) entre ${yearRange.start} et ${yearRange.end}. Fournis une analyse détaillée et structurée pour guider ${selectedCountry} dans ses décisions d'importation de blé, en mettant l'accent sur l'anticipation des tendances pour identifier le meilleur pays partenaire pour de futures transactions commerciales. Structure ta réponse en sections avec des titres clairs et des listes à puces.

### Instructions :
1. **Résumé des données** :
   - Fournis un résumé quantitatif des importations (quantité totale, valeur totale, prix moyen par tonne) pour chaque partenaire.
   - Mentionne les tendances générales observées sur la période.

2. **Analyse des tendances historiques** :
   - Décris les tendances annuelles des quantités, valeurs et prix par tonne pour chaque partenaire.
   - Identifie les variations significatives (pics, baisses) et leur chronologie.
   - Calcule la stabilité des livraisons (par exemple, écarts-types des quantités annuelles).

3. **Anticipation des tendances futures** :
   - Sur la base des données historiques, anticipe les tendances futures (par exemple, augmentation/diminution des volumes, fluctuations des prix, stabilité des livraisons) pour les 3 à 5 prochaines années.
   - Prends en compte des facteurs externes potentiels (par exemple, tendances climatiques, politiques commerciales, crises économiques) qui pourraient influencer ces prévisions.
   - Fournis une analyse claire pour chaque partenaire sur leur potentiel futur.

4. **Comparaison des partenaires** :
   - Compare les partenaires en fonction des critères suivants : volume moyen, coût par tonne, stabilité des livraisons, et potentiel futur basé sur l'anticipation des tendances.
   - Fournis un classement des partenaires avec des justifications basées sur les données et les prévisions.

5. **Recommandation stratégique** :
   - Recommande le meilleur pays partenaire pour les importations de blé dans les années à venir, en te basant sur l'anticipation des tendances et les données historiques.
   - Explique pourquoi ce partenaire est le meilleur choix pour optimiser les transactions commerciales (par exemple, meilleur prix, stabilité, potentiel de croissance).
   - Mentionne les risques potentiels (par exemple, dépendance excessive, instabilité politique) et comment les atténuer.

### Données :
${JSON.stringify(data, null, 2)}

### Format de la réponse :
Utilise des titres Markdown (##) pour chaque section, des sous-titres (###) pour les sous-sections, et des listes à puces pour les points clés. Utilise un langage clair, professionnel et orienté vers la prise de décision. Évite les généralisations vagues et privilégie les chiffres spécifiques tirés des données.
`;
        const response = await axios.post(
          'https://agent-c3e00297dd87c5c5860f-thwxf.ondigitalocean.app/api/v1/chat/completions',
          {
            messages: [
              { role: 'user', content: prompt }
            ],
            model: 'llama3.3-70b-instruct',
          },
          {
            headers: {
              'Authorization': 'Bearer QaocsC8cU8Rm3wbH4JLQWviFOrNWwW3P',
              'Content-Type': 'application/json',
            },
            withCredentials: false,
          }
        );
        const analysis = response.data.choices[0].message.content;
        setAiAnalysis(analysis);
        setAiLoading(false);
        navigate('/dashboard/trade-wizard/report');
        return;
      } catch (err) {
        if (err.response?.status === 429 && i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          continue;
        }
        const message = err.response
          ? `Erreur AI: ${err.response.status} - ${err.response.data.message || 'Erreur inconnue'}`
          : 'Erreur réseau: impossible de contacter l’agent AI.';
        setAiError(message);
        setSnackbar({ open: true, message, severity: 'error' });
        break;
      }
    }
    setAiLoading(false);
  };

  useEffect(() => {
    fetchTradeData();
  }, [selectedCountry, selectedPartners, selectedElement, yearRange]);

  const prepareChartData = () => {
    let filteredData = tradeData
      .filter(entry => entry['Reporter Countries'] === selectedCountry)
      .filter(entry => Number(entry['Year']) >= Number(yearRange.start) && Number(entry['Year']) <= Number(yearRange.end));

    let datasets = [];
    let labels = [];
    let stats = {};

    if (selectedElement === 'compare') {
      const importData = filteredData.filter(entry => entry['Element Code'] === '5610');
      const exportData = filteredData.filter(entry => entry['Element Code'] === '5910');
      datasets = [
        {
          label: `Import Value (1000 US$) - ${selectedCountry}`,
          data: importData.map(entry => Number(entry['Value']) || 0),
          borderColor: '#A9CBA4',
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(169, 203, 164, 0.3)');
            gradient.addColorStop(1, 'rgba(169, 203, 164, 0)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          yAxisID: 'y',
        },
        {
          label: `Export Value (1000 US$) - ${selectedCountry}`,
          data: exportData.map(entry => Number(entry['Value']) || 0),
          borderColor: '#6B9E78',
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(107, 158, 120, 0.3)');
            gradient.addColorStop(1, 'rgba(107, 158, 120, 0)');
            return gradient;
          },
          fill: true,
          tension: 0.4,
          yAxisID: 'y',
        },
      ];
      labels = importData.map(entry => entry['Year']);
    } else {
      const partners = selectedPartners.length > 0 ? selectedPartners : ['United States of America'];
      datasets = partners.map((partner, index) => {
        const partnerData = filteredData
          .filter(entry => entry['Partner Countries'] === partner)
          .filter(entry => entry['Element Code'] === selectedElement);
        return {
          label: `${elementList.find(e => e.code === selectedElement)?.name} - ${partner}`,
          data: partnerData.map(entry => Number(entry['Value']) || 0),
          borderColor: getColor(index + 1),
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, `${getColor(index + 1)}33`);
            gradient.addColorStop(1, `${getColor(index + 1)}00`);
            return gradient;
          },
          fill: true,
          tension: 0.4,
        };
      });
      const reporterData = filteredData.filter(entry => entry['Element Code'] === selectedElement);
      datasets.unshift({
        label: `${elementList.find(e => e.code === selectedElement)?.name} - ${selectedCountry}`,
        data: reporterData.map(entry => Number(entry['Value']) || 0),
        borderColor: '#A9CBA4',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(169, 203, 164, 0.3)');
          gradient.addColorStop(1, 'rgba(169, 203, 164, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
      });
      labels = reporterData.map(entry => entry['Year']);
    }

    const chartData = { labels, datasets };

    const values = filteredData
      .filter(entry => entry['Element Code'] === selectedElement)
      .map(entry => Number(entry['Value']) || 0);
    stats = {
      avg: values.length ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2) : '0',
      max: values.length ? Math.max(...values).toFixed(2) : '0',
      min: values.length ? Math.min(...values).toFixed(2) : '0',
      total: values.length ? values.reduce((sum, v) => sum + v, 0).toFixed(2) : '0',
      unit: elementList.find(e => e.code === selectedElement)?.name.includes('Value') ? '1000 US$' : 'tonnes',
    };

    return { chartData, stats };
  };

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
        labels: { font: { size: 14, family: 'Roboto' }, color: '#355E3B' },
      },
      title: {
        display: true,
        text: `Données Commerciales de Blé - ${selectedCountry} (${yearRange.start} - ${yearRange.end})`,
        font: { size: 18, family: 'Playfair Display', weight: '600' },
        color: '#355E3B',
      },
      tooltip: {
        backgroundColor: '#FAFAFA',
        titleColor: '#355E3B',
        bodyColor: '#4A704C',
        borderColor: '#A9CBA4',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const { dataset, raw } = context;
            const unit = dataset.label.includes('Value') ? '1000 US$' : 'tonnes';
            return `${dataset.label}: ${raw} ${unit}`;
          },
        },
      },
    },
    scales: selectedElement === 'compare' ? {
      x: {
        type: 'category',
        grid: { display: false },
        title: { display: true, text: 'Année', font: { size: 14, family: 'Roboto' }, color: '#355E3B' },
        ticks: { color: '#4A704C' },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.1)' },
        title: { display: true, text: 'Valeur (1000 US$)', font: { size: 14, family: 'Roboto' }, color: '#355E3B' },
        ticks: { color: '#4A704C' },
      },
    } : {
      x: {
        type: 'category',
        grid: { display: false },
        title: { display: true, text: 'Année', font: { size: 14, family: 'Roboto' }, color: '#355E3B' },
        ticks: { color: '#4A704C' },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.1)' },
        title: {
          display: true,
          text: elementList.find(e => e.code === selectedElement)?.name.includes('Value') ? 'Valeur (1000 US$)' : 'Quantité (tonnes)',
          font: { size: 14, family: 'Roboto' },
          color: '#355E3B',
        },
        ticks: { color: '#4A704C' },
      },
    },
  });

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
      const margin = 10;

      pdf.setFontSize(16);
      pdf.text(`Trade Data - ${selectedCountry} (${yearRange.start} - ${yearRange.end})`, margin, 15);
      let position = 25;
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      let heightLeft = imgHeight - (pageHeight - 25);

      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - imgHeight;
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, pageHeight - 10);
      pdf.save(`trade_data_${selectedCountry}_wheat_${selectedElement}_${yearRange.start}-${yearRange.end}.pdf`);
    });
  };

  const { chartData, stats } = prepareChartData();

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4, color: '#A9CBA4' }} />;
  if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4, color: '#4A704C' }}>Erreur : {error}</Typography>;

  return (
    <Box
      sx={{
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #B0BEC5 100%)',
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' opacity='0.05'%3E%3Cpath d='M10 90 Q 50 10 90 90' stroke='%23A9CBA4' stroke-width='5' fill='none'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          opacity: 0.05,
          zIndex: 0,
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: '#355E3B',
          fontWeight: 700,
          fontFamily: '"Playfair Display", serif',
          mb: 4,
          textAlign: 'center',
        }}
      >
        Étape 2 : Visualisation des Données
      </Typography>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '2px solid #A9CBA4',
          bgcolor: '#FAFAFA',
          position: 'relative',
          zIndex: 1,
          maxWidth: '1000px',
          mx: 'auto',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#355E3B',
              fontWeight: 600,
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Analyse des Données Commerciales
          </Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={exportToPDF}
            sx={{
              bgcolor: '#6B9E78',
              color: '#E8F5E9',
              fontWeight: 600,
              fontFamily: '"Roboto", sans-serif',
              '&:hover': { bgcolor: '#4A704C' },
            }}
            aria-label="Exporter le graphique en PDF"
          >
            Exporter en PDF
          </Button>
        </Stack>
        <Box id="chart-container">
          {chartData && chartData.labels.length > 0 ? (
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
                    border: '1px solid #A9CBA4',
                    bgcolor: '#FAFAFA',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <Box sx={{ height: { xs: '300px', sm: '400px', md: '450px' } }}>
                    <Line data={chartData} options={getChartOptions()} />
                  </Box>
                </Paper>
              </motion.div>
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
                    border: '1px solid #A9CBA4',
                    bgcolor: '#FAFAFA',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: '#355E3B',
                      mb: 2,
                      fontWeight: 500,
                      fontFamily: '"Roboto", sans-serif',
                    }}
                  >
                    Statistiques ({elementList.find(e => e.code === selectedElement)?.name || 'Unknown'})
                  </Typography>
                  <Stack spacing={1}>
                    <Typography sx={{ color: '#4A704C' }}>
                      Moyenne : <strong>{stats.avg} {stats.unit}</strong>
                    </Typography>
                    <Typography sx={{ color: '#4A704C' }}>
                      Maximum : <strong>{stats.max} {stats.unit}</strong>
                    </Typography>
                    <Typography sx={{ color: '#4A704C' }}>
                      Minimum : <strong>{stats.min} {stats.unit}</strong>
                    </Typography>
                    <Typography sx={{ color: '#4A704C' }}>
                      Total : <strong>{stats.total} {stats.unit}</strong>
                    </Typography>
                  </Stack>
                </Paper>
              </motion.div>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/dashboard/trade-wizard')}
                  sx={{
                    borderColor: '#A9CBA4',
                    color: '#6B9E78',
                    fontFamily: '"Roboto", sans-serif',
                    '&:hover': { borderColor: '#4A704C', color: '#4A704C' },
                  }}
                >
                  Retour
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/dashboard/trade-wizard/report')}
                  sx={{
                    bgcolor: '#6B9E78',
                    color: '#E8F5E9',
                    fontFamily: '"Roboto", sans-serif',
                    '&:hover': { bgcolor: '#4A704C' },
                  }}
                  disabled={aiLoading || !aiAnalysis}
                >
                  Suivant : Rapport IA
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Typography sx={{ color: '#4A704C', textAlign: 'center', fontFamily: '"Roboto", sans-serif' }}>
              Aucune donnée disponible pour {selectedCountry} avec les pays partenaires sélectionnés ({elementList.find(e => e.code === selectedElement)?.name || 'Unknown'}). Veuillez sélectionner d’autres pays ou années.
            </Typography>
          )}
        </Box>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default TradeChartPage;