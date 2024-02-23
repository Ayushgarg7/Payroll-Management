import React, { useState, useEffect } from "react";
import logo from "../Assets/Logo.png";
import "../StyleSheets/Welcome.css";
import "../StyleSheets/AdminOptions.css";
import "../StyleSheets/Report.css";
import { useFormik } from "formik";
import { base_url } from "../baseUrl";
const Reports = (props) => {
  const initialValues = {
    transId: "",
    month: "",
    year: "",
    grossPay: "",
    incomeTax: "",
    PF: "",
    inHandsalary: "",
  };
  const formik = useFormik({
    initialValues,
  });
  useEffect(() => {
    getReports();
  }, []);
  const getReports = async () => {
    try {
      const response = await fetch(`${base_url}getReports/${props.location.state.email}`);
      if (!response.ok) {
        // Handle non-2xx status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const res = await response.json();
      // Process the data
      console.log(res);
      // Set formik values
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };
  
  return (
    <>
      <div className="App">
        <header>
          <h1>Payroll Management System</h1>
          <hr className="Underline" />
          <img src={logo} alt="logo"></img>
        </header>
        <div className="report-wrapper">
          <div className="report-wrapper-in">
            <div className="top">
              <div className="pair">
                <div className="emt"> Transaction-id: </div>
                <div className="val">{formik.values.transId}</div>
              </div>
              <div className="pair">
                <div className="emt"> Month: </div>
                <div className="val">{formik.values.month}</div>
              </div>
              <div className="pair">
                <div className="emt"> Year: </div>
                <div className="val">{formik.values.year}</div>
              </div>
            </div>
            <div className="part">Employee Salary Breakdown</div>
            <div className="pair">
              <div className="emt"> Gross Pay: </div>
              <div className="val">{formik.values.grossPay}</div>
            </div>
            <div className="pair">
              <div className="emt"> Income Tax: </div>
              <div className="val">{formik.values.incomeTax}</div>
            </div>

            <div className="pair">
              <div className="emt"> PF: </div>
              <div className="val">{formik.values.PF}</div>
            </div>
            <div className="pair">
              <div className="emt"> In-hand Salary: </div>
              <div className="val">{formik.values.inHandsalary}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
