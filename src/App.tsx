import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComingSoon from './ComingSoon';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
