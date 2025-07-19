import React from 'react';
import './form-container.css'; // Import your CSS file

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="form-container">
      <div className="form-row">
        <div className="form-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
