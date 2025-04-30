import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTradeData } from "./TradeDataContext";
import {
  Box, Typography, Stack, Button, FormControl, InputLabel, Select, MenuItem,
  Checkbox, ListItemText, OutlinedInput, Slider, Paper, Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import WheatIcon from '@mui/icons-material/Grass'; // Using Grass icon as a placeholder for wheat

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

const TradingSelectionPage = () => {
  const navigate = useNavigate();
  const { setSelectedCountry, setSelectedPartners, setSelectedElement, setYearRange } = useTradeData();

  const [reporterCountry, setReporterCountry] = useState('Tunisia');
  const [partnerCountries, setPartnerCountries] = useState(['United States of America']);
  const [element, setElement] = useState('5622');
  const [years, setYears] = useState([1991, 2022]);
  const [yearMarks, setYearMarks] = useState([]);

  useEffect(() => {
    const marks = [];
    for (let year = 1991; year <= 2022; year += 5) {
      marks.push({ value: year, label: year.toString() });
    }
    marks.push({ value: 2022, label: '2022' });
    setYearMarks(marks);
  }, []);

  const handleSubmit = () => {
    setSelectedCountry(reporterCountry);
    setSelectedPartners(partnerCountries);
    setSelectedElement(element);
    setYearRange({ start: years[0], end: years[1] });
    navigate('/dashboard/trade-wizard/chart');
  };

  return (
    <Box
      sx={{
        p: 3,
        minHeight: '100vh',
        // Adjusted gradient with fresher green and light gray tones
        background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #B0BEC5 100%)',
        // Keep the subtle wheat pattern overlay, but reduce opacity
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '2px solid #A9CBA4', // Keep the earthy green border
            bgcolor: '#FAFAFA', // Off-white with a clean look
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <WheatIcon sx={{ fontSize: 40, color: '#355E3B' }} /> {/* Update icon color to forest green */}
            <Typography
              variant="h4"
              sx={{
                color: '#355E3B', // Forest green for title
                fontWeight: 700,
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Étape 1 : Sélection des Données Agricoles
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              color: '#4A704C', // Slightly lighter green for text
              mb: 4,
              fontStyle: 'italic',
              fontFamily: '"Roboto", sans-serif',
            }}
          >
            Configurez les paramètres pour analyser les données commerciales de blé et optimiser vos décisions agricoles.
          </Typography>

          <Divider
            sx={{
              mb: 4,
              borderColor: '#A9CBA4',
              borderWidth: 1,
              borderStyle: 'dashed',
            }}
          />

          <Stack spacing={4}>
            {/* Reporter Country */}
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: '#355E3B', // Forest green for labels
                  fontWeight: 500,
                  '&.Mui-focused': { color: '#A9CBA4' },
                }}
              >
                Pays Rapporteur
              </InputLabel>
              <Select
                value={reporterCountry}
                onChange={(e) => setReporterCountry(e.target.value)}
                input={
                  <OutlinedInput
                    label="Pays Rapporteur"
                    sx={{
                      bgcolor: '#F7F9F4', // Soft green-white background
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A9CBA4',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6B9E78', // Deeper green on hover
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A9CBA4',
                      },
                    }}
                  />
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#FAFAFA', // Off-white dropdown
                      '& .MuiMenuItem-root': {
                        color: '#4A704C',
                        '&:hover': { bgcolor: '#E8F5E9' }, // Light green on hover
                      },
                    },
                  },
                }}
              >
                {countryList.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Partner Countries */}
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: '#355E3B',
                  fontWeight: 500,
                  '&.Mui-focused': { color: '#A9CBA4' },
                }}
              >
                Pays Partenaires
              </InputLabel>
              <Select
                multiple
                value={partnerCountries}
                onChange={(e) => setPartnerCountries(e.target.value)}
                input={
                  <OutlinedInput
                    label="Pays Partenaires"
                    sx={{
                      bgcolor: '#F7F9F4',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A9CBA4',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6B9E78',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A9CBA4',
                      },
                    }}
                  />
                }
                renderValue={(selected) => selected.join(', ')}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#FAFAFA',
                      '& .MuiMenuItem-root': {
                        color: '#4A704C',
                        '&:hover': { bgcolor: '#E8F5E9' },
                      },
                    },
                  },
                }}
              >
                {countryList
                  .filter((country) => country.name !== reporterCountry)
                  .map((country) => (
                    <MenuItem key={country.code} value={country.name}>
                      <Checkbox
                        checked={partnerCountries.includes(country.name)}
                        sx={{
                          color: '#A9CBA4',
                          '&.Mui-checked': { color: '#6B9E78' }, // Deeper green when checked
                        }}
                      />
                      <ListItemText primary={country.name} sx={{ color: '#4A704C' }} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Element */}
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  color: '#355E3B',
                  fontWeight: 500,
                  '&.Mui-focused': { color: '#A9CBA4' },
                }}
              >
                Élément
              </InputLabel>
              <Select
                value={element}
                onChange={(e) => setElement(e.target.value)}
                input={
                  <OutlinedInput
                    label="Élément"
                    sx={{
                      bgcolor: '#F7F9F4',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A9CBA4',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#6B9E78',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#A9CBA4',
                      },
                    }}
                  />
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#FAFAFA',
                      '& .MuiMenuItem-root': {
                        color: '#4A704C',
                        '&:hover': { bgcolor: '#E8F5E9' },
                      },
                    },
                  },
                }}
              >
                {elementList.map((elem) => (
                  <MenuItem key={elem.code} value={elem.code}>
                    {elem.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Year Range */}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: '#355E3B',
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Plage d'Années ({years[0]} - {years[1]})
              </Typography>
              <Slider
                value={years}
                onChange={(e, newValue) => setYears(newValue)}
                valueLabelDisplay="auto"
                min={1991}
                max={2022}
                marks={yearMarks}
                step={1}
                sx={{
                  color: '#A9CBA4', // Green track
                  '& .MuiSlider-thumb': {
                    bgcolor: '#6B9E78', // Deeper green thumb
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(169, 203, 164, 0.3)',
                    },
                  },
                  '& .MuiSlider-rail': {
                    bgcolor: '#E8F5E9', // Light green rail
                  },
                  '& .MuiSlider-markLabel': {
                    color: '#4A704C',
                  },
                }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: '#6B9E78', // Deeper green button
                color: '#E8F5E9', // Light green text
                fontWeight: 600,
                fontFamily: '"Roboto", sans-serif',
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: '#4A704C', // Darker green on hover
                  boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                },
              }}
            >
              Suivant : Visualiser les Données
            </Button>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default TradingSelectionPage;