import React, { FC } from 'react';

import './App.css';

const App: FC = () => (
  <div className="container">
    <header>
      <h1>ビーズカウンター</h1>
    </header>
    <CounterWidget initialCount={0} />
  </div>
);

export default App;
