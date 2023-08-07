// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ShowList from './Components/ShowsList';
import ShowSummary from './Components/ShowSummary';

const App = () => {
  return (
    <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<ShowList />} /> {/* Use "element" instead of "component" */}
        <Route path="/show/:id" element={<ShowSummary />} /> {/* Use "element" instead of "component" */}
    </Routes>

  );
};

export default App;
