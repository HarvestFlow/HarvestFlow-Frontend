// src/components/GestionUser.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  CircularProgress,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Sidebar from '../SideNavBar/SideNavBar';

const GestionUser = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // sm = 600px

  // Récupérer les informations de l'utilisateur connecté
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

  // Récupérer la liste de tous les utilisateurs
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

  // Charger les données au montage
  useEffect(() => {
    const loadData = async () => {
      await fetchLoggedInUser();
      await fetchUsers();
      setLoading(false);
    };
    loadData();
  }, []);

  // Mettre à jour le statut isActivated d'un utilisateur
  const handleActivationToggle = async (userId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await axios.put(
        `http://localhost:5000/user/update/${userId}`,
        { isActivated: updatedStatus },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000,
        }
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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal à droite */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress sx={{ color: '#40916c' }} />
            <Typography sx={{ mt: 2, color: '#333' }}>Chargement des utilisateurs...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#fee2e2', borderRadius: '8px', textAlign: 'center' }}>
            <Typography sx={{ color: '#dc2626', fontSize: '16px', fontWeight: '500' }}>
              Erreur: {error}
            </Typography>
            <Button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchLoggedInUser().then(() => fetchUsers()).finally(() => setLoading(false));
              }}
              variant="contained"
              sx={{ mt: 2, backgroundColor: '#40916c', '&:hover': { backgroundColor: '#2d6a4f' } }}
            >
              Réessayer
            </Button>
          </Box>
        ) : !loggedInUserId ? (
          <Box sx={{ maxWidth: '600px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
            <Typography sx={{ color: '#333', fontSize: '18px' }}>
              Veuillez vous connecter pour accéder à la gestion des utilisateurs.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: '20px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '15px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                color: '#2d6a4f',
                mb: 4,
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Gestion des utilisateurs
            </Typography>
            {!isAdmin && (
              <Typography sx={{ textAlign: 'center', color: '#dc2626', mb: 2 }}>
                Seuls les administrateurs peuvent modifier le statut des utilisateurs.
              </Typography>
            )}

            {/* Affichage responsive : Tableau sur grands écrans, cartes sur mobile */}
            {isMobile ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {users.map((user) => (
                  <Card
                    key={user._id}
                    sx={{
                      borderRadius: '10px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      backgroundColor: '#fff',
                      '&:hover': { backgroundColor: '#f0f4f8' },
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: '600', color: '#333' }}>
                        ID: {user._id}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                        Email: {user.email || 'N/A'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Switch
                          checked={user.isActivated}
                          onChange={() => handleActivationToggle(user._id, user.isActivated)}
                          color="primary"
                          disabled={!isAdmin}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#40916c' },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#74c69d' },
                          }}
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {user.isActivated ? 'Activé' : 'Désactivé'}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#555', mt: '5px' }}>
                        Certification actuelle :{' '}
                        {user.certification ? (
                          <Button
                            variant="outlined"
                            size="small"
                            href={`http://localhost:5000/${user.certification}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: '#40916c',
                              borderColor: '#40916c',
                              textTransform: 'none',
                              fontWeight: '500',
                              '&:hover': {
                                backgroundColor: '#e6f0ea',
                                borderColor: '#2d6a4f',
                                color: '#2d6a4f',
                              },
                            }}
                          >
                            Voir Certification
                          </Button>
                        ) : (
                          'Aucune certification'
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  overflowX: 'auto',
                }}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#40916c' }}>
                      <TableCell
                        sx={{ color: 'white', fontWeight: '600', minWidth: 150, whiteSpace: 'nowrap' }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{ color: 'white', fontWeight: '600', minWidth: 200, whiteSpace: 'nowrap' }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{ color: 'white', fontWeight: '600', minWidth: 100, whiteSpace: 'nowrap' }}
                      >
                        Activé
                      </TableCell>
                      <TableCell
                        sx={{ color: 'white', fontWeight: '600', minWidth: 100, whiteSpace: 'nowrap' }}
                      >
                        Action
                      </TableCell>
                      <TableCell
                        sx={{ color: 'white', fontWeight: '600', minWidth: 200, whiteSpace: 'nowrap' }}
                      >
                        Certification
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user._id}
                        sx={{ '&:hover': { backgroundColor: '#f0f4f8' }, transition: 'background-color 0.3s' }}
                      >
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}
                        >
                          {user._id}
                        </TableCell>
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}
                        >
                          {user.email || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={user.isActivated}
                            onChange={() => handleActivationToggle(user._id, user.isActivated)}
                            color="primary"
                            disabled={!isAdmin}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': { color: '#40916c' },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#74c69d' },
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          {user.isActivated ? 'Activé' : 'Désactivé'}
                        </TableCell>
                        <TableCell
                          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}
                        >
                          {user.certification ? (
                            <Button
                              variant="outlined"
                              size="small"
                              href={`http://localhost:5000/${user.certification}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: '#40916c',
                                borderColor: '#40916c',
                                textTransform: 'none',
                                fontWeight: '500',
                                '&:hover': {
                                  backgroundColor: '#e6f0ea',
                                  borderColor: '#2d6a4f',
                                  color: '#2d6a4f',
                                },
                              }}
                            >
                              Voir Certification
                            </Button>
                          ) : (
                            'Aucune certification'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GestionUser;