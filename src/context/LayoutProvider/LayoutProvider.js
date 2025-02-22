import React, { useState, createContext, useContext } from 'react';


const layoutConfig = {
  headerActive: false,
  headerTransition: false,
  headerVariant: 'dark',
  headerCollapse: 'lg',
  headerFixed: false,
  breaks: {
    mb: 420, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1540, any: Infinity
  }
}

// create context
const LayoutContext = createContext();
const LayoutUpdateContext = createContext();


export function useLayout() {
  return useContext(LayoutContext);
}

export function useLayoutUpdate() {
  return useContext(LayoutUpdateContext);
}

export default function LayoutProvider({ children }) {

  const [layout, setLayout] = useState(layoutConfig);

  const updateLayout = {
    headerMobile: function () {
      const newLayout = {
        ...layout,
        headerActive: !layout.headerActive,
        headerFixed: !layout.headerFixed
      }
      setLayout(newLayout);
    }
  }

  const body = document.querySelector('body');

  // update to event listener
  const observer = new ResizeObserver(entries => {

    let width = entries[0].contentRect.width;
    // eslint-disable-next-line
    let headerBreak = eval(`layout.breaks.${layout.headerCollapse}`);

    if (width > headerBreak && (layout.headerActive === true || layout.headerTransition === true)) {

      const newLayout = { ...layout, headerTransition: false, headerActive: false }
      setLayout(newLayout);
    };
  });

  observer.observe(body);

  return (
    <LayoutContext.Provider value={layout}>
      <LayoutUpdateContext.Provider value={updateLayout}>
        {children}
      </LayoutUpdateContext.Provider>
    </LayoutContext.Provider>
  )
}

