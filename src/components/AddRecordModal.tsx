import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IMedicalRecordsCreate } from "../config/commonTypes";
import { addMedicalRecords } from "../services/patientServices";

export function AddRecordModal(props: any) {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [sugar, setSugar] = useState("");
  const [platelet, setPlatelet] = useState("");
  const [hemoglobin, setHemogblobin] = useState("");

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Hurrayyy!! We are inside the submit");

    const values: IMedicalRecordsCreate = {
      sampleCollectedDate: new Date(date),
      sugarLevelMmol: +sugar,
      temperatureCelcius: +temperature,
      plateletCountPpm: +platelet,
      hbLevelGdl: +hemoglobin,
    };
    addMedicalRecords(
      values,
      (successData: any) => {
        toast(successData);
      },
      (errorData: any) => {
        toast("Unable to add the record");
      }
    );
  };
  return (
    <Modal show={props.showModal} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>New medical record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitForm}>
          <span className="input-group-text">Date</span>
          <input
            type="date"
            className="form-control"
            id="Name"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <span className="input-group-text">Temperature(Celcius)</span>
          <input
            type="number"
            className="form-control"
            id="Name"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <span className="input-group-text">Sugar level(mmol/L)</span>
          <input
            type="number"
            className="form-control"
            id="Name"
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
          />
          <span className="input-group-text">Platelet count(ppm)</span>
          <input
            type="number"
            className="form-control"
            id="Name"
            value={platelet}
            onChange={(e) => setPlatelet(e.target.value)}
          />
          <span className="input-group-text">Hemoglobin level(gdl)</span>
          <input
            type="number"
            className="form-control"
            id="Name"
            value={hemoglobin}
            onChange={(e) => setHemogblobin(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
