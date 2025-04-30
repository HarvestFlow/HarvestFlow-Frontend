import { useState, useEffect, useCallback, memo } from 'react';
import axios from 'axios';
import {
  Box, Typography, Stack, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, CircularProgress,
  Paper, Tooltip, TextField, Card, Divider,
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Autocomplete from '@mui/material/Autocomplete';
import DOMPurify from 'dompurify';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

// Utility function to get color for datasets
const getColor = (index) => {
  const colors = [
    '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#6366F1',
  ];
  return colors[index % colors.length];
};

// Country list (abridged for brevity; use the full list from your original code)
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
  // Add the full country list here
];

// Trade elements
const elementList = [
  { code: '5610', name: 'Import Value (1000 US$)', description: 'Valeur des importations en milliers de dollars US.' },
  { code: '5910', name: 'Export Value (1000 US$)', description: 'Valeur des exportations en milliers de dollars US.' },
  { code: '5622', name: 'Import Quantity (tonnes)', description: 'Quantité importée en tonnes.' },
  { code: '5922', name: 'Export Quantity (tonnes)', description: 'Quantité exportée en tonnes.' },
  { code: 'compare', name: 'Compare Import & Export Value', description: 'Compare les valeurs d’importation et d’exportation.' },
];

// Format AI response to HTML with enhanced styling
const formatAiResponse = (text) => {
  if (!text) return '';
  const lines = text.split('\n').filter(line => line.trim());
  let html = '';
  let inList = false;

  lines.forEach(line => {
    line = line.trim();
    if (line.startsWith('## ')) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      console.log('Section Title:', line.slice(3));
      html += `<h5 class="section-title">${line.slice(3)}</h5>`;
    } else if (line.startsWith('### ')) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      console.log('Subsection Title:', line.slice(4));
      html += `<h6 class="subsection-title">${line.slice(4)}</h6>`;
    } else if (line.match(/^\*\*.*\*\*$/)) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      const subtitle = line.replace(/^\*\*(.*)\*\*$/, '$1').trim();
      console.log('Subtitle Detected:', subtitle);
      html += `<h6 class="subtitle">${subtitle}</h6>`;
    } else if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="metric-list">';
        inList = true;
      }
      let content = line.slice(2).trim();
      // Detect numbers with units or standalone numbers
      const metricMatch = content.match(/(\d{1,3}(?: \d{3})*(?:\.\d+)?|\d{1,3}(?: \d{3})*)\s*(tonnes|USD)?/g);
      if (metricMatch) {
        console.log('Metrics Detected:', metricMatch);
        metricMatch.forEach(match => {
          const [number, unit] = match.split(/\s*(tonnes|USD)?\s*/).filter(Boolean);
          content = content.replace(match, `<span class="metric-chip">${number}${unit ? ` ${unit}` : ''}</span>`);
        });
      }
      // Highlight country in recommendation
      if (line.includes('meilleur partenaire')) {
        const countries = ['Italie', 'France', 'États-Unis'];
        countries.forEach(country => {
          if (content.includes(country)) {
            console.log('Recommendation Country Detected:', country);
            content = content.replace(country, `<span class="highlight-country">${country}</span>`);
          }
        });
      }
      html += `<li>${content}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="section-text">${line}</p>`;
    }
  });

  if (inList) {
    html += '</ul>';
  }

  console.log('Formatted HTML:', html);
  return DOMPurify.sanitize(html, { ADD_ATTR: ['class'] });
};

