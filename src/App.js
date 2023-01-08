import { useState } from 'react';
import EmiParameters from './components/EmiParameters/EmiParameters';
import EmiPlans from './components/EmiPlans/EmiPlans';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { UserPreferenceContext } from './utils/UserPreferenceContext';
import classes from './App.module.css';

function App() {
  const [emiParams, setEmiParams] = useState({});
  const [showEmiPlans, setShowEmiPlans] = useState(true);
  const [userPreference, setUserPreference] = useState({
    currency: 'USD',
    locale: 'en-US',
  });

  return (
    <UserPreferenceContext.Provider value={userPreference}>
      <Header
        onChangePreference={(eventData) => setUserPreference(eventData)}
      />
      <main className={classes.main_container}>
        <EmiParameters
          onChangeEmiParams={(data) => {
            if (data.isInvalid) {
              setShowEmiPlans(false);
            } else {
              setEmiParams(data.emiParameters);
              setShowEmiPlans(true);
            }
          }}
        />
        {showEmiPlans === true ? (
          <EmiPlans emiParams={emiParams} />
        ) : (
          <div className={classes.error_image_container}>
            <img
              className={classes.error_image}
              src="/error.jpg"
              width="250px"
              alt="Some or all of the input fields are invalid"
            />
          </div>
        )}
      </main>
      <Footer alignBottom={showEmiPlans} />
    </UserPreferenceContext.Provider>
  );
}

export default App;
