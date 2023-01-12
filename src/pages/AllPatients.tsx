import { useEffect, useState } from "react";
import {
  getPatients,
  deletePatients,
  editPatients,
} from "../services/patientServices";
import { useDispatch } from "react-redux";
import { getPatientsSuccess } from "../redux/slices/patientSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IPatients, IPatientsEdit } from "../config/commonTypes";
import { IState } from "../config/commonTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function AllPatients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPatientID, setCurrentPatientID] = useState<number>();
  const [weightKG, setWeight] = useState("");
  const [heightCM, setHeight] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [emergencyContact, setEmergency] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const patients: IPatients[] = useSelector(
    (state: IState) => state.patients.patients
  );
  console.log("Patients from the state", patients);

  useEffect(() => {
    getPatients(
      (successData: any) => dispatch(getPatientsSuccess(successData)),
      (errorData: any) => console.log(errorData)
    );
  }, []);

  const submitHandler = async (patientId: number | undefined) => {
    const values: IPatientsEdit = {
      name: "",
      weightKG: +weightKG,
      heightCM: +heightCM,
      address: address,
      contact: contact,
      emergencyContact: emergencyContact,
    };
    console.log("Checking the new values array", values);
    console.log("Checking the patient ID", patientId);

    patientId &&
      editPatients(
        patientId,
        values,
        (successData: any) => {
          toast(successData);
        },
        (errorData: any) => toast("Unable to create the patient")
      );
  };

  const deleteHandler = async (patientId: number | undefined) => {
    console.log("Checking the patient ID", patientId);
    patientId &&
      deletePatients(
        patientId,
        (successData: any) => toast(successData),
        (errorData: any) => toast(errorData)
      );
  };

  return (
    <div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">DOB</th>
            <th scope="col">Weight(kg)</th>
            <th scope="col">Height(cm)</th>
            <th scope="col">Address</th>
            <th scope="col">Contact number</th>
            <th scope="col">Emergency Contact</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {patients?.length &&
            patients?.map((patient: IPatients) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.dob.toString().substring(0, 10)}</td>
                <td>{patient.weightKG}</td>
                <td>{patient.heightCM}</td>
                <td>{patient.address}</td>
                <td>{patient.contact}</td>
                <td>{patient.emergencyContact}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      navigate(`/patientProfile/${patient.id}`);
                    }}
                  >
                    Records
                  </button>
                </td>
                <td>
                  {/* Edit button */}
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      console.log("What's the wrooonnnngggg");
                      handleShow();
                      setCurrentPatientID(patient.id);
                      
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                </td>
                <td>
                  {/* Delete button */}
                  <button
                    onClick={() => setCurrentPatientID(patient.id)}
                    type="button"
                    className="btn btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#deletemodal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Patient details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler(currentPatientID);
            }}
          >
            <span className="input-group-text">Weight(kg)</span>
            <input
              type="text"
              className="form-control"
              value={weightKG}
              onChange={(e) => setWeight(e.target.value)}
            />
            <span className="input-group-text">Height(cm)</span>
            <input
              type="text"
              className="form-control"
              value={heightCM}
              onChange={(e) => setHeight(e.target.value)}
            />
            <span className="input-group-text">Address</span>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <span className="input-group-text">Contact number</span>
            <input
              type="text"
              className="form-control"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <span className="input-group-text">Emergency contact number</span>
            <input
              type="text"
              className="form-control"
              value={emergencyContact}
              onChange={(e) => setEmergency(e.target.value)}
            />
            <button type="submit">Save Changes</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal delete*/}
      <div
        className="modal fade"
        id="deletemodal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modeal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the patient?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteHandler(currentPatientID)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
