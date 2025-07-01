import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Switch, CircularProgress, Typography, Box, Button, Card,
  CardContent, useMediaQuery, useTheme, Fade, Grow, Tooltip, Modal,
  TextField, FormControl, InputLabel, Select, MenuItem, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar
} from '@mui/material';
import { motion } from 'framer-motion';
import { Delete, Edit } from '@mui/icons-material';

const GestionUser = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'farmer',
    phone: '',
    companyname: '',
    country: '',
    address: '',
  });
  const [editUser, setEditUser] = useState({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    isActivated: false,
    companyname: '',
    country: '',
    address: '',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const validRoles = ['farmer', 'distributor', 'transporter', 'admin', 'superAdmin'];

  // Fetch functions
  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/getProfile', {
        withCredentials: true,
        timeout: 5000,
      });
      console.log('Authenticated user:', { id: response.data._id, role: response.data.role, email: response.data.email });
      setLoggedInUserId(response.data._id);
      setUserRole(response.data.role);
      setIsAdmin(response.data.role === 'admin' || response.data.role === 'superAdmin');
    } catch (err) {
      console.error('Error fetching user profile:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Erreur lors de la récupération du profil');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/getAllUsers', {
        withCredentials: true,
        timeout: 5000,
      });
      console.log('Fetched users:', response.data);
      setUsers(
        response.data.map((user) => ({
          ...user,
          firstname: user.firstname !== undefined && user.firstname !== null ? user.firstname : 'N/A',
          lastname: user.lastname !== undefined && user.lastname !== null ? user.lastname : 'N/A',
          email: user.email !== undefined && user.email !== null ? user.email : 'N/A',
          role: user.role !== undefined && user.role !== null ? user.role : 'N/A',
          isActivated: user.isActivated ?? false,
          companyname: user.companyname !== undefined && user.companyname !== null ? user.companyname : 'N/A',
          country: user.country !== undefined && user.country !== null ? user.country : 'N/A',
          address: user.address !== undefined && user.address !== null ? user.address : 'N/A',
          certification: user.certification !== undefined && user.certification !== null ? user.certification : null,
        }))
      );
    } catch (err) {
      console.error('Error fetching users:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
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

  // Handle activation toggle
  const handleActivationToggle = async (userId, currentStatus) => {
    if (!isAdmin) {
      setError('Seul un administrateur peut modifier le statut d\'activation');
      return;
    }
    setActionLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/user/update/${userId}`,
        { isActivated: !currentStatus },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' }, timeout: 5000 }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActivated: response.data.isActivated } : user
        )
      );
      setSuccess('Statut d\'activation mis à jour avec succès');
      setError(null);
    } catch (err) {
      console.error('Error during activation toggle:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour de l\'activation');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle add user
  const handleAddUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAdmin) {
      setError('Seul un administrateur peut ajouter un utilisateur');
      return;
    }

    if (!newUser.firstname || !newUser.email || !newUser.password || !newUser.phone) {
      setError('Veuillez remplir tous les champs obligatoires (Prénom, Email, Mot de passe, Téléphone)');
      return;
    }
    if (!validRoles.includes(newUser.role)) {
      setError('Rôle invalide sélectionné');
      return;
    }

    setActionLoading(true);
    try {
      const payload = {
        firstname: newUser.firstname,
        lastname: newUser.lastname || '',
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        phone: newUser.phone,
        companyname: newUser.companyname || 'N/A',
        country: newUser.country || 'N/A',
        address: newUser.address || 'N/A',
        productionType: newUser.role === 'farmer' ? ['default'] : [],
        productionMethod: newUser.role === 'farmer' ? ['default'] : [],
        buisnessType: newUser.role === 'distributor' ? 'default' : undefined,
        volumeApprovisionnement: newUser.role === 'distributor' ? 'default' : undefined,
      };
      console.log('JSON payload:', payload);

      const axiosConfig = {
        method: 'post',
        url: 'http://localhost:5000/user',
        data: payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        timeout: 5000,
      };
      console.log('Axios request config:', axiosConfig);

      const response = await axios(axiosConfig);

      setUsers([...users, {
        ...response.data.user,
        firstname: response.data.user.firstname || 'N/A',
        lastname: response.data.user.lastname || 'N/A',
        email: response.data.user.email || 'N/A',
        role: response.data.user.role || 'N/A',
        isActivated: response.data.user.isActivated ?? false,
        companyname: response.data.user.companyname || 'N/A',
        country: response.data.user.country || 'N/A',
        address: response.data.user.address || 'N/A',
        certification: response.data.user.certification || null,
      }]);
      setOpenAddModal(false);
      setNewUser({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'farmer',
        phone: '',
        companyname: '',
        country: '',
        address: '',
      });
      setSuccess('Utilisateur ajouté avec succès');
      setError(null);
    } catch (err) {
      console.error('Error during user creation:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Erreur lors de l\'ajout de l\'utilisateur');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!isAdmin) {
      setError('Seul un administrateur peut supprimer un utilisateur');
      console.log('Deletion blocked: User is not admin', { userId: loggedInUserId, role: userRole });
      return;
    }
    setActionLoading(true);
    try {
      console.log('Deleting user with ID:', deleteUserId, 'by user:', { id: loggedInUserId, role: userRole });
      const axiosConfig = {
        method: 'delete',
        url: `http://localhost:5000/user/${deleteUserId}`,
        withCredentials: true,
        timeout: 5000,
      };
      console.log('Axios delete config:', axiosConfig);

      const response = await axios(axiosConfig);
      setUsers(users.filter((user) => user._id !== deleteUserId));
      setSuccess('Utilisateur supprimé avec succès');
      setError(null);
      console.log('Deletion successful:', response.data);
    } catch (err) {
      console.error('Error during user deletion:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        stack: err.stack,
        userId: loggedInUserId,
        userRole: userRole,
      });
      const errorMessage = err.response?.status === 403
        ? 'Action non autorisée : seul un administrateur peut supprimer un utilisateur'
        : err.response?.data?.message === 'Error deleting user'
        ? 'Impossible de supprimer l\'utilisateur. Problème avec l\'historique du compte administrateur.'
        : err.response?.data?.message || 'Erreur lors de la suppression de l\'utilisateur';
      setError(errorMessage);
    } finally {
      setActionLoading(false);
      setOpenDeleteDialog(false);
      setDeleteUserId(null);
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialogWithId = (userId) => {
    if (!isAdmin) {
      setError('Seul un administrateur peut supprimer un utilisateur');
      console.log('Deletion blocked: User is not admin', { userId: loggedInUserId, role: userRole });
      return;
    }
    setDeleteUserId(userId);
    setOpenDeleteDialog(true);
  };

  // Handle edit user
  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      setError('Seul un administrateur peut modifier un utilisateur');
      return;
    }
    setActionLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/user/${editUser.id}`,
        {
          firstname: editUser.firstname,
          lastname: editUser.lastname,
          email: editUser.email,
          role: editUser.role,
          isActivated: editUser.isActivated,
          companyname: editUser.companyname,
          country: editUser.country,
          address: editUser.address,
        },
        { withCredentials: true, timeout: 5000 }
      );
      setUsers(
        users.map((user) =>
          user._id === editUser.id ? {
            ...response.data.user,
            firstname: response.data.user.firstname || 'N/A',
            lastname: response.data.user.lastname || 'N/A',
            email: response.data.user.email || 'N/A',
            role: response.data.user.role || 'N/A',
            isActivated: response.data.user.isActivated ?? false,
            companyname: response.data.user.companyname || 'N/A',
            country: response.data.user.country || 'N/A',
            address: response.data.user.address || 'N/A',
            certification: response.data.user.certification || null,
          } : user
        )
      );
      setOpenEditModal(false);
      setSuccess('Utilisateur modifié avec succès');
      setError(null);
    } catch (err) {
      console.error('Error during user edit:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(err.response?.data?.message || 'Erreur lors de la modification de l\'utilisateur');
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal with user data
  const openEditModalWithData = (user) => {
    if (!isAdmin) {
      setError('Seul un administrateur peut modifier un utilisateur');
      return;
    }
    setEditUser({
      id: user._id,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email || '',
      role: user.role || 'farmer',
      isActivated: user.isActivated ?? false,
      companyname: user.companyname || '',
      country: user.country || '',
      address: user.address || '',
    });
    setOpenEditModal(true);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.3 : 0.5 } }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', p: 4, position: 'relative' }}>
      {/* Action Loading Overlay */}
      {actionLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}
        >
          <CircularProgress sx={{ color: '#4caf50' }} size={60} thickness={5} />
        </Box>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      {error && (
        <Grow in={true}>
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
          >
            {error}
          </Alert>
        </Grow>
      )}

      {loading ? (
        <Fade in={loading}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress sx={{ color: '#2e7d32' }} size={60} thickness={5} />
            <Typography sx={{ mt: 3, color: '#2e7d32', fontWeight: 500, fontSize: '1.2rem' }}>
              Chargement des utilisateurs...
            </Typography>
          </Box>
        </Fade>
      ) : !loggedInUserId ? (
        <Typography sx={{ color: '#2e7d32', textAlign: 'center', mt: 8, fontSize: '1.5rem' }}>
          Veuillez vous connecter pour gérer les utilisateurs
        </Typography>
      ) : (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Typography
            variant="h3"
            sx={{
              color: '#2e7d32',
              textAlign: 'center',
              mb: 4,
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(46, 125, 50, 0.3)',
            }}
          >
            Gestion des Utilisateurs
          </Typography>
          {!isAdmin && (
            <Typography sx={{ textAlign: 'center', color: '#ef5350', mb: 3, fontStyle: 'italic' }}>
              Mode lecture seule - Réservé aux administrateurs
            </Typography>
          )}
          {isAdmin && (
            <Button
              variant="contained"
              sx={{ mb: 3, bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' }, fontWeight: 600 }}
              onClick={() => setOpenAddModal(true)}
              disabled={actionLoading}
            >
              Ajouter un utilisateur
            </Button>
          )}

          {/* Add User Modal */}
          <Modal
            open={openAddModal}
            onClose={() => setOpenAddModal(false)}
            aria-labelledby="add-user-modal-title"
            aria-describedby="add-user-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                width: { xs: '90%', sm: '80%', md: 500 },
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <Typography id="add-user-modal-title" variant="h5" sx={{ mb: 3, color: '#2e7d32', fontWeight: 600 }}>
                Ajouter un utilisateur
              </Typography>
              <Box id="add-user-modal-description" sx={{ display: 'none' }}>
                Formulaire pour ajouter un nouvel utilisateur avec des champs pour le prénom, nom, email, mot de passe, téléphone, entreprise, pays, adresse et rôle.
              </Box>
              <form onSubmit={handleAddUser}>
                <TextField
                  label="Prénom"
                  fullWidth
                  margin="normal"
                  value={newUser.firstname}
                  onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
                  required
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Nom"
                  fullWidth
                  margin="normal"
                  value={newUser.lastname}
                  onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Mot de passe"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Téléphone"
                  fullWidth
                  margin="normal"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  required
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Nom de l'entreprise"
                  fullWidth
                  margin="normal"
                  value={newUser.companyname}
                  onChange={(e) => setNewUser({ ...newUser, companyname: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Pays"
                  fullWidth
                  margin="normal"
                  value={newUser.country}
                  onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Adresse"
                  fullWidth
                  margin="normal"
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <FormControl fullWidth margin="normal" sx={{ mb: { xs: 3, sm: 2 } }}>
                  <InputLabel>Rôle</InputLabel>
                  <Select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    required
                  >
                    <MenuItem value="farmer">Farmer</MenuItem>
                    <MenuItem value="distributor">Distributor</MenuItem>
                    <MenuItem value="transporter">Transporter</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="superAdmin">SuperAdmin</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#4caf50',
                      '&:hover': { bgcolor: '#388e3c' },
                      flex: 1,
                      py: { xs: 1.5, sm: 1 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                    disabled={actionLoading}
                  >
                    Ajouter
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: '#2e7d32',
                      borderColor: '#2e7d32',
                      '&:hover': { borderColor: '#1b5e20' },
                      flex: 1,
                      py: { xs: 1.5, sm: 1 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                    onClick={() => setOpenAddModal(false)}
                    disabled={actionLoading}
                  >
                    Annuler
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>

          {/* Edit User Modal */}
          <Modal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            aria-labelledby="edit-user-modal-title"
            aria-describedby="edit-user-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                width: { xs: '90%', sm: '80%', md: 500 },
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <Typography id="edit-user-modal-title" variant="h5" sx={{ mb: 3, color: '#2e7d32', fontWeight: 600 }}>
                Modifier l'utilisateur
              </Typography>
              <Box id="edit-user-modal-description" sx={{ display: 'none' }}>
                Formulaire pour modifier les informations d'un utilisateur, y compris le prénom, nom, email, rôle, statut d'activation, entreprise, pays et adresse.
              </Box>
              <form onSubmit={handleEditUser}>
                <TextField
                  label="Prénom"
                  fullWidth
                  margin="normal"
                  value={editUser.firstname}
                  onChange={(e) => setEditUser({ ...editUser, firstname: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Nom"
                  fullWidth
                  margin="normal"
                  value={editUser.lastname}
                  onChange={(e) => setEditUser({ ...editUser, lastname: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Nom de l'entreprise"
                  fullWidth
                  margin="normal"
                  value={editUser.companyname}
                  onChange={(e) => setEditUser({ ...editUser, companyname: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Pays"
                  fullWidth
                  margin="normal"
                  value={editUser.country}
                  onChange={(e) => setEditUser({ ...editUser, country: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <TextField
                  label="Adresse"
                  fullWidth
                  margin="normal"
                  value={editUser.address}
                  onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
                  variant="outlined"
                  sx={{ mb: { xs: 3, sm: 2 } }}
                />
                <FormControl fullWidth margin="normal" sx={{ mb: { xs: 3, sm: 2 } }}>
                  <InputLabel>Rôle</InputLabel>
                  <Select
                    value={editUser.role}
                    onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  >
                    <MenuItem value="farmer">Farmer</MenuItem>
                    <MenuItem value="distributor">Distributor</MenuItem>
                    <MenuItem value="transporter">Transporter</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="superAdmin">SuperAdmin</MenuItem>
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 3 }}>
                  <Switch
                    checked={editUser.isActivated}
                    onChange={(e) => setEditUser({ ...editUser, isActivated: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#4caf50' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#81c784' },
                    }}
                  />
                  <Typography sx={{ ml: 1, color: '#2e7d32' }}>
                    {editUser.isActivated ? 'Actif' : 'Inactif'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#4caf50',
                      '&:hover': { bgcolor: '#388e3c' },
                      flex: 1,
                      py: { xs: 1.5, sm: 1 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                    disabled={actionLoading}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: '#2e7d32',
                      borderColor: '#2e7d32',
                      '&:hover': { borderColor: '#1b5e20' },
                      flex: 1,
                      py: { xs: 1.5, sm: 1 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                    onClick={() => setOpenEditModal(false)}
                    disabled={actionLoading}
                  >
                    Annuler
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            aria-labelledby="delete-dialog-title"
            PaperProps={{
              sx: { maxWidth: { xs: '90%', sm: 400 }, width: '100%' },
            }}
          >
            <DialogTitle id="delete-dialog-title">Confirmer la suppression</DialogTitle>
            <DialogContent>
              <Typography>
                Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenDeleteDialog(false)}
                sx={{
                  color: '#2e7d32',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  py: { xs: 1.5, sm: 1 },
                }}
                disabled={actionLoading}
              >
                Annuler
              </Button>
              <Button
                onClick={handleDeleteUser}
                sx={{
                  bgcolor: '#ef5350',
                  color: 'white',
                  '&:hover': { bgcolor: '#d32f2f' },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  py: { xs: 1.5, sm: 1 },
                }}
                disabled={actionLoading}
              >
                Supprimer
              </Button>
            </DialogActions>
          </Dialog>

          {isMobile ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {users.map((user, index) => (
                <motion.div
                  key={user._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      bgcolor: '#ffffff',
                      border: '1px solid #c8e6c9',
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(46, 125, 50, 0.1)',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s',
                        boxShadow: '0 6px 16px rgba(46, 125, 50, 0.2)',
                      },
                      p: 2,
                    }}
                  >
                    <CardContent sx={{ color: '#2e7d32' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {user.firstname} {user.lastname}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        <strong>ID:</strong> {user._id.slice(0, 8)}...
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        <strong>Email:</strong> {user.email}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        <strong>Rôle:</strong> {user.role}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        <strong>Entreprise:</strong> {user.companyname}
                      </Typography>
                      <Typography sx={{ mb: 1 }}>
                        <strong>Pays:</strong> {user.country}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Tooltip title={isAdmin ? '' : 'Réservé aux administrateurs'}>
                          <span>
                            <Switch
                              checked={user.isActivated}
                              onChange={() => handleActivationToggle(user._id, user.isActivated)}
                              disabled={!isAdmin || actionLoading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#4caf50' },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  bgcolor: '#81c784',
                                },
                              }}
                            />
                          </span>
                        </Tooltip>
                        <Typography sx={{ ml: 1, color: user.isActivated ? '#4caf50' : '#ef5350' }}>
                          {user.isActivated ? 'Actif' : 'Inactif'}
                        </Typography>
                      </Box>
                      <Typography sx={{ mb: 2 }}>
                        <strong>Certification:</strong>{' '}
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
                      {isAdmin && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Modifier l'utilisateur">
                            <IconButton
                              onClick={() => openEditModalWithData(user)}
                              sx={{ color: '#2e7d32' }}
                              disabled={actionLoading}
                              aria-label={`Modifier l'utilisateur ${user.firstname} ${user.lastname}`}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer l'utilisateur">
                            <IconButton
                              onClick={() => openDeleteDialogWithId(user._id)}
                              sx={{ color: '#ef5350' }}
                              disabled={actionLoading}
                              aria-label={`Supprimer l'utilisateur ${user.firstname} ${user.lastname}`}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
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
                boxShadow: '0 4px 12px rgba(46, 125, 50, 0.1)',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#dcedc8' }}>
                    {['Nom', 'Email', 'Rôle', 'Entreprise', 'Pays', 'Statut', 'Action', 'Certification', isAdmin ? 'Actions' : ''].map(
                      (header) => (
                        <TableCell
                          key={header}
                          sx={{ color: '#2e7d32', fontWeight: 600, fontSize: '1rem', py: 2 }}
                        >
                          {header}
                        </TableCell>
                      )
                    )}
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
                      <TableCell sx={{ color: '#2e7d32', py: 1.5 }}>
                        {user.firstname} {user.lastname}
                      </TableCell>
                      <TableCell sx={{ color: '#2e7d32', py: 1.5 }}>{user.email}</TableCell>
                      <TableCell sx={{ color: '#2e7d32', py: 1.5 }}>{user.role}</TableCell>
                      <TableCell sx={{ color: '#2e7d32', py: 1.5 }}>{user.companyname}</TableCell>
                      <TableCell sx={{ color: '#2e7d32', py: 1.5 }}>{user.country}</TableCell>
                      <TableCell sx={{ py: 1.5 }}>
                        <Tooltip title={isAdmin ? '' : 'Réservé aux administrateurs'}>
                          <span>
                            <Switch
                              checked={user.isActivated}
                              onChange={() => handleActivationToggle(user._id, user.isActivated)}
                              disabled={!isAdmin || actionLoading}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#4caf50' },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  bgcolor: '#81c784',
                                },
                              }}
                            />
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell sx={{ color: user.isActivated ? '#4caf50' : '#ef5350', py: 1.5 }}>
                        {user.isActivated ? 'Actif' : 'Inactif'}
                      </TableCell>
                      <TableCell sx={{ py: 1.5 }}>
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
                      {isAdmin && (
                        <TableCell sx={{ py: 1.5 }}>
                          <Tooltip title="Modifier l'utilisateur">
                            <IconButton
                              onClick={() => openEditModalWithData(user)}
                              sx={{ color: '#2e7d32' }}
                              disabled={actionLoading}
                              aria-label={`Modifier l'utilisateur ${user.firstname} ${user.lastname}`}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer l'utilisateur">
                            <IconButton
                              onClick={() => openDeleteDialogWithId(user._id)}
                              sx={{ color: '#ef5350' }}
                              disabled={actionLoading}
                              aria-label={`Supprimer l'utilisateur ${user.firstname} ${user.lastname}`}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
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