// src/components/WheatPrediction.js
import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const styles = {
    container: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
    form: { display: 'flex', gap: '10px', marginBottom: '20px' },
    input: { padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
    select: { padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
    button: { padding: '8px 16px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    cardContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
    card: { width: '500px', height: '400px', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', backgroundColor: '#fff' },
    cardTitle: { margin: '0 0 10px 0', fontSize: '18px', textAlign: 'center' }
};

const countries = ['Tunisia', 'Brazil', 'United States', 'China', 'India']; // Exemple

const WheatPrediction = () => {
    const [formData, setFormData] = useState({ rainfall: '', pesticides: '', temp: '', country: '' });
    const [chartData, setChartData] = useState(null);
    const [currentYield, setCurrentYield] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/wheat/predict', {
                rainfall: parseFloat(formData.rainfall),
                pesticides: parseFloat(formData.pesticides),
                temp: parseFloat(formData.temp),
                country: formData.country
            });
            const { rainfall, pesticides, temp, current_yield } = response.data;

            setChartData({
                rainfall: {
                    labels: rainfall.ranges,
                    datasets: [
                        { label: 'Précipitations (mm)', data: rainfall.yields, borderColor: 'blue', fill: false, pointRadius: 3 },
                        { label: 'Votre valeur', data: Array(rainfall.ranges.length).fill(current_yield), borderColor: 'red', borderDash: [5, 5], pointRadius: rainfall.ranges.map(val => val === rainfall.user_value ? 5 : 0), pointBackgroundColor: rainfall.ranges.map(val => val === rainfall.user_value ? 'red' : 'transparent') }
                    ]
                },
                pesticides: {
                    labels: pesticides.ranges,
                    datasets: [
                        { label: 'Pesticides (tonnes)', data: pesticides.yields, borderColor: 'green', fill: false, pointRadius: 3 },
                        { label: 'Votre valeur', data: Array(pesticides.ranges.length).fill(current_yield), borderColor: 'red', borderDash: [5, 5], pointRadius: pesticides.ranges.map(val => val === pesticides.user_value ? 5 : 0), pointBackgroundColor: pesticides.ranges.map(val => val === pesticides.user_value ? 'red' : 'transparent') }
                    ]
                },
                temp: {
                    labels: temp.ranges,
                    datasets: [
                        { label: 'Température (°C)', data: temp.yields, borderColor: 'orange', fill: false, pointRadius: 3 },
                        { label: 'Votre valeur', data: Array(temp.ranges.length).fill(current_yield), borderColor: 'red', borderDash: [5, 5], pointRadius: temp.ranges.map(val => val === temp.user_value ? 5 : 0), pointBackgroundColor: temp.ranges.map(val => val === temp.user_value ? 'red' : 'transparent') }
                    ]
                }
            });
            setCurrentYield(current_yield);
        } catch (error) {
            console.error('Erreur:', error);
            alert(error.response?.data?.error || 'Erreur lors de la prédiction');
        }
    };

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: '' } },
            y: { title: { display: true, text: 'Rendement (tonnes/ha)' } }
        },
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
        }
    };

    return (
        <div style={styles.container}>
            <h1>Optimisation du rendement du blé</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="number" name="rainfall" placeholder="Précipitations (mm)" value={formData.rainfall} onChange={handleChange} required style={styles.input} />
                <input type="number" name="pesticides" placeholder="Pesticides (tonnes)" value={formData.pesticides} onChange={handleChange} required style={styles.input} />
                <input type="number" name="temp" placeholder="Température (°C)" value={formData.temp} onChange={handleChange} required style={styles.input} />
                <select name="country" value={formData.country} onChange={handleChange} required style={styles.select}>
                    <option value="">Sélectionner un pays</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                <button type="submit" style={styles.button}>Prédire</button>
            </form>

            {currentYield && <h3>Rendement actuel prévu : {currentYield.toFixed(2)} tonnes/ha</h3>}
            {chartData && (
                <div style={styles.cardContainer}>
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Précipitations</h2>
                        {chartData.rainfall.labels.length > 1 ? (
                            <Line data={chartData.rainfall} options={{ ...chartOptions, scales: { ...chartOptions.scales, x: { title: { display: true, text: 'Précipitations (mm)' } } } }} height={300} />
                        ) : (
                            <p>Données insuffisantes pour tracer une courbe (valeur fixe : {chartData.rainfall.labels[0]} mm)</p>
                        )}
                    </div>
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Pesticides</h2>
                        <Line data={chartData.pesticides} options={{ ...chartOptions, scales: { ...chartOptions.scales, x: { title: { display: true, text: 'Pesticides (tonnes)' } } } }} height={300} />
                    </div>
                    <div style={styles.card}>
                        <h2 style={styles.cardTitle}>Température</h2>
                        <Line data={chartData.temp} options={{ ...chartOptions, scales: { ...chartOptions.scales, x: { title: { display: true, text: 'Température (°C)' } } } }} height={300} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default WheatPrediction;