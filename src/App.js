import React from 'react';
import EmailForm from './ui-components/EmailForm.jsx';
import OTPForm from './ui-components/OTPForm.jsx';
import { Route, Routes, Router } from 'react-router-dom';


function App() {
  return (
   <>
    <Router>
   <Routes>
    <Route path="/" element={<EmailForm/>}/>
    <Route path="/OTPForm" element={<OTPForm/>}/>
   </Routes>
  </Router>
   </>
  );
}

export default App;

