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

        // Récupérer toutes les parcelles de l'utilisateur avec userId dans l'URL
        const parcelleResponse = await axios.get(`${API_URL}/parcelle/parcelle/${fetchedUserId}`, {
          withCredentials: true,
        });
        const parcelles = parcelleResponse.data;
        console.log("🌍 Parcelles récupérées:", parcelles);

        // Pour chaque parcelle, récupérer les données météo et envoyer les notifications
        for (const parcelle of parcelles) {
          for (const shape of parcelle.shapes) {
            const coordinates = shape.geometry.coordinates[0][0]; // [lon, lat]
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

  const fetchWeatherAndNotify = async (userId, parcelleId, shapeId, coordinates) => {
    try {
      const currentWeatherResponse = await axios.get(
        `${WEATHER_API_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_API_KEY}&units=metric`,
        { withCredentials: false }
      );
      const forecastResponse = await axios.get(
        `${WEATHER_API_URL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_API_KEY}&units=metric`,
        { withCredentials: false }
      );

      const currentTemperature = {
        min: currentWeatherResponse.data.main.temp_min,
        max: currentWeatherResponse.data.main.temp_max,
      };
      const forecastTemperature = {
        min: Math.min(...forecastResponse.data.list.map((item) => item.main.temp_min)),
        max: Math.max(...forecastResponse.data.list.map((item) => item.main.temp_max)),
      };

      console.log(`🌡️ Températures pour shape ${shapeId}:`, { currentTemperature, forecastTemperature });

      // Envoyer la notification au backend
      const notificationResponse = await axios.post(
        `${API_URL}/api/notifications/daily-temperature`,
        {
          userId,
          shapeId,
          parcelleId,
          currentTemperature,
          forecastTemperature,
        },
        { withCredentials: true }
      );
      console.log("✅ Notification envoyée:", notificationResponse.data);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données météo ou envoi de notification:", error.response?.data || error.message);
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