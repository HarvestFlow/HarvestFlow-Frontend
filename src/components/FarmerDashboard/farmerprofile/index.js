import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppLayout from '../../../layouts/AppLayout/AppLayout';

const UpdateUserProfile = () => {
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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
          const userData = response.data;
          setFormData({
            firstname: userData.firstname || '',
            lastname: userData.lastname || '',
            email: userData.email || '',
            phone: userData.phone || '',
            companyname: userData.companyname || '',
            country: userData.country || '',
            address: userData.address || '',
     
            certification: null,
            imageUser: null,
          });
          setInitialData(userData);
          setUserId(userData._id);
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

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = 'L’email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'L’email est invalide';
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone)) errors.phone = 'Numéro de téléphone invalide';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
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

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitting(false);
      return;
    }

    if (!userId) {
      setError('Authentification requise');
      setSubmitting(false);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else if (key !== 'certification' && key !== 'imageUser') {
        data.append(key, value || '');
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
      const updatedUser = response.data.data;
      setInitialData(updatedUser);
      setFormData((prev) => ({
        ...prev,
        firstname: updatedUser.firstname || '',
        lastname: updatedUser.lastname || '',
        email: updatedUser.email || '',
        phone: updatedUser.phone || '',
        companyname: updatedUser.companyname || '',
        country: updatedUser.country || '',
        address: updatedUser.address || '',
        productionType: Array.isArray(updatedUser.productionType) ? updatedUser.productionType : [],
        productionMethod: Array.isArray(updatedUser.productionMethod) ? updatedUser.productionMethod : [],
        certification: null,
        imageUser: null,
      }));
      setSuccess('Profil mis à jour avec succès');
      setShowConfirmPopup(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Une erreur est survenue');
      setShowConfirmPopup(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    setShowConfirmPopup(true);
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
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
          backgroundColor: '#f5f7f5',
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
            border: '1px solid #e0e8e0',
          }}
        >
          {/* Success Popup */}
          {success && (
            <div
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '1000',
              }}
            >
              <div
                style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  maxWidth: '400px',
                  width: '90%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '20px' }}>{success}</p>
                <button
                  onClick={() => setSuccess(null)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#388e3c')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#4caf50')}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Confirmation Popup */}
          {showConfirmPopup && (
            <div
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '1000',
              }}
            >
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  maxWidth: '400px',
                  width: '90%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '20px', color: '#333' }}>
                  Confirmez-vous la mise à jour de votre profil ?
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: submitting ? '#6b7280' : '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#388e3c')}
                    onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#4caf50')}
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#b91c1c')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc2626')}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          )}

          <h2
            style={{
              textAlign: 'center',
              color: '#2e7d32',
              marginBottom: '30px',
              fontSize: '28px',
              fontWeight: '700',
              marginTop: '30px',
            }}
          >
            Mise à jour du profil
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
                border: '4px solid #4caf50',
                backgroundColor: '#e0e0e0',
              }}
            >
              {initialData?.imageUser ? (
                <img
                  src={`http://localhost:5000/${initialData.imageUser}`}
                  alt="Photo de profil"
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
                backgroundColor: '#4caf50',
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              alignItems: 'start',
            }}
          >
            {/* Colonne 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Prénom :
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${formErrors.firstname ? '#dc2626' : '#a5d6a7'}`,
                    borderRadius: '5px',
                  }}
                />
                {formErrors.firstname && (
                  <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '5px' }}>{formErrors.firstname}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Nom :
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${formErrors.lastname ? '#dc2626' : '#a5d6a7'}`,
                    borderRadius: '5px',
                  }}
                />
                {formErrors.lastname && (
                  <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '5px' }}>{formErrors.lastname}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Email : <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${formErrors.email ? '#dc2626' : '#a5d6a7'}`,
                    borderRadius: '5px',
                  }}
                />
                {formErrors.email && (
                  <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '5px' }}>{formErrors.email}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Téléphone :
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${formErrors.phone ? '#dc2626' : '#a5d6a7'}`,
                    borderRadius: '5px',
                  }}
                />
                {formErrors.phone && (
                  <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '5px' }}>{formErrors.phone}</p>
                )}
              </div>
            </div>

            {/* Colonne 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Nom de l'entreprise :
                </label>
                <input
                  type="text"
                  name="companyname"
                  value={formData.companyname}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${formErrors.companyname ? '#dc2626' : '#a5d6a7'}`,
                    borderRadius: '5px',
                  }}
                />
                {formErrors.companyname && (
                  <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '5px' }}>{formErrors.companyname}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'Block' }}>
                  Pays :
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${formErrors.country ? '#dc2626' : '#a5d6a7'}`,
                    borderRadius: '5px',
                  }}
                />
                {formErrors.country && (
                  <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '5px' }}>{formErrors.country}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Adresse :
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${formErrors.address ? '#dc2626' : '#a5d6a7'}`,
                    borderRadius: '5px',
                  }}
                />
                {formErrors.address && (
                  <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '5px' }}>{formErrors.address}</p>
                )}
              </div>

              

              

              <div>
                <label style={{ fontSize: '16px', color: '#333', fontWeight: '600', marginBottom: '5px', display: 'block' }}>
                  Certification :
                </label>
                <input
                  type="file"
                  name="certification"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px dashed ${formErrors.certification ? '#dc2626' : '#a5d6a7'}`,
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
                {formErrors.certification && (
                  <p style={{ color: '#dc2626', fontSize: '14px', marginTop: '5px' }}>{formErrors.certification}</p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleConfirmClick}
            disabled={submitting}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: submitting ? '#6b7280' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '30px',
            }}
            onMouseEnter={(e) => !submitting && (e.target.style.backgroundColor = '#388e3c')}
            onMouseLeave={(e) => !submitting && (e.target.style.backgroundColor = '#4caf50')}
          >
            {submitting ? 'Mise à jour...' : 'Mettre à jour le profil'}
          </button>
        </div>
      </div>

      {/* Inline CSS for Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            div[style*="gridTemplateColumns"] {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </AppLayout>
  );
};

export default UpdateUserProfile;