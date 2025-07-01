import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Alert, Fade } from '@mui/material';
import axios from 'axios';

const TransactionForm = ({ userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    description: '',
    account: '',
    type: '',
    amount: '',
    currency: 'EUR',
    reference: '',
    userId: userId || '',
  });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const accounts = [
    'Vente de produits agricoles',
    'Achat d’intrants',
    'Main-d’œuvre',
    'Frais de transport',
    'Commissions',
    'Services externes',
  ];

  const suggestAccount = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('vente') || desc.includes('produit') || desc.includes('tomates') || desc.includes('récolte')) {
      return 'Vente de produits agricoles';
    } else if (desc.includes('engrais') || desc.includes('semences') || desc.includes('intrants')) {
      return 'Achat d’intrants';
    } else if (desc.includes('salaire') || desc.includes('ouvrier')) {
      return 'Main-d’œuvre';
    } else if (desc.includes('transport') || desc.includes('livraison')) {
      return 'Frais de transport';
    } else if (desc.includes('commission')) {
      return 'Commissions';
    } else if (desc.includes('service') || desc.includes('consultant')) {
      return 'Services externes';
    }
    return formData.account;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    if (name === 'description') {
      newFormData.account = suggestAccount(value);
    }
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/transaction/transactions', formData);
      setNotification({ open: true, message: 'Transaction ajoutée avec succès !', severity: 'success' });
      onSuccess();
      setFormData({
        description: '',
        account: '',
        type: '',
        amount: '',
        currency: 'EUR',
        reference: '',
        userId: formData.userId,
      });
      setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || 'Échec de l’ajout',
        severity: 'error',
      });
      setTimeout(() => setNotification({ open: false, message: '', severity: 'success' }), 3000);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Fade in={notification.open}>
        <Alert severity={notification.severity} sx={{ mb: 2 }}>
          {notification.message}
        </Alert>
      </Fade>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#2e7d32' },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Compte"
            name="account"
            value={formData.account}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#2e7d32' },
              },
            }}
          >
            {accounts.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#2e7d32' },
              },
            }}
          >
            <MenuItem value="Recette">Recette</MenuItem>
            <MenuItem value="Dépense">Dépense</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Montant (€)"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#2e7d32' },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Devise"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#2e7d32' },
              },
            }}
          >
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="TND">TND</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Référence (ex. FACT-001)"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#2e7d32' },
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
              transition: 'all 0.3s',
              '&:hover': {
                background: 'linear-gradient(45deg, #1b5e20 30%, #2e7d32 90%)',
                transform: 'scale(1.05)',
              },
            }}
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionForm;