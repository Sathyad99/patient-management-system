import { postPatients } from "../services/patientServices";
import { IPatientsCreate, IFormikHandlers } from "../config/commonTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

export function AddPatient() {
  const createValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, ({ min }) => `Name must be at least ${min} characters long`)
      .required("Name is required"),
    dob: Yup.date().max(new Date()).required("Date of birth is required"),
    weightKG: Yup.number().positive().required("Weight is required"),
    heightCM: Yup.number().positive().required("Height is required"),
    address: Yup.string().required("Address is required"),
    contact: Yup.string()
      .min(
        10,
        ({ min }) => `Contact number should not be less than ${min} digits`
      )
      .max(
        10,
        ({ max }) => `Contact number should not be longer than ${max} digits`
      )
      .required("Contact number is required"),
    emergencyContact: Yup.string()
      .min(
        10,
        ({ min }) => `Contact number should not be less than ${min} digits`
      )
      .max(
        10,
        ({ max }) => `Contact number should not be longer than ${max} digits`
      )
      .required("Contact number is required"),
  });

  const initialValues: IPatientsCreate = {
    name: "",
    dob: new Date(),
    weightKG: 0,
    heightCM: 0,
    address: "",
    contact: "",
    emergencyContact: "",
  };

  const handleSubmit = async (values:IPatientsCreate, form:IFormikHandlers) => {
    postPatients(
      values,
      (successData: any) => {
        toast.success(successData);
        form.resetForm();
      },
      (errorData: any) => toast.error("Unable to create the patient")
    );
  };

  return (
    <div>
      <h2>Add patient</h2>
      <Formik
        validationSchema={createValidationSchema}
        initialValues={initialValues}
        onSubmit={(values, form) => handleSubmit(values, form)}
      >
        {({isSubmitting}) => (
            <Form className="mx-auto">
              <div className="mb-3 ms-3 w-25">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="Name"
                  name="name"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="mb-3 ms-3 w-25">
                <label htmlFor="DOB" className="form-label">
                  Date of birth
                </label>
                <Field
                  type="date"
                  className="form-control"
                  id="DOB"
                  name="dob"
                />
                <ErrorMessage name="dob" component="div" className="text-danger" />
              </div>
              <div className="mb-3 ms-3 w-25">
                <label htmlFor="exampleInputWeight" className="form-label">
                  Weight (kg)
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="Weight"
                  name="weightKG"
                />
                <ErrorMessage name="weightKG" component="div" className="text-danger" />
              </div>
              <div className="mb-3 ms-3 w-25">
                <label htmlFor="exampleInputHeight" className="form-label">
                  Height (cm)
                </label>
                <Field
                  type="number"
                  className="form-control"
                  id="Height"
                  name="heightCM"
                />
                <ErrorMessage name="heightCM" component="div" className="text-danger" />
              </div>
              <div className="mb-3 ms-3 w-25">
                <label htmlFor="exampleInputAddress" className="form-label">
                  Address
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="Address"
                  name="address"
                />
                <ErrorMessage name="address" component="div" className="text-danger" />
              </div>
              <div className="mb-3 ms-3 w-25">
                <label htmlFor="exampleInputContact" className="form-label">
                  Contact number
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="Contact"
                  name="contact"
                />
                <ErrorMessage name="contact" component="div" className="text-danger" />
              </div>
              <div className="mb-3 ms-3 w-25">
                <label htmlFor="exampleInputEmergrncy" className="form-label">
                  Emergency contact number
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="Emergrncy"
                  name="emergencyContact"
                />
                <ErrorMessage name="emergencyContact" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary ms-3" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
        )}
      </Formik>
    </div>
  );
}
