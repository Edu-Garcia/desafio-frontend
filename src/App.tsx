import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToggleMenuProvider } from './contexts/ToggleMenuContext';
import AppRoutes from './routes';

const App: React.FunctionComponent = () => (
  <Router>
    <ToggleMenuProvider>
      <AppRoutes />
    </ToggleMenuProvider>
  </Router>
);

export default App;
