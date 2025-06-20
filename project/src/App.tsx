import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckFitApp from './components/CheckFitApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<CheckFitApp />} />
      </Routes>
    </Router>
  );
}

export default App;