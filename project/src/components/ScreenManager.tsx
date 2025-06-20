import React, { useContext } from 'react';
import { CheckFitContext } from '../context/CheckFitContext';
import LandingScreen from './screens/LandingScreen';
import QuizScreen from './screens/QuizScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import ResultScreen from './screens/ResultScreen';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

const ScreenManager: React.FC = () => {
  const { currentScreen, isAdmin, showLogin } = useContext(CheckFitContext);

  if (showLogin && !isAdmin) {
    return <AdminLogin />;
  }

  if (isAdmin) {
    return <AdminDashboard />;
  }

  switch (currentScreen) {
    case 'landing':
      return <LandingScreen />;
    case 'quiz':
      return <QuizScreen />;
    case 'processing':
      return <ProcessingScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <LandingScreen />;
  }
};

export default ScreenManager;