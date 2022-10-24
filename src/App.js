import { useState } from 'react';

import EmiParameters from './components/EmiParameters/EmiParameters';
import EmiPlans from './components/EmiPlans/EmiPlans';

function App() {
  const [emiParams, setEmiParams] = useState({});

  return (
    <div>
      <EmiParameters
        onChangeEmiParams={(params) => {
          setEmiParams(params);
        }}
      />
      <EmiPlans emiParams={emiParams} />
    </div>
  );
}

export default App;
