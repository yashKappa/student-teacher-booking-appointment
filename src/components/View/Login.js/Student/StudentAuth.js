// src/components/StudentAuth.js
import React, { useState } from 'react';
import Student from './Student';
import Register from './Register';

const StudentAuth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? (
        <Register switchToLogin={() => setIsRegister(false)} />
      ) : (
        <Student switchToRegister={() => setIsRegister(true)} />
      )}
    </>
  );
};

export default StudentAuth;
