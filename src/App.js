import { useState, useEffect, createContext } from 'react';

import EmiParameters from './components/EmiParameters/EmiParameters';
import EmiPlans from './components/EmiPlans/EmiPlans';
import Header from './components/Header/Header';
import { UserPreferenceContext } from './utils/UserPreferenceContext';

function App() {
  const [emiParams, setEmiParams] = useState({});
  const [userPreference, setUserPreference] = useState({
    currency: 'USD',
    locale: 'en-US',
  });

  return (
    <div>
      <Header
        onChangePreference={(eventData) => setUserPreference(eventData)}
      />
      <UserPreferenceContext.Provider value={userPreference}>
        <EmiParameters
          onChangeEmiParams={(params) => {
            setEmiParams(params);
          }}
        />
        <EmiPlans emiParams={emiParams} />
      </UserPreferenceContext.Provider>
    </div>
  );
}

export default App;
