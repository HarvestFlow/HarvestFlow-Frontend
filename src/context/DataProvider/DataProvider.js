import React, { createContext, useContext, useState } from 'react';
import dataJson from '../../data/data.json';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext)
}


export default function DataProvider({ children, ...props }) {

  // Destructure data 
  const { navigation, testimonials, faqs, tabs, posts, pricing, Homepages, InnerPage, landingPage } = dataJson;

  const [data, setData] = useState({
    "tabs": tabs,
    "faqs": faqs,
    "posts": posts,
    "pricing": pricing,
    "homepage": Homepages,
    "innerpage": InnerPage,
    "navigation": navigation,
    "testimonials": testimonials,
    "landingpage": landingPage,
  });

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}
