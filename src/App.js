import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShowList from './Components/ShowsList';
import ShowSummary from './Components/ShowSummary';

const App = () => {
  return (
    <Routes> 
        <Route path="/" element={<ShowList />} /> 
        <Route path="/show/:id" element={<ShowSummary />} /> 
    </Routes>

  );
};

export default App;
