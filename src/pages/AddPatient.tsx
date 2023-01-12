import React, { useState, useEffect } from "react";
import { postPatients } from "../services/patientServices";
import { useDispatch } from "react-redux";
import { IPatientsCreate } from "../config/commonTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddPatient() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [weightKG, setWeight] = useState("");
  const [heightCM, setHeight] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [emergencyContact, setEmergency] = useState("");

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: IPatientsCreate = {
      name: name,
      dob: new Date(dob),
      weightKG: +weightKG,
      heightCM: +heightCM,
      address: address,
      contact: contact,
      emergencyContact: emergencyContact,
    };
    console.log("Checking the values array", values);
    postPatients(
      values,
      (successData: any) => {
        toast(successData);
      },
      (errorData: any) => toast("Unable to create the patient")
    );
      setName("");
      setDob("");
      setWeight("");
      setHeight("");
      setAddress("");
      setContact("");
      setEmergency("");
  };

  return (
    <div>
      <h2>Add patient</h2>
      <form className="mx-auto" onSubmit={submitForm}>
        <div className="mb-3 ms-3 w-25">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 ms-3 w-25">
          <label htmlFor="DOB" className="form-label">
            Date of birth
          </label>
          <input
            type="date"
            className="form-control"
            id="DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="mb-3 ms-3 w-25">
          <label htmlFor="exampleInputWeight" className="form-label">
            Weight (kg)
          </label>
          <input
            type="number"
            className="form-control"
            id="Weight"
            value={weightKG}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="mb-3 ms-3 w-25">
          <label htmlFor="exampleInputHeight" className="form-label">
            Height (cm)
          </label>
          <input
            type="number"
            className="form-control"
            id="Height"
            value={heightCM}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="mb-3 ms-3 w-25">
          <label htmlFor="exampleInputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3 ms-3 w-25">
          <label htmlFor="exampleInputContact" className="form-label">
            Contact number
          </label>
          <input
            type="text"
            className="form-control"
            id="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="mb-3 ms-3 w-25">
          <label htmlFor="exampleInputEmergrncy" className="form-label">
            Emergency contact number
          </label>
          <input
            type="text"
            className="form-control"
            id="Emergrncy"
            value={emergencyContact}
            onChange={(e) => setEmergency(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary ms-3">
          Submit
        </button>
      </form>
    </div>
  );
}
