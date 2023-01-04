import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AddPatient } from "./pages/AddPatient";
import { AllPatients } from "./pages/AllPatients";
import { PatientProfile } from "./pages/PatientProfile";
import { Navbar } from "./components/Navbar";
import { Provider } from "react-redux";
import {store} from "./redux/store";
import Login from "./pages/Login";
function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<AddPatient />} />
          <Route path="/allPatients" element={<AllPatients/>} />
          <Route path="/patientProfile/:patientId" element={<PatientProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Provider>
  );
}
export default App;
