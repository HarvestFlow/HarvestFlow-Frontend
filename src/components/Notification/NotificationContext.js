import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import axios from "axios";

const NotificationContext = createContext();

const API_URL = "http://localhost:5000";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "806a508219bb761f07cbef033270c0b0"; // Remplacez par votre clé API

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const socket = io(API_URL, { withCredentials: true });

  useEffect(() => {
    const initializeSocketAndNotifications = async () => {
      try {
        // Récupérer le profil utilisateur
        const profileResponse = await axios.get(`${API_URL}/user/getProfile`, {
          withCredentials: true,
        });
        const fetchedUserId = profileResponse.data._id;
        setUserId(fetchedUserId);
        console.log("✅ User ID récupéré:", fetchedUserId);

        // Rejoindre la salle Socket.IO
        socket.emit("join", fetchedUserId);
        console.log("👤 Socket rejoint pour userId:", fetchedUserId);

        // Écouter les notifications
        socket.on("notification", (notification) => {
          console.log("📩 Notification reçue:", notification);
          setNotifications((prev) => {
            if (prev.some((n) => n._id === notification._id)) return prev;
            return [...prev, notification];
          });
        });

        // Récupérer toutes les parcelles de l'utilisateur
        const parcelleResponse = await axios.get(`${API_URL}/parcelle/parcelle/${fetchedUserId}`, {
          withCredentials: true,
        });
        const parcelles = parcelleResponse.data;
        console.log("🌍 Parcelles récupérées:", parcelles);

        // Pour chaque parcelle, récupérer les données météo et envoyer les notifications
        for (const parcelle of parcelles) {
          for (const shape of parcelle.shapes) {
            const coordinates = shape.geometry.coordinates[0]?.[0]; // [lon, lat]
            if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
              console.warn(`⚠️ Shape ${shape._id} ignoré: coordonnées invalides`, shape.geometry.coordinates);
              continue;
            }
            console.log(`📍 Traitement shape ${shape._id} avec coordonnées:`, coordinates);
            await fetchWeatherAndNotify(fetchedUserId, parcelle._id, shape._id, {
              lon: coordinates[0],
              lat: coordinates[1],
            });
          }
        }
      } catch (error) {
        console.error("❌ Erreur lors de l'initialisation des notifications:", error.response?.data || error.message);
      }
    };

    initializeSocketAndNotifications();

    return () => {
      socket.off("notification");
    };
  }, [socket]);

  const fetchWeatherAndNotify = async (userId, parcelleId, shapeId, coordinates, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🌍 Tentative ${attempt} pour shape ${shapeId} (parcelle ${parcelleId})`);
        console.log(`📍 Coordonnées: lon=${coordinates.lon}, lat=${coordinates.lat}`);

        // Vérifier si les coordonnées sont valides
        if (!coordinates.lat || !coordinates.lon) {
          console.error(`❌ Coordonnées invalides pour shape ${shapeId}`);
          return;
        }

        // Récupérer les données météo actuelles
        console.log(`📡 Requête météo pour shape ${shapeId}`);
        const currentWeatherResponse = await axios.get(
          `${WEATHER_API_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_API_KEY}&units=metric`,
          { withCredentials: false }
        );

        // Récupérer les prévisions météo
        const forecastResponse = await axios.get(
          `${WEATHER_API_URL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_API_KEY}&units=metric`,
          { withCredentials: false }
        );

        // Extraire les informations
        const currentTemperature = {
          min: currentWeatherResponse.data.main.temp_min,
          max: currentWeatherResponse.data.main.temp_max,
        };
        const forecastTemperature = {
          min: Math.min(...forecastResponse.data.list.map((item) => item.main.temp_min)),
          max: Math.max(...forecastResponse.data.list.map((item) => item.main.temp_max)),
        };
        const averageTemperature = (currentTemperature.min + currentTemperature.max) / 2;
        const country = currentWeatherResponse.data.sys.country || "Inconnu";

        console.log(`🌡️ Données météo pour shape ${shapeId}:`, {
          currentTemperature,
          forecastTemperature,
          averageTemperature,
          country,
        });

        // Mettre à jour le shape dans la base de données
        console.log(`📡 Envoi mise à jour pour shape ${shapeId}`);
        const updateResponse = await axios.put(
          `${API_URL}/parcelle/update-shape/${parcelleId}/${shapeId}`,
          {
            averageTemperature,
            country,
          },
          { withCredentials: true }
        );
        console.log(`✅ Mise à jour réussie pour shape ${shapeId}:`, updateResponse.data);

        // Envoyer la notification au backend
        console.log(`📡 Envoi notification pour shape ${shapeId}`);
        const notificationResponse = await axios.post(
          `${API_URL}/api/notifications/daily-temperature`,
          {
            userId,
            shapeId,
            parcelleId,
            currentTemperature,
            forecastTemperature,
            averageTemperature,
            country,
          },
          { withCredentials: true }
        );
        console.log(`✅ Notification envoyée pour shape ${shapeId}:`, notificationResponse.data);

        return; // Sortir si succès
      } catch (error) {
        console.error(`❌ Tentative ${attempt} échouée pour shape ${shapeId}:`, error.response?.data || error.message);
        if (attempt === retries) {
          console.error(`❌ Échec définitif pour shape ${shapeId} après ${retries} tentatives`);
        }
      }
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, userId }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}