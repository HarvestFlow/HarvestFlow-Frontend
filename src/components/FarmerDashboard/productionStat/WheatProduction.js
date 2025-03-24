import React, { useState, useEffect } from 'react';

function WheatProduction() {
  const [wheatData, setWheatData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWheatData = async () => {
      try {
        const response = await fetch(
          'https://faostatservices.fao.org/api/v1/en/data/QC?item=15&element=5312&show_codes=true&show_unit=true&output_type=objects&page_number=1&page_size=100'
        );
        const data = await response.json();
        console.log('Réponse brute :', data);
        setWheatData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchWheatData();
  }, []);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div>
      <h1>Production de blé globale (FAOSTAT)</h1>
      {wheatData && wheatData.data.length > 0 ? (
        <ul>
          {wheatData.data.map((entry, index) => (
            <li key={index}>
              {entry.Area}: {entry.Value} {entry.Unit} (année: {entry.Year})
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>Aucune donnée disponible via cet endpoint.</p>
          <pre>{JSON.stringify(wheatData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default WheatProduction;