// Memoized AI Analysis Component
const AiAnalysis = memo(({ aiLoading, aiError, aiAnalysis }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <Card
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        border: '1px solid #E5E7EB',
        bgcolor: 'linear-gradient(145deg, #FFFFFF, #F9FAFB)',
        '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.16)' },
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: '#1F2937',
          mb: 2,
          fontWeight: 600,
          fontFamily: 'Poppins',
          borderBottom: '2px solid #10B981',
          pb: 1,
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
        }}
      >
        Analyse par IA
      </Typography>
      <Divider sx={{ mb: 2, borderColor: '#E5E7EB' }} />
      {aiLoading ? (
        <CircularProgress size={24} sx={{ display: 'block', mx: 'auto' }} />
      ) : aiError ? (
        <Typography color="error" sx={{ fontStyle: 'italic', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          {aiError}
        </Typography>
      ) : aiAnalysis ? (
        <Box
          sx={{
            color: '#1F2937',
            lineHeight: 1.6,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            '& .section-title': {
              color: '#1F2937',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              mt: 3,
              mb: 1.5,
              borderLeft: '4px solid #10B981',
              pl: 1.5,
            },
            '& .subsection-title': {
              color: '#4B5563',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              mt: 2,
              mb: 1,
            },
            '& .subtitle': {
              color: '#1F2937',
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              mt: 2,
              mb: 1,
              bgcolor: '#F3F4F6',
              px: 1,
              py: 0.5,
              borderRadius: '4px',
              display: 'inline-block',
            },
            '& .metric-list': {
              pl: 3,
              mb: 1.5,
              '& li': {
                mb: 0.5,
                position: 'relative',
                pl: 1.5,
                '&::before': {
                  content: '"•"',
                  position: 'absolute',
                  left: 0,
                  color: '#10B981',
                  fontWeight: 'bold',
                },
              },
            },
            '& .metric-chip': {
              display: 'inline-block',
              bgcolor: '#ECFDF5',
              color: '#1F2937',
              fontWeight: 600,
              px: 1,
              py: 0.25,
              borderRadius: '12px',
              mx: 0.5,
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
            },
            '& .highlight-country': {
              fontWeight: 700,
              color: '#10B981',
              bgcolor: '#F0FDF4',
              px: 1,
              borderRadius: '4px',
            },
            '& .section-text': {
              mb: 1,
              color: '#1F2937',
            },
            // Fallback styles
            '& h6.subtitle': {
              color: '#1F2937',
              fontWeight: 700,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              mt: 2,
              mb: 1,
              bgcolor: '#F3F4F6',
              px: 1,
              py: 0.5,
              borderRadius: '4px',
              display: 'inline-block',
            },
            '& span.metric-chip': {
              display: 'inline-block',
              bgcolor: '#ECFDF5',
              color: '#1F2937',
              fontWeight: 600,
              px: 1,
              py: 0.25,
              borderRadius: '12px',
              mx: 0.5,
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
            },
            '& span.highlight-country': {
              fontWeight: 700,
              color: '#10B981',
              bgcolor: '#F0FDF4',
              px: 1,
              borderRadius: '4px',
            },
          }}
          dangerouslySetInnerHTML={{ __html: formatAiResponse(aiAnalysis) }}
        />
      ) : (
        <Typography sx={{ color: '#1F2937', fontStyle: 'italic', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Aucune analyse disponible. Veuillez attendre que les données soient analysées.
        </Typography>
      )}
    </Card>
  </motion.div>
));

const TradeDataPage = () => {
  const [tradeData, setTradeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedCountry, setSelectedCountry] = useState('Tunisia');
  const [selectedPartners, setSelectedPartners] = useState(['United States of America']);
  const [selectedElement, setSelectedElement] = useState('5610');
  const [yearRange, setYearRange] = useState({ start: '1991', end: '2024' });
  const [lastRequestUrl, setLastRequestUrl] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // Fetch trade data from FAO API
  const fetchTradeData = useCallback(async () => {
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
      // Send data to AI for analysis
      await sendToAiForAnalysis(response.data.data);
    } catch (err) {
      const message = err.response
        ? `Erreur serveur FAO: ${err.response.status}`
        : 'Erreur réseau: impossible de se connecter au serveur FAO.';
      setError(message);
      setSnackbar({ open: true, message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [selectedCountry, selectedPartners, yearRange]);

  // Send trade data to AI endpoint for analysis with retry logic
  const sendToAiForAnalysis = async (data, retries = 3) => {
    setAiLoading(true);
    for (let i = 0; i < retries; i++) {
      try {
        const prompt = `
Analyse les données commerciales de blé suivantes pour ${selectedCountry} avec ses partenaires (${selectedPartners.join(', ')}) entre ${yearRange.start} et ${yearRange.end}. Fournis une analyse détaillée et structurée pour guider la sélection du meilleur pays partenaire pour les importations de blé, en tenant compte des critères suivants : volume d'importation, valeur, prix par tonne, stabilité des livraisons, et facteurs externes. Structure ta réponse en sections avec des titres clairs, des listes à puces, et une recommandation finale.

### Instructions :
1. **Résumé des données** : Fournis un résumé quantitatif des importations (quantité totale, valeur totale, prix moyen par tonne) pour chaque partenaire.
2. **Tendances et variations** :
   - Décris les tendances annuelles des quantités et valeurs importées par partenaire.
   - Identifie les variations significatives (pics, baisses) et leur chronologie.
   - Calcule la stabilité des livraisons (par exemple, écarts-types des quantités annuelles).
3. **Facteurs influençant les données** :
   - Analyse les facteurs possibles (par exemple, prix mondiaux, accords commerciaux, conditions climatiques, politiques douanières).
   - Mentionne les événements historiques pertinents (par exemple, crises économiques, sécheresses).
4. **Comparaison des partenaires** :
   - Compare les partenaires selon : volume moyen, coût par tonne, régularité des livraisons, et résilience aux fluctuations.
   - Fournis un score ou un classement basé sur ces critères.
5. **Recommandation** :
   - Recommande le meilleur pays partenaire pour les importations de blé, avec une justification claire basée sur les données.
   - Mentionne les risques ou considérations (par exemple, dépendance à un seul partenaire).

### Données :
${JSON.stringify(data, null, 2)}

### Format de la réponse :
Utilise des titres Markdown (##, ###) pour chaque section, des listes à puces pour les points clés, et un langage clair et professionnel. Évite les généralisations vagues et privilégie les chiffres spécifiques tirés des données. Utilise ** ** pour mettre en gras les sous-titres dans chaque section (par exemple, **Quantité totale importée**, **France**).
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

  // Fetch data when selections change
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchTradeData();
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [fetchTradeData]);

  // Prepare chart data
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
          yAxisID: 'y',
        },
        {
          label: `Export Value (1000 US$) - ${selectedCountry}`,
          data: exportData.map(entry => Number(entry['Value']) || 0),
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
        text: `Données Commerciales de Blé - ${selectedCountry} (${yearRange.start} - ${yearRange.end})`,
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
        title: { display: true, text: 'Année', font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.1)' },
        title: { display: true, text: 'Valeur (1000 US$)', font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
    } : {
      x: {
        type: 'category',
        grid: { display: false },
        title: { display: true, text: 'Année', font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.1)' },
        title: {
          display: true,
          text: elementList.find(e => e.code === selectedElement)?.name.includes('Value') ? 'Valeur (1000 US$)' : 'Quantité (tonnes)',
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

  // Handle year range change with validation
  const handleYearRangeChange = (field, value) => {
    setYearRange(prev => {
      const newRange = { ...prev, [field]: value };
      if (Number(newRange.start) > Number(newRange.end)) {
        setSnackbar({ open: true, message: 'L’année de début doit être inférieure ou égale à l’année de fin', severity: 'warning' });
        return prev;
      }
      return newRange;
    });
  };

  const years = Array.from({ length: 2024 - 1991 + 1 }, (_, i) => String(1991 + i));
  const { chartData, stats } = prepareChartData();

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Erreur : {error}</Typography>;

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
          <Typography variant="h4" sx={{ color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
            Données Commerciales - Blé
          </Typography>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', bgcolor: '#fff' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
              Configurer la Visualisation
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
              <Autocomplete
                options={countryList.map(c => c.name)}
                value={selectedCountry}
                onChange={(e, newValue) => {
                  setSelectedCountry(newValue || 'Tunisia');
                  setSelectedPartners(prev => prev.filter(p => p !== newValue));
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Pays Reporteur"
                    fullWidth
                    inputProps={{ ...params.inputProps, 'aria-label': 'Sélectionner le pays reporteur' }}
                  />
                )}
                sx={{ minWidth: 200 }}
              />
              <Autocomplete
                multiple
                options={countryList.map(c => c.name).filter(name => name !== selectedCountry)}
                value={selectedPartners}
                onChange={(e, newValue) => {
                  if (newValue.length > 5) {
                    setSnackbar({ open: true, message: 'Limite de 5 pays partenaires pour la lisibilité', severity: 'warning' });
                    return;
                  }
                  setSelectedPartners(newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Pays Partenaires"
                    fullWidth
                    inputProps={{ ...params.inputProps, 'aria-label': 'Sélectionner des pays partenaires' }}
                  />
                )}
                sx={{ minWidth: 200 }}
              />
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Élément</InputLabel>
                <Select
                  value={selectedElement}
                  onChange={e => setSelectedElement(e.target.value)}
                  label="Élément"
                >
                  {elementList.map(element => (
                    <MenuItem key={element.code} value={element.code}>
                      <Tooltip title={element.description}>
                        <span>{element.name}</span>
                      </Tooltip>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Année de Début</InputLabel>
                <Select
                  value={yearRange.start}
                  onChange={e => handleYearRangeChange('start', e.target.value)}
                  label="Année de Début"
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Année de Fin</InputLabel>
                <Select
                  value={yearRange.end}
                  onChange={e => handleYearRangeChange('end', e.target.value)}
                  label="Année de Fin"
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            {lastRequestUrl && (
              <Typography variant="body2" sx={{ mt: 2, color: '#1F2937', wordBreak: 'break-all' }}>
                <strong>Requête envoyée :</strong> {lastRequestUrl}
              </Typography>
            )}
          </Paper>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', bgcolor: '#fff' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
                Analyse des Données Commerciales
              </Typography>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={exportToPDF}
                sx={{ bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
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
                        border: '1px solid #10B981',
                        bgcolor: '#fff',
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
                        border: '1px solid #E5E7EB',
                        bgcolor: 'linear-gradient(145deg, #FFFFFF, #F9FAFB)',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ color: '#1F2937', mb: 2, fontWeight: 500 }}>
                        Statistiques ({elementList.find(e => e.code === selectedElement)?.name || 'Unknown'})
                      </Typography>
                      <Stack spacing={1}>
                        <Typography sx={{ color: '#1F2937' }}>
                          Moyenne : <strong>{stats.avg} {stats.unit}</strong>
                        </Typography>
                        <Typography sx={{ color: '#1F2937' }}>
                          Maximum : <strong>{stats.max} {stats.unit}</strong>
                        </Typography>
                        <Typography sx={{ color: '#1F2937' }}>
                          Minimum : <strong>{stats.min} {stats.unit}</strong>
                        </Typography>
                        <Typography sx={{ color: '#1F2937' }}>
                          Total : <strong>{stats.total} {stats.unit}</strong>
                        </Typography>
                      </Stack>
                    </Paper>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
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
                        Données Brutes (JSON)
                      </Typography>
                      <Box
                        component="pre"
                        sx={{
                          bgcolor: '#F7FAFC',
                          p: 2,
                          borderRadius: 1,
                          maxHeight: '300px',
                          overflow: 'auto',
                          fontSize: '0.875rem',
                          color: '#1F2937',
                        }}
                      >
                        {JSON.stringify(tradeData, null, 2)}
                      </Box>
                    </Paper>
                  </motion.div>
                  <AiAnalysis aiLoading={aiLoading} aiError={aiError} aiAnalysis={aiAnalysis} />
                </Stack>
              ) : (
                <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                  Aucune donnée disponible pour {selectedCountry} avec les pays partenaires sélectionnés ({elementList.find(e => e.code === selectedElement)?.name || 'Unknown'}). Veuillez sélectionner d’autres pays ou années.
                </Typography>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Stack>
    </Box>
  );
};

export default TradeDataPage;