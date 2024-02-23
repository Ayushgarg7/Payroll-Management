import React, { useState, useEffect } from "react";
import logo from "../Assets/Logo.png";
import "../StyleSheets/Welcome.css";
import "../StyleSheets/AdminOptions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import AddEmployee from "./AddEmployee.js";
import { useHistory } from "react-router-dom";
import { base_url } from "../baseUrl";

const AdminUpdateInfo = () => {
  const [emp, setEmp] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    try {
      const response = await fetch(`${base_url}getAllEmployees`);
      const data = await response.json();

      if (response.ok) {
        setEmp(data.data);
      } else {
        console.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (emp) => {
    history.push("/updateProfile", { email: emp.email });
  };

  const handleDelete = async (emp) => {
    try {
      const response = await fetch(`${base_url}deleteEmployee`, {
        method: "POST",
        body: JSON.stringify({ email: emp.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        getAllEmployees(); // Refresh the list after deletion
      } else {
        console.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Payroll Management System</h1>
        <hr className="Underline" />
        <img src={logo} alt="logo"></img>
      </header>
      <div class="w3-container">
        <table class="w3-table w3-bordered">
          {emp.map((Emp) => (
            <tr key={Emp.e_id}>
              <td>{Emp.name}</td>
              <td>
                <button onClick={() => handleUpdate(Emp)}>Edit</button>
              </td>
              <td>
                <button
                  style={{ backgroundColor: "#f43d3d" }}
                  onClick={() => handleDelete(Emp)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <div id="id01" className={`w3-modal ${isModalOpen ? "w3-show" : ""}`}>
          <div className="w3-modal-content">
            <div className="w3-container">
              <span
                className="w3-button w3-display-topright"
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
              </span>
              <AddEmployee></AddEmployee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateInfo;
