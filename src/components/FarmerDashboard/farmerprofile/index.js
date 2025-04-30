import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../../../layouts/AppLayout/AppLayout';

const UpdateFarmerProfile = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    companyname: '',
    country: '',
    address: '',
    productionType: [],
    productionMethod: [],
    certification: null,
    imageUser: null,
  });
  const [initialData, setInitialData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/user/getProfile', {
          withCredentials: true,
          timeout: 5000,
        });

        if (mounted && response.status === 200) {
          const farmerData = response.data;
          setFormData({
            firstname: farmerData.firstname || '',
            lastname: farmerData.lastname || '',
            email: farmerData.email || '',
            phone: farmerData.phone || '',
            companyname: farmerData.companyname || '',
            country: farmerData.country || '',
            address: farmerData.address || '',
            productionType: Array.isArray(farmerData.productionType) ? farmerData.productionType : [],
            productionMethod: Array.isArray(farmerData.productionMethod) ? farmerData.productionMethod : [],
            certification: null,
            imageUser: null,
          });
          setInitialData(farmerData);
          setUserId(farmerData._id);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleArrayChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prev) => ({ ...prev, [name]: selectedValues }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!userId) {
      setError('Authentication required');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          data.append(key, JSON.stringify(value));
        } else if (key !== 'certification' && key !== 'imageUser') {
          data.append(key, value);
        }
      }
    });
    if (formData.certification) data.append('certification', formData.certification);
    if (formData.imageUser) data.append('imageUser', formData.imageUser);

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
      setSuccess('Profil mis à jour avec succès');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Une erreur est survenue');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #40916c', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', backgroundColor: '#fee2e2', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ color: '#dc2626', fontSize: '16px', fontWeight: '500' }}>Erreur: {error}</p>
      </div>
    );
  }

  if (!userId) return null;

  return (
    <AppLayout>
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          padding: '40px 20px',
          fontFamily: "'Arial', sans-serif",
          backgroundColor: '#f5f7f5', // Fond vert très clair et subtil
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '30px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            backgroundColor: '#fff',
            border: '1px solid #e0e8e0', // Bordure verte subtile
          }}
        >
          {success && (
            <div
              style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              {success}
            </div>
          )}

          <h2
            style={{
              textAlign: 'center',
              color: '#2e7d32', // Vert agronomique subtil
              marginBottom: '30px',
              fontSize: '28px',
              fontWeight: '700',
              marginTop:'30px'
            }}
          >
            Mise à jour du profil agriculteur
          </h2>

          {/* Section Image de Profil */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #4caf50', // Bordure verte agronomique
                backgroundColor: '#e0e0e0',
              }}
            >
              {initialData?.imageUser ? (
                <img
                  src={`http://localhost:5000/${initialData.imageUser}`}
                  alt="User Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Aucune image
                </div>
              )}
            </div>
            <label
              htmlFor="imageUserInput"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50', // Vert agronomique
                color: 'white',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                marginTop: '15px',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#388e3c')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#4caf50')}
            >
              Changer l'image
            </label>
            <input
              id="imageUserInput"
              type="file"
              name="imageUser"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Champs en Colonnes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
            {/* Colonne 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Prénom :</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px', border: '1px solid #a5d6a7', borderRadius: '5px' }} // Bordure verte subtile
                />
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Nom :</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px', border: '1px solid #a5d6a7', borderRadius: '5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Email :</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px', border: '1px solid #a5d6a7', borderRadius: '5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Téléphone :</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px', border: '1px solid #a5d6a7', borderRadius: '5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Type de production :</label>
                <select
                  name="productionType"
                  multiple
                  value={formData.productionType}
                  onChange={handleArrayChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #a5d6a7',
                    borderRadius: '5px',
                    height: '150px',
                  }}
                >
                  <option value="Bio">Bio</option>
                  <option value="Conventionnel">Conventionnel</option>
                  <option value="Raisonné">Raisonné</option>
                </select>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  Actuel : {initialData?.productionType?.join(', ') || 'Aucun'}
                </p>
              </div>
            </div>

            {/* Colonne 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Nom de l'entreprise :</label>
                <input
                  type="text"
                  name="companyname"
                  value={formData.companyname}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px', border: '1px solid #a5d6a7', borderRadius: '5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Pays :</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px', border: '1px solid #a5d6a7', borderRadius: '5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Adresse :</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px', border: '1px solid #a5d6a7', borderRadius: '5px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Méthode de production :</label>
                <select
                  name="productionMethod"
                  multiple
                  value={formData.productionMethod}
                  onChange={handleArrayChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #a5d6a7',
                    borderRadius: '5px',
                    height: '150px',
                  }}
                >
                  <option value="Bio">Bio</option>
                  <option value="Conventionnel">Conventionnel</option>
                  <option value="Raisonné">Raisonné</option>
                </select>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  Actuel : {initialData?.productionMethod?.join(', ') || 'Aucun'}
                </p>
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>Certification :</label>
                <input
                  type="file"
                  name="certification"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px dashed #a5d6a7',
                    borderRadius: '5px',
                  }}
                />
                {initialData?.certification && (
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                    Actuelle :{' '}
                    <a
                      href={`http://localhost:5000/${initialData.certification}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#4caf50', textDecoration: 'underline' }}
                    >
                      Voir le fichier
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#4caf50', // Vert agronomique
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '30px',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#388e3c')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#4caf50')}
          >
            Mettre à jour le profil
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default UpdateFarmerProfile;