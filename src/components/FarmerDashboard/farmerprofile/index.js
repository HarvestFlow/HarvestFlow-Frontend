// frontend/src/components/UpdateFarmerProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateFarmerProfile = () => {
  const [formData, setFormData] = useState({
    productionType: [],
    productionMethod: [],
    certification: null
  });
  const [initialData, setInitialData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getProfile", { 
          withCredentials: true 
        });
        
        if (response.status === 200) {
          console.log('Utilisateur authentifié:', response.data.role);
          console.log('User ID:', response.data._id);
          setIsAuthenticated(true);
          setUserId(response.data._id);
          
          const farmerData = response.data;
          setInitialData(farmerData);
          setFormData({
            productionType: farmerData.productionType || [],
            productionMethod: farmerData.productionMethod || [],
            certification: null
          });
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      certification: e.target.files[0]
    }));
  };

  const handleArrayChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prev => ({
      ...prev,
      [name]: selectedValues
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId || !isAuthenticated) {
      console.log('Utilisateur non authentifié ou ID manquant');
      return;
    }

    const data = new FormData();
    if (formData.productionType.length > 0) {
      data.append('productionType', JSON.stringify(formData.productionType));
    }
    if (formData.productionMethod.length > 0) {
      data.append('productionMethod', JSON.stringify(formData.productionMethod));
    }
    if (formData.certification) {
      data.append('certification', formData.certification);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/user/update-profile/${userId}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );
      console.log('Mise à jour réussie:', response.data);
      setInitialData(response.data.data);
    } catch (error) {
      console.error('Échec de la mise à jour:', error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated || !userId) {
    return null;
  }

  return (
    <div className="profile-container">
      <h2>Mise à jour du profil agriculteur</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Type de production :</label>
          <select
            name="productionType"
            multiple
            value={formData.productionType}
            onChange={handleArrayChange}
            className="multi-select"
          >
            <option value="Bio">Bio</option>
            <option value="Conventionnel">Conventionnel</option>
            <option value="Raisonné">Raisonné</option>
          </select>
          <p className="current-value">
            Valeurs actuelles : {initialData?.productionType?.join(', ') || 'Aucune'}
          </p>
        </div>

        <div className="form-group">
          <label>Méthode de production :</label>
          <select
            name="productionMethod"
            multiple
            value={formData.productionMethod}
            onChange={handleArrayChange}
            className="multi-select"
          >
            <option value="Bio">Bio</option>
            <option value="Conventionnel">Conventionnel</option>
            <option value="Raisonné">Raisonné</option>
          </select>
          <p className="current-value">
            Valeurs actuelles : {initialData?.productionMethod?.join(', ') || 'Aucune'}
          </p>
        </div>

        <div className="form-group">
          <label>Certification (PDF ou image) :</label>
          <input
            type="file"
            name="certification"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="file-input"
          />
          {initialData?.certification && (
            <p className="current-value">
              Certification actuelle :{' '}
              <a href={`http://localhost:5000/${initialData.certification}`} target="_blank" rel="noopener noreferrer">
                Voir le fichier actuel
              </a>
            </p>
          )}
        </div>

        <button type="submit" className="submit-btn">Mettre à jour le profil</button>
      </form>

      <style jsx>{`
        .profile-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 30px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
        }

        h2 {
          text-align: center;
          color: #2d6a4f;
          margin-bottom: 30px;
          font-size: 28px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        label {
          font-size: 16px;
          color: #1e3a8a;
          font-weight: 600;
        }

        .multi-select {
          padding: 12px;
          border: 2px solid #74c69d;
          border-radius: 8px;
          background-color: #fff;
          font-size: 14px;
          height: 120px;
          transition: border-color 0.3s ease;
        }

        .multi-select:focus {
          outline: none;
          border-color: #2d6a4f;
          box-shadow: 0 0 5px rgba(45, 106, 79, 0.3);
        }

        .multi-select option {
          padding: 5px;
        }

        .file-input {
          padding: 10px;
          border: 2px dashed #95a5a6;
          border-radius: 8px;
          background-color: #fff;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .file-input:hover {
          border-color: #2d6a4f;
        }

        .current-value {
          font-size: 14px;
          color: #555;
          margin-top: 5px;
        }

        .current-value a {
          color: #40916c;
          text-decoration: none;
          font-weight: 500;
        }

        .current-value a:hover {
          text-decoration: underline;
          color: #2d6a4f;
        }

        .submit-btn {
          padding: 12px 20px;
          background-color: #40916c;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .submit-btn:hover {
          background-color: #2d6a4f;
          transform: translateY(-2px);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: 'Arial', sans-serif;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #40916c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UpdateFarmerProfile;