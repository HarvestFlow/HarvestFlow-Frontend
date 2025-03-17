// ProfileActivationDialog.jsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Styles personnalisés avec styled
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e0e0e0',
    overflow: 'hidden',
    width: '400px',
    maxWidth: '90vw',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: '#40916c',
  color: 'white',
  textAlign: 'center',
  padding: '15px 20px',
  fontSize: '24px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '20px 30px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#40916c',
  color: 'white',
  padding: '10px 25px',
  borderRadius: '25px',
  fontSize: '16px',
  fontWeight: '600',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(64, 145, 108, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#2d6a4f',
    boxShadow: '0 6px 18px rgba(64, 145, 108, 0.5)',
    transform: 'translateY(-2px)',
  },
}));

const ProfileActivationDialog = ({ open, onClose }) => {
  const handleRedirect = () => {
    window.location.href = 'http://localhost:3000/UpdateFarmerProfile';
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="profile-activation-dialog-title"
      aria-describedby="profile-activation-dialog-description"
    >
      <StyledDialogTitle id="profile-activation-dialog-title">
        <WarningAmberIcon sx={{ fontSize: 30 }} />
        Profil non activé
      </StyledDialogTitle>
      <StyledDialogContent>
        <Typography
          id="profile-activation-dialog-description"
          variant="body1"
          sx={{
            color: '#333',
            fontSize: '16px',
            lineHeight: '1.5',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Votre profil n'est pas encore activé. Mettez à jour vos informations pour débloquer toutes les fonctionnalités !
        </Typography>
      </StyledDialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '20px' }}>
        <StyledButton onClick={handleRedirect}>
          Mettre à jour maintenant
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ProfileActivationDialog;