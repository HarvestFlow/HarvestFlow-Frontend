import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../../../layouts/AppLayout/AppLayout';

const UpdateFarmerProfile = () => {
  const [formData, setFormData] = useState({
    productionType: [],
    productionMethod: [],
    certification: null,
    imageUser: null,
  });
  const [initialData, setInitialData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getProfile', {
          withCredentials: true,
          timeout: 5000,
        });

        if (mounted && response.status === 200) {
          const farmerData = response.data;
          setFormData((prev) => ({
            ...prev,
            productionType: farmerData.productionType || [],
            productionMethod: farmerData.productionMethod || [],
          }));
          setInitialData(farmerData);
          setUserId(response.data._id);
          // Set isAuthenticated based on isActivated status
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfileData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleArrayChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData((prev) => ({
      ...prev,
      [name]: selectedValues,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!userId ) {
      setError('Authentication required');
      return;
    }

    const data = new FormData();
    if (formData.productionType?.length) {
      data.append('productionType', JSON.stringify(formData.productionType));
    }
    if (formData.productionMethod?.length) {
      data.append('productionMethod', JSON.stringify(formData.productionMethod));
    }
    if (formData.certification) {
      data.append('certification', formData.certification);
    }
    if (formData.imageUser) {
      data.append('imageUser', formData.imageUser);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/user/update-profile/${userId}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
          timeout: 5000,
        }
      );
      setInitialData(response.data.data);
      console.log('Mise à jour réussie:', response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Une erreur inconnue est survenue';
      setError(errorMessage);
      console.error('Échec de la mise à jour:', {
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #40916c',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px',
          }}
        ></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          maxWidth: '600px',
          margin: '40px auto',
          padding: '20px',
          backgroundColor: '#fee2e2',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: '#dc2626',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Erreur: {error}
        </p>
      </div>
    );
  }

  if (  !userId) {
    return null;
  }

  return (
    <AppLayout>

    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '30px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Section de l'image de profil */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #40916c',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#e0e0e0', // Fond gris si pas d'image
          }}
        >
          {initialData?.imageUser ? (
            <img
              src={`http://localhost:5000/${initialData.imageUser}`}
              alt="User Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#555',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Aucune image
            </div>
          )}
        </div>

        {/* Bouton pour modifier l'image */}
        <label
          htmlFor="imageUserInput"
          style={{
            marginTop: '15px',
            padding: '8px 16px',
            backgroundColor: '#40916c',
            color: 'white',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2d6a4f')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#40916c')}
        >
          Changer l'image
        </label>
        <input
          id="imageUserInput"
          type="file"
          name="imageUser"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          style={{ display: 'none' }} // Caché, déclenché par le label
        />
      </div>

      <h2
        style={{
          textAlign: 'center',
          color: '#2d6a4f',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Mise à jour du profil agriculteur
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '16px', color: '#1e3a8a', fontWeight: '600' }}>
            Type de production :
          </label>
          <select
            name="productionType"
            multiple
            value={formData.productionType}
            onChange={handleArrayChange}
            style={{
              padding: '12px',
              border: '2px solid #74c69d',
              borderRadius: '8px',
              backgroundColor: '#fff',
              fontSize: '14px',
              height: '120px',
            }}
          >
            <option value="Bio">Bio</option>
            <option value="Conventionnel">Conventionnel</option>
            <option value="Raisonné">Raisonné</option>
          </select>
          <p style={{ fontSize: '14px', color: '#555', marginTop: '5px' }}>
            Valeurs actuelles : {initialData?.productionType?.join(', ') || 'Aucune'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '16px', color: '#1e3a8a', fontWeight: '600' }}>
            Méthode de production :
          </label>
          <select
            name="productionMethod"
            multiple
            value={formData.productionType}
            onChange={handleArrayChange}
            style={{
              padding: '12px',
              border: '2px solid #74c69d',
              borderRadius: '8px',
              backgroundColor: '#fff',
              fontSize: '14px',
              height: '120px',
            }}
          >
            <option value="Bio">Bio</option>
            <option value="Conventionnel">Conventionnel</option>
            <option value="Raisonné">Raisonné</option>
          </select>
          <p style={{ fontSize: '14px', color: '#555', marginTop: '5px' }}>
            Valeurs actuelles : {initialData?.productionMethod?.join(', ') || 'Aucune'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '16px', color: '#1e3a8a', fontWeight: '600' }}>
            Certification (PDF ou image) :
          </label>
          <input
            type="file"
            name="certification"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={{
              padding: '10px',
              border: '2px dashed #95a5a6',
              borderRadius: '8px',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          />
          {initialData?.certification && (
            <p style={{ fontSize: '14px', color: '#555', marginTop: '5px' }}>
              Certification actuelle :{' '}
              <a
                href={`http://localhost:5000/${initialData.certification}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#40916c', textDecoration: 'none', fontWeight: '500' }}
              >
                Voir le fichier actuel
              </a>
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '12px 20px',
            backgroundColor: '#40916c',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2d6a4f')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#40916c')}
        >
          Mettre à jour le profil
        </button>
      </form>
    </div>
    </AppLayout>

  );
};

export default UpdateFarmerProfile;