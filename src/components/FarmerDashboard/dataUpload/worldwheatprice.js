import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box, Typography, Stack, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, CircularProgress,
  Paper, IconButton, Autocomplete, TextField, Tooltip,
} from '@mui/material';
import {
  Download as DownloadIcon, Add as AddIcon, Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

// Utility function to get color for datasets
const getColor = (index) => {
  const colors = [
    '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#6B7280', '#14B8A6', '#F97316', '#6366F1',
  ];
  return colors[index % colors.length];
};

// Country list based on provided data
const countryList = [
  { name: 'Afghanistan', code: '2' },
  { name: 'Africa', code: '5100' },
  { name: 'Albania', code: '3' },
  { name: 'Algeria', code: '4' },
  { name: 'Americas', code: '5200' },
  { name: 'Angola', code: '7' },
  { name: 'Argentina', code: '9' },
  { name: 'Armenia', code: '1' },
  { name: 'Asia', code: '5300' },
  { name: 'Australia', code: '10' },
  { name: 'Australia and New Zealand', code: '5501' },
  { name: 'Austria', code: '11' },
  { name: 'Azerbaijan', code: '52' },
  { name: 'Bangladesh', code: '16' },
  { name: 'Belarus', code: '57' },
  { name: 'Belgium', code: '255' },
  { name: 'Bhutan', code: '18' },
  { name: 'Bolivia (Plurinational State of)', code: '19' },
  { name: 'Bosnia and Herzegovina', code: '80' },
  { name: 'Botswana', code: '20' },
  { name: 'Brazil', code: '21' },
  { name: 'Bulgaria', code: '27' },
  { name: 'Burundi', code: '29' },
  { name: 'Cameroon', code: '32' },
  { name: 'Canada', code: '33' },
  { name: 'Central America', code: '5204' },
  { name: 'Central Asia', code: '5301' },
  { name: 'Chad', code: '39' },
  { name: 'Chile', code: '40' },
  { name: 'China', code: '351' },
  { name: 'China, Taiwan Province of', code: '214' },
  { name: 'China, mainland', code: '41' },
  { name: 'Colombia', code: '44' },
  { name: 'Croatia', code: '98' },
  { name: 'Cyprus', code: '50' },
  { name: 'Czechia', code: '167' },
  { name: 'Democratic People\'s Republic of Korea', code: '116' },
  { name: 'Democratic Republic of the Congo', code: '250' },
  { name: 'Denmark', code: '54' },
  { name: 'Eastern Africa', code: '5101' },
  { name: 'Eastern Asia', code: '5302' },
  { name: 'Eastern Europe', code: '5401' },
  { name: 'Ecuador', code: '58' },
  { name: 'Egypt', code: '59' },
  { name: 'Eritrea', code: '178' },
  { name: 'Estonia', code: '63' },
  { name: 'Eswatini', code: '209' },
  { name: 'Ethiopia', code: '238' },
  { name: 'Europe', code: '5400' },
  { name: 'European Union (27)', code: '5707' },
  { name: 'Finland', code: '67' },
  { name: 'France', code: '68' },
  { name: 'Georgia', code: '73' },
  { name: 'Germany', code: '79' },
  { name: 'Greece', code: '84' },
  { name: 'Guatemala', code: '89' },
  { name: 'Honduras', code: '95' },
  { name: 'Hungary', code: '97' },
  { name: 'India', code: '100' },
  { name: 'Iran (Islamic Republic of)', code: '102' },
  { name: 'Iraq', code: '103' },
  { name: 'Ireland', code: '104' },
  { name: 'Israel', code: '105' },
  { name: 'Italy', code: '106' },
  { name: 'Japan', code: '110' },
  { name: 'Jordan', code: '112' },
  { name: 'Kazakhstan', code: '108' },
  { name: 'Kenya', code: '114' },
  { name: 'Kuwait', code: '118' },
  { name: 'Kyrgyzstan', code: '113' },
  { name: 'Land Locked Developing Countries', code: '5802' },
  { name: 'Latvia', code: '119' },
  { name: 'Least Developed Countries', code: '5801' },
  { name: 'Lebanon', code: '121' },
  { name: 'Lesotho', code: '122' },
  { name: 'Libya', code: '124' },
  { name: 'Lithuania', code: '126' },
  { name: 'Low Income Food Deficit Countries', code: '5815' },
  { name: 'Luxembourg', code: '256' },
  { name: 'Madagascar', code: '129' },
  { name: 'Malawi', code: '130' },
  { name: 'Mali', code: '133' },
  { name: 'Malta', code: '134' },
  { name: 'Mauritania', code: '136' },
  { name: 'Melanesia', code: '5502' },
  { name: 'Mexico', code: '138' },
  { name: 'Middle Africa', code: '5102' },
  { name: 'Mongolia', code: '141' },
  { name: 'Montenegro', code: '273' },
  { name: 'Morocco', code: '143' },
  { name: 'Mozambique', code: '144' },
  { name: 'Myanmar', code: '28' },
  { name: 'Namibia', code: '147' },
  { name: 'Nepal', code: '149' },
  { name: 'Net Food Importing Developing Countries', code: '5817' },
  { name: 'Netherlands (Kingdom of the)', code: '150' },
  { name: 'New Caledonia', code: '153' },
  { name: 'New Zealand', code: '156' },
  { name: 'Niger', code: '158' },
  { name: 'Nigeria', code: '159' },
  { name: 'North Macedonia', code: '154' },
  { name: 'Northern Africa', code: '5103' },
  { name: 'Northern America', code: '5203' },
  { name: 'Northern Europe', code: '5402' },
  { name: 'Norway', code: '162' },
  { name: 'Oceania', code: '5500' },
  { name: 'Oman', code: '221' },
  { name: 'Pakistan', code: '165' },
  { name: 'Palestine', code: '299' },
  { name: 'Paraguay', code: '169' },
  { name: 'Peru', code: '170' },
  { name: 'Poland', code: '173' },
  { name: 'Portugal', code: '174' },
  { name: 'Qatar', code: '179' },
  { name: 'Republic of Korea', code: '117' },
  { name: 'Republic of Moldova', code: '146' },
  { name: 'Romania', code: '183' },
  { name: 'Russian Federation', code: '185' },
  { name: 'Rwanda', code: '184' },
  { name: 'Saudi Arabia', code: '194' },
  { name: 'Serbia', code: '272' },
  { name: 'Slovakia', code: '199' },
  { name: 'Slovenia', code: '198' },
  { name: 'Small Island Developing States', code: '5803' },
  { name: 'Somalia', code: '201' },
  { name: 'South Africa', code: '202' },
  { name: 'South America', code: '5207' },
  { name: 'South Sudan', code: '277' },
  { name: 'South-eastern Asia', code: '5304' },
  { name: 'Southern Africa', code: '5104' },
  { name: 'Southern Asia', code: '5303' },
  { name: 'Southern Europe', code: '5403' },
  { name: 'Spain', code: '203' },
  { name: 'Sudan', code: '276' },
  { name: 'Sweden', code: '210' },
  { name: 'Switzerland', code: '211' },
  { name: 'Syrian Arab Republic', code: '212' },
  { name: 'Tajikistan', code: '208' },
  { name: 'Thailand', code: '216' },
  { name: 'Tunisia', code: '222' },
  { name: 'Turkmenistan', code: '213' },
  { name: 'Türkiye', code: '223' },
  { name: 'Uganda', code: '226' },
  { name: 'Ukraine', code: '230' },
  { name: 'United Arab Emirates', code: '225' },
  { name: 'United Kingdom of Great Britain and Northern Ireland', code: '229' },
  { name: 'United Republic of Tanzania', code: '215' },
  { name: 'United States of America', code: '231' },
  { name: 'Uruguay', code: '234' },
  { name: 'Uzbekistan', code: '235' },
  { name: 'Venezuela (Bolivarian Republic of)', code: '236' },
  { name: 'Western Africa', code: '5105' },
  { name: 'Western Asia', code: '5305' },
  { name: 'Western Europe', code: '5404' },
  { name: 'World', code: '5000' },
  { name: 'Yemen', code: '249' },
  { name: 'Zambia', code: '251' },
  { name: 'Zimbabwe', code: '181' },
];

// Month list based on provided data
const monthList = [
  { code: 'all', name: 'All Months' },
  { code: '7021', name: 'Annual value' },
  { code: '7001', name: 'January' },
  { code: '7002', name: 'February' },
  { code: '7003', name: 'March' },
  { code: '7004', name: 'April' },
  { code: '7005', name: 'May' },
  { code: '7006', name: 'June' },
  { code: '7007', name: 'July' },
  { code: '7008', name: 'August' },
  { code: '7009', name: 'September' },
  { code: '7010', name: 'October' },
  { code: '7011', name: 'November' },
  { code: '7012', name: 'December' },
];

// Element list for selection
const elementList = [
  { code: '5530', name: 'Producer Price (LCU/tonne)', description: 'Prix brut des producteurs en monnaie locale par tonne.' },
  { code: '5539', name: 'Producer Price Index (2014-2016=100)', description: 'Indice des prix des producteurs, normalisé à 100 pour 2014-2016.' },
  { code: 'compare', name: 'Compare 5530 & 5539', description: 'Compare les prix bruts et l\'indice sur le même graphique.' },
];

// Utility function to format month-year label
const formatMonthYear = (monthCode, year) => {
  const month = monthList.find(m => m.code === monthCode);
  if (!month || month.code === '7021') return year;
  return `${month.name.substring(0, 3)} ${year}`;
};

const MarketValuesPage = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedCountry, setSelectedCountry] = useState('Tunisia');
  const [selectedMonth, setSelectedMonth] = useState('7021'); // Default to Annual value
  const [selectedElement, setSelectedElement] = useState('5530'); // Default to Producer Price
  const [yearRange, setYearRange] = useState({ start: '1991', end: '2024' });

  // Debounced fetch function to avoid rapid API calls
  const fetchMarketData = useCallback(async () => {
    setLoading(true);
    try {
      const selectedCountryCode = countryList.find(c => c.name === selectedCountry)?.code || '222';
      const response = await axios.get(
        `https://faostatservices.fao.org/api/v1/en/data/PP?area=${selectedCountryCode}&area_cs=M49&element=5530,5539&item=15&item_cs=CPC&year=1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024&month=7021,7001,7002,7003,7004,7005,7006,7007,7008,7009,7010,7011,7012&show_codes=true&show_unit=true&show_flags=true&show_notes=true&null_values=false&page_size=100&output_type=objects`,
        { withCredentials: false } // Avoid CORS issue
      );
      setMarketData(response.data.data);
    } catch (err) {
      setError('Erreur lors de la récupération des données');
      setSnackbar({ open: true, message: 'Erreur lors de la récupération des données pour ce pays', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [selectedCountry]);

  // Fetch data when country changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchMarketData();
    }, 300); // 300ms debounce
    return () => clearTimeout(debounceTimeout);
  }, [fetchMarketData]);

  // Calculate difference between 5530 and 5539
  const calculateDifference = (data5530, data5539) => {
    const differences = [];
    data5530.forEach(entry5530 => {
      const matchingEntry5539 = data5539.find(
        entry5539 => entry5539['Year'] === entry5530['Year'] && entry5539['Months Code'] === entry5530['Months Code']
      );
      if (matchingEntry5539) {
        const price = Number(entry5530['Value']) || 0;
        const index = Number(matchingEntry5539['Value']) || 100; // Default to 100 if index is missing
        // Normalize price by index (price adjusted to 2014-2016 base)
        const normalizedPrice = (price / index) * 100;
        differences.push({
          year: entry5530['Year'],
          monthCode: entry5530['Months Code'],
          price: price,
          index: index,
          normalizedPrice: normalizedPrice,
          difference: price - normalizedPrice, // Absolute difference
        });
      }
    });
    return differences;
  };

  // Prepare chart data
  const prepareChartData = () => {
    let filteredData = marketData
      .filter(entry => entry['Area'] === selectedCountry)
      .filter(entry => Number(entry['Year']) >= Number(yearRange.start) && Number(entry['Year']) <= Number(yearRange.end))
      .filter(entry => selectedMonth === 'all' ? entry['Months Code'] !== '7021' : entry['Months Code'] === selectedMonth);

    // Sort data for "All Months" to ensure chronological order
    if (selectedMonth === 'all') {
      filteredData.sort((a, b) => {
        const yearA = Number(a['Year']);
        const yearB = Number(b['Year']);
        const monthA = a['Months Code'];
        const monthB = b['Months Code'];
        if (yearA === yearB) return monthA.localeCompare(monthB);
        return yearA - yearB;
      });
    }

    // Handle comparison mode
    let datasets = [];
    let labels = [];
    let differenceData = [];

    if (selectedElement === 'compare') {
      const data5530 = filteredData.filter(entry => entry['Element Code'] === '5530');
      const data5539 = filteredData.filter(entry => entry['Element Code'] === '5539');
      differenceData = calculateDifference(data5530, data5539);

      datasets = [
        {
          label: 'Producer Price (LCU/tonne)',
          data: data5530.map(entry => Number(entry['Value']) || 0),
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
          label: 'Producer Price Index (2014-2016=100)',
          data: data5539.map(entry => Number(entry['Value']) || 0),
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
          yAxisID: 'y1',
        },
      ];
      labels = data5530.map(entry => selectedMonth === 'all' ? formatMonthYear(entry['Months Code'], entry['Year']) : entry['Year']);
    } else {
      filteredData = filteredData.filter(entry => entry['Element Code'] === selectedElement);
      datasets = [
        {
          label: elementList.find(e => e.code === selectedElement)?.name || 'Unknown',
          data: filteredData.map(entry => Number(entry['Value']) || 0),
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
        },
      ];
      labels = filteredData.map(entry => selectedMonth === 'all' ? formatMonthYear(entry['Months Code'], entry['Year']) : entry['Year']);
    }

    const chartData = { labels, datasets };

    // Calculate stats
    const values = filteredData.map(entry => Number(entry['Value']) || 0);
    const stats = {
      avg: values.length ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2) : '0',
      max: values.length ? Math.max(...values).toFixed(2) : '0',
      min: values.length ? Math.min(...values).toFixed(2) : '0',
      total: values.length ? values.reduce((sum, v) => sum + v, 0).toFixed(2) : '0',
      unit: selectedElement === '5530' ? 'LCU/tonne' : selectedElement === '5539' ? 'Index (2014-2016=100)' : '',
    };

    return { chartData, stats, differenceData };
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
        text: `Prix des Producteurs de Blé - ${selectedCountry} (${selectedMonth === 'all' ? 'All Months' : (monthList.find(m => m.code === selectedMonth)?.name || 'Unknown')}, ${yearRange.start} - ${yearRange.end})`,
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
            const unit = dataset.label.includes('Index') ? 'Index (2014-2016=100)' : 'LCU/tonne';
            return `${dataset.label}: ${raw} ${unit}`;
          },
        },
      },
    },
    scales: selectedElement === 'compare' ? {
      x: {
        type: 'category',
        grid: { display: false },
        title: {
          display: true,
          text: selectedMonth === 'all' ? 'Mois et Année' : 'Année',
          font: { size: 14, family: 'Roboto' },
          color: '#1F2937',
        },
        ticks: {
          color: '#1F2937',
          maxRotation: selectedMonth === 'all' ? 45 : 0,
          minRotation: selectedMonth === 'all' ? 45 : 0,
        },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.1)' },
        title: { display: true, text: 'Prix (LCU/tonne)', font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
      y1: {
        position: 'right',
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Indice (2014-2016=100)', font: { size: 14, family: 'Roboto' }, color: '#1F2937' },
        ticks: { color: '#1F2937' },
      },
    } : {
      x: {
        type: 'category',
        grid: { display: false },
        title: {
          display: true,
          text: selectedMonth === 'all' ? 'Mois et Année' : 'Année',
          font: { size: 14, family: 'Roboto' },
          color: '#1F2937',
        },
        ticks: {
          color: '#1F2937',
          maxRotation: selectedMonth === 'all' ? 45 : 0,
          minRotation: selectedMonth === 'all' ? 45 : 0,
        },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.1)' },
        title: {
          display: true,
          text: selectedElement === '5530' ? 'Prix (LCU/tonne)' : 'Indice (2014-2016=100)',
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

      pdf.save(`market_values_${selectedCountry}_wheat_${selectedMonth === 'all' ? 'all_months' : (monthList.find(m => m.code === selectedMonth)?.name || 'unknown')}_${selectedElement}.pdf`);
    });
  };

  // Handle year range change
  const handleYearRangeChange = (field, value) => {
    setYearRange(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Prepare years for selection
  const years = Array.from({ length: 2024 - 1991 + 1 }, (_, i) => String(1991 + i));

  const { chartData, stats, differenceData } = prepareChartData();

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
            Valeurs du Marché - Prix des Producteurs (Blé)
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
                onChange={(e, newValue) => setSelectedCountry(newValue || 'Tunisia')}
                renderInput={params => (
                  <TextField {...params} label="Pays" fullWidth />
                )}
                sx={{ minWidth: 200 }}
              />
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Mois</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  label="Mois"
                >
                  {monthList.map(month => (
                    <MenuItem key={month.code} value={month.code}>{month.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          </Paper>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', bgcolor: '#fff' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#1F2937', fontWeight: 600, fontFamily: 'Poppins' }}>
                Analyse des Prix du Blé
              </Typography>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={exportToPDF}
                sx={{ bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
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
                      <Box sx={{ height: 450 }}>
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
                  {differenceData.length > 0 && selectedElement === 'compare' && (
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
                          Différence entre Prix et Indice
                        </Typography>
                        <Stack spacing={1}>
                          {differenceData.map((diff, index) => (
                            <Typography key={index} sx={{ color: '#1F2937' }}>
                              {selectedMonth === 'all' ? formatMonthYear(diff.monthCode, diff.year) : diff.year} : 
                              Prix = {diff.price.toFixed(2)} LCU/tonne, 
                              Indice = {diff.index.toFixed(2)}, 
                              Prix normalisé = {diff.normalizedPrice.toFixed(2)} LCU/tonne, 
                              Différence = {diff.difference.toFixed(2)} LCU/tonne
                            </Typography>
                          ))}
                        </Stack>
                      </Paper>
                    </motion.div>
                  )}
                </Stack>
              ) : (
                <Typography sx={{ color: '#1F2937', textAlign: 'center' }}>
                  Aucune donnée disponible pour {selectedCountry} ({selectedMonth === 'all' ? 'All Months' : (monthList.find(m => m.code === selectedMonth)?.name || 'Unknown')}, {elementList.find(e => e.code === selectedElement)?.name || 'Unknown'}). Veuillez sélectionner un autre pays, mois, ou élément.
                </Typography>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Stack>
    </Box>
  );
};

export default MarketValuesPage;