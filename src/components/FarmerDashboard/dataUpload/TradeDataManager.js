import { useState, useEffect } from 'react';
import axios from 'axios';

const TradeDataManager = () => {
  const [file, setFile] = useState(null);
  const [tradeData, setTradeData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer le userId depuis l'API de profil
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
          setUserId(response.data._id);
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

  // Charger les données de trade une fois que userId est disponible
  useEffect(() => {
    if (userId) {
      fetchTradeData();
    }
  }, [userId]);

  const fetchTradeData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/trade/${userId}`);
      setTradeData(res.data.data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de trade:', error);
      setTradeData([]);
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Veuillez sélectionner un fichier.');
      return;
    }
    if (!userId) {
      setUploadStatus('Utilisateur non authentifié.');
      return;
    }

    const formData = new FormData();
    formData.append('tradeData', file);
    formData.append('userId', userId);

    try {
      const res = await axios.post('http://localhost:5000/api/trade/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setUploadStatus('Upload réussi !');
      setTradeData(res.data.trade.data);
    } catch (error) {
      setUploadStatus('Échec de l’upload.');
      console.error(error);
    }
  };

  const handleEditChange = (index, field, value) => {
    const newData = [...tradeData];
    newData[index][field] = value;
    setTradeData(newData);
  };

  const saveEdit = async (index) => {
    if (!userId) {
      setUploadStatus('Utilisateur non authentifié.');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/trade/${userId}`, {
        dataIndex: index,
        updatedData: tradeData[index],
      }, {
        withCredentials: true,
      });
      setTradeData(res.data.data);
      setEditIndex(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Gestion des Données Agricoles</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Uploader un fichier CSV</h3>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload} style={{ marginLeft: '10px' }}>Uploader</button>
        <p>{uploadStatus}</p>
      </div>

      <h3>Vos Données</h3>
      {tradeData.length === 0 ? (
        <p>Aucune donnée disponible. Uploadez un CSV.</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px' }}>Crop</th>
              <th style={{ padding: '10px' }}>Price</th>
              <th style={{ padding: '10px' }}>Quantity</th>
              <th style={{ padding: '10px' }}>Date</th>
              <th style={{ padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tradeData.map((entry, index) => (
              <tr key={index}>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        value={entry.crop}
                        onChange={(e) => handleEditChange(index, 'crop', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={entry.price}
                        onChange={(e) => handleEditChange(index, 'price', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={entry.quantity}
                        onChange={(e) => handleEditChange(index, 'quantity', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={new Date(entry.date).toISOString().split('T')[0]}
                        onChange={(e) => handleEditChange(index, 'date', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td>
                      <button onClick={() => saveEdit(index)}>Sauvegarder</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={{ padding: '10px' }}>{entry.crop}</td>
                    <td style={{ padding: '10px' }}>{entry.price}</td>
                    <td style={{ padding: '10px' }}>{entry.quantity}</td>
                    <td style={{ padding: '10px' }}>{new Date(entry.date).toLocaleDateString()}</td>
                    <td style={{ padding: '10px' }}>
                      <button onClick={() => setEditIndex(index)}>Modifier</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TradeDataManager;