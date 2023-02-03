import { useEffect, useState } from "react";
import {
  getPatients,
  deletePatients,
  editPatients,
} from "../services/patientServices";
import { useDispatch } from "react-redux";
import {
  getPatientsSuccess,
  updatePatient,
} from "../redux/slices/patientSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IPatients, IPatientsEditValidation } from "../config/commonTypes";
import { IState } from "../config/commonTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { ObjectSchema } from "yup/es";
// import { EditPatientModal } from "../components/EditPatientModal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export function AllPatients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPatientID, setCurrentPatientID] = useState<number>();
  // const [currentPatient, setCurrentPatient] = useState<IPatients>();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

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

  const editValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    weightKG: Yup.number().positive().required("Weight cannot be empty"),
    heightCM: Yup.number().positive().required("Height cannot be empty"),
    address: Yup.string().required("Address cannot be empty"),
    contact: Yup.string()
      .min(
        10,
        ({ min }) => `Contact number should not be less than ${min} digits`
      )
      .max(
        10,
        ({ max }) => `Contact number should not be longer than ${max} digits`
      )
      .required("Contact number cannot be empty"),
    emergencyContact: Yup.string()
      .min(
        10,
        ({ min }) => `Contact number should not be less than ${min} digits`
      )
      .max(
        10,
        ({ max }) => `Contact number should not be longer than ${max} digits`
      )
      .required("Emergency contact number cannot be empty"),
  });

  const currentPatient = patients.find(
    (patient) => patient.id === currentPatientID
  );
  console.log("Yeeaahh it's working", currentPatient);

  const initialValues: IPatients = {
    name: currentPatient?.name ? currentPatient.name : "",
    id: currentPatient?.id ? currentPatient?.id : 0,
    dob: currentPatient?.dob
      ? currentPatient?.dob.toString().substring(0, 10)
      : new Date(),
    weightKG: currentPatient?.weightKG ? currentPatient?.weightKG : 0,
    heightCM: currentPatient?.heightCM ? currentPatient?.heightCM : 0,
    address: currentPatient?.address ? currentPatient?.address : "",
    contact: currentPatient?.contact ? currentPatient?.contact : "",
    emergencyContact: currentPatient?.emergencyContact
      ? currentPatient?.emergencyContact
      : "",
  };

  const handleSubmit = async (
    patientId: number | undefined,
    values: IPatients
  ) => {
    console.log("Checking the new values", values);
    console.log("Checking the patient ID", patientId);

    patientId &&
      editPatients(
        patientId,
        values,
        (successData: any) => {
          toast.success(successData);
          if (successData != null) {
            handleCloseEdit();
          }
        },
        (errorData: any) => {
          toast.error("Unable to create the patient");

          if (errorData != null) {
            handleCloseEdit();
          }
        }
      );
    dispatch(updatePatient(values));
  };

  const handleReset = (setValues: (values: IPatients) => void) => {
    setValues(initialValues);
  };
  const deleteHandler = async (patientId: number | undefined) => {
    console.log("Checking the patient ID", patientId);
    patientId &&
      deletePatients(
        patientId,
        (successData: any) => {
          toast.success(successData);
          if (successData != null) {
            handleCloseDelete();
          }
        },
        (errorData: any) => {
          toast.error(errorData);
          if (errorData != null) {
            handleCloseDelete();
          }
        }
      );
  };

  // const {update, handleUpdate, errors} = useForm();

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
                      handleShowEdit();
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
                    onClick={() => {
                      handleShowDelete();
                      setCurrentPatientID(patient.id);
                    }}
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

      {/* <EditPatientModal
        show={showEdit}
        onHide={handleCloseEdit}
        // onSubmit={handleSubmit}
        currentPatientID={currentPatientID}
        initialValues={initialValues}
        validationSchema={editValidationSchema}
      /> */}

      {/* Modal edit*/}

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Patient details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={editValidationSchema}
            initialValues={initialValues}
            onSubmit={(values, form) => handleSubmit(currentPatientID, values)}
          >
            {({ isSubmitting, setValues }) => (
              <Form>
                <label htmlFor="id" className="form-label">
                  Patient id
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  disabled={true}
                />
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
                <label htmlFor="dob" className="form-label">
                  Date of birth
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="dob"
                  name="dob"
                />
                <label htmlFor="weight" className="form-label">
                  Weight(Kg)
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weightKG"
                />
                <ErrorMessage
                  name="weightKG"
                  component="div"
                  className="text-danger mb-3"
                />
                <label htmlFor="height" className="form-label">
                  Height(cm)
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="height"
                  name="heightCM"
                />
                <ErrorMessage
                  name="heightCM"
                  component="div"
                  className="text-danger mb-3"
                />
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger mb-3"
                />
                <label htmlFor="contact" className="form-label">
                  Contact number
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-danger mb-3"
                />
                <label htmlFor="emergencyContact" className="form-label">
                  Emergency contact number
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="emergencyContact"
                  name="emergencyContact"
                />
                <ErrorMessage
                  name="emergencyContact"
                  component="div"
                  className="text-danger mb-3"
                />
                <Button
                  type="submit"
                  className="mt-2 me-2"
                  disabled={isSubmitting}
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={() => handleReset(setValues)}
                >
                  Reset
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Patient details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <form>
                <label htmlFor="id" className="form-label">
                  Patient id
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  name="id"
                  disabled={true}
                />
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
                <label htmlFor="dob" className="form-label">
                  Date of birth
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dob"
                  name="dob"
                />
                <label htmlFor="weight" className="form-label">
                  Weight(Kg)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weightKG"
                />
                <label htmlFor="height" className="form-label">
                  Height(cm)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="height"
                  name="heightCM"
                />
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                />
                <label htmlFor="contact" className="form-label">
                  Contact number
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                />
                <label htmlFor="emergencyContact" className="form-label">
                  Emergency contact number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emergencyContact"
                  name="emergencyContact"
                />
                <Button
                  type="submit"
                  className="mt-2 me-2"
                  // disabled={isSubmitting}
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  className="mt-2"
                  // onClick={() => handleReset(setValues)}
                >
                  Reset
                </Button>
              </form>
        </Modal.Body>
      </Modal> */}

      {/* Modal delete*/}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Body>
          <div>Are you sure you want to delete the patient?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            className="mt-2 me-2"
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="btn-danger mt-2"
            onClick={() => deleteHandler(currentPatientID)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
