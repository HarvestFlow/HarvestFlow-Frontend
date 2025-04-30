import React, { createContext, useContext, useState } from "react";

const TradeDataContext = createContext();

export const TradeDataProvider = ({ children }) => {
  const [tradeData, setTradeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedCountry, setSelectedCountry] = useState('Tunisia');
  const [selectedPartners, setSelectedPartners] = useState(['United States of America']);
  const [selectedElement, setSelectedElement] = useState('5610');
  const [yearRange, setYearRange] = useState({ start: '1991', end: '2024' });
  const [lastRequestUrl, setLastRequestUrl] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const value = {
    tradeData, setTradeData,
    loading, setLoading,
    error, setError,
    snackbar, setSnackbar,
    selectedCountry, setSelectedCountry,
    selectedPartners, setSelectedPartners,
    selectedElement, setSelectedElement,
    yearRange, setYearRange,
    lastRequestUrl, setLastRequestUrl,
    aiAnalysis, setAiAnalysis,
    aiLoading, setAiLoading,
    aiError, setAiError,
  };

  return (
    <TradeDataContext.Provider value={value}>
      {children}
    </TradeDataContext.Provider>
  );
};

export const useTradeData = () => useContext(TradeDataContext);