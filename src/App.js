import React from 'react';
import EmailForm from './ui-components/EmailForm.jsx';
import OTPForm from './ui-components/OTPForm.jsx';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
   <>
   <Routes>
    <Route path="/" element={<EmailForm/>}/>
    <Route path="/OTPForm" element={<OTPForm/>}/>
   </Routes>
   </>
  );
}

export default App;

