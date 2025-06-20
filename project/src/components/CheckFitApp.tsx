import React from 'react';
import { CheckFitProvider } from '../context/CheckFitContext';
import ScreenManager from './ScreenManager';

const CheckFitApp: React.FC = () => {
  return (
    <CheckFitProvider>
      <ScreenManager />
    </CheckFitProvider>
  );
};

export default CheckFitApp;