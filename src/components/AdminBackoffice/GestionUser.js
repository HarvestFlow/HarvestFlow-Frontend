import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Switch, CircularProgress, Typography, Box, Button, Card,
  CardContent, useMediaQuery, useTheme, Fade, Grow, Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';

const GestionUser = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Fetch functions remain unchanged
  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/getProfile', {
        withCredentials: true,
        timeout: 5000,
      });
      setLoggedInUserId(response.data._id);
      setIsAdmin(response.data.isAdmin || true);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la récupération du profil');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/getAllUsers', {
        withCredentials: true,
        timeout: 5000,
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la récupération des utilisateurs');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchLoggedInUser();
      await fetchUsers();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleActivationToggle = async (userId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await axios.put(
        `http://localhost:5000/user/update/${userId}`,
        { isActivated: updatedStatus },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' }, timeout: 5000 }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActivated: response.data.isActivated } : user
        )
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', p: 4 }}>
      {loading ? (
        <Fade in={loading}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress sx={{ color: '#2e7d32' }} size={60} thickness={5} />
            <Typography sx={{ mt: 3, color: '#2e7d32', fontWeight: 500, fontSize: '1.2rem' }}>
              Chargement des utilisateurs...
            </Typography>
          </Box>
        </Fade>
      ) : error ? (
        <Grow in={true}>
          <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 3, bgcolor: '#ffcdd2', borderRadius: 2, textAlign: 'center' }}>
            <Typography sx={{ color: '#c62828', fontWeight: 600 }}>{error}</Typography>
            <Button
              onClick={() => { setError(null); setLoading(true); fetchLoggedInUser().then(() => fetchUsers()).finally(() => setLoading(false)); }}
              variant="contained"
              sx={{ mt: 2, bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
            >
              Réessayer
            </Button>
          </Box>
        </Grow>
      ) : !loggedInUserId ? (
        <Typography sx={{ color: '#2e7d32', textAlign: 'center', mt: 8, fontSize: '1.5rem' }}>
          Veuillez vous connecter pour gérer les utilisateurs
        </Typography>
      ) : (
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
          <Typography
            variant="h3"
            sx={{
              color: '#2e7d32',
              textAlign: 'center',
              mb: 4,
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(46, 125, 50, 0.3)'
            }}
          >
            Gestion des Utilisateurs
          </Typography>
          {!isAdmin && (
            <Typography sx={{ textAlign: 'center', color: '#ef5350', mb: 3, fontStyle: 'italic' }}>
              Mode lecture seule - Réservé aux administrateurs
            </Typography>
          )}

          {isMobile ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {users.map((user, index) => (
                <motion.div key={user._id} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}>
                  <Card
                    sx={{
                      bgcolor: '#ffffff',
                      border: '1px solid #c8e6c9',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.1)',
                      '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s', boxShadow: '0 6px 16px rgba(46, 125, 50, 0.2)' }
                    }}
                  >
                    <CardContent sx={{ color: '#2e7d32' }}>
                      <Typography sx={{ fontWeight: 600 }}>ID: {user._id.slice(0, 8)}...</Typography>
                      <Typography sx={{ mt: 1 }}>Email: {user.email || 'N/A'}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Tooltip title={isAdmin ? '' : 'Réservé aux admins'}>
                          <Switch
                            checked={user.isActivated}
                            onChange={() => handleActivationToggle(user._id, user.isActivated)}
                            disabled={!isAdmin}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': { color: '#4caf50' },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#81c784' }
                            }}
                          />
                        </Tooltip>
                        <Typography sx={{ ml: 1, color: user.isActivated ? '#4caf50' : '#ef5350' }}>
                          {user.isActivated ? 'Actif' : 'Inactif'}
                        </Typography>
                      </Box>
                      <Typography sx={{ mt: 1 }}>
                        Certification:{' '}
                        {user.certification ? (
                          <Button
                            href={`http://localhost:5000/${user.certification}`}
                            target="_blank"
                            sx={{ color: '#2e7d32', '&:hover': { color: '#1b5e20' } }}
                          >
                            Voir
                          </Button>
                        ) : (
                          'Aucune'
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                bgcolor: '#ffffff',
                borderRadius: 2,
                border: '1px solid #c8e6c9',
                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.1)'
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#dcedc8' }}>
                    {['ID', 'Email', 'Statut', 'Action', 'Certification'].map((header) => (
                      <TableCell key={header} sx={{ color: '#2e7d32', fontWeight: 600 }}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TableCell sx={{ color: '#2e7d32' }}>{user._id.slice(0, 8)}...</TableCell>
                      <TableCell sx={{ color: '#2e7d32' }}>{user.email || 'N/A'}</TableCell>
                      <TableCell>
                        <Switch
                          checked={user.isActivated}
                          onChange={() => handleActivationToggle(user._id, user.isActivated)}
                          disabled={!isAdmin}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#4caf50' },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#81c784' }
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: user.isActivated ? '#4caf50' : '#ef5350' }}>
                        {user.isActivated ? 'Actif' : 'Inactif'}
                      </TableCell>
                      <TableCell>
                        {user.certification ? (
                          <Button
                            href={`http://localhost:5000/${user.certification}`}
                            target="_blank"
                            sx={{ color: '#2e7d32', '&:hover': { color: '#1b5e20' } }}
                          >
                            Voir
                          </Button>
                        ) : (
                          <Typography sx={{ color: '#2e7d32' }}>Aucune</Typography>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GestionUser;