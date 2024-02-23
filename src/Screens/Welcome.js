import React from "react";
import logo from "../Assets/Logo.png";
import { useHistory } from "react-router-dom";

const Welcome = () => {
  const history = useHistory();

  const handleAdminLogin = () => {
    history.push('/adminLogin');
  };

  const handleEmployeeLogin = () => {
    history.push('/employeeLogin');
  };

  return (
    <div className="App">
      <header>
        <h1>Payroll Management System</h1>
        <hr className="Underline" />
        <img src={logo} alt="logo" />
      </header>
      <div className="Login">
        <button className="Login-button" onClick={handleAdminLogin}>
          Admin Login
        </button>
        <button className="Login-button" onClick={handleEmployeeLogin}>
          Employee Login
        </button>
      </div>
      <div className="Film"></div>
    </div>
  );
};

export default Welcome;
