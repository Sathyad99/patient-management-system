import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    editPatients,
  } from "../services/patientServices";
import { IPatients } from "../config/commonTypes";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatePatient } from "../redux/slices/patientSlice";

export function EditPatientModal(show: boolean, onHide: () => void, currentPatientID:number | undefined, initialValues: IPatients, validationSchema: object) {
    const dispatch = useDispatch();

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
                onHide();
              }
            },
            (errorData: any) => {
              toast.error("Unable to create the patient");
    
              if (errorData != null) {
                onHide();
              }
            }
          );
        dispatch(updatePatient(values));
      };

    const handleReset = (setValues: (values: IPatients) => void) => {
        setValues(initialValues);
      };
    return(
        <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Patient details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
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
    )
}