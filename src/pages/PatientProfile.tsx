import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMedicalRecords } from "../services/patientServices";
import { useDispatch, useSelector } from "react-redux";
import { getRecordsSuccess } from "../redux/slices/medicalRecordsSlice";
import { IMedicalRecords, IState } from "../commonTypes";

export function PatientProfile() {
  const dispatch = useDispatch();

  let { patientId } = useParams();
  const patientIdNumber: number = patientId ? +patientId : 0;
  console.log("Checking the type", typeof patientId);

  useEffect(() => {
    getMedicalRecords(
      (successData: any) => dispatch(getRecordsSuccess(successData)),
      (errorData: any) => console.log(errorData)
    );
  }, []);

  const records: IMedicalRecords[] = useSelector(
    (state: IState) => state.records.records
  );
  console.log("Records from the state", records);
  const selectedPatient = records.filter((record, patientIdNumber) => {
    record.patientId === patientIdNumber;
  });
  console.log("Selected patient", selectedPatient);
  

  return (
    <div>
      <h1>Patient profile</h1>
      <div className="w-50 d-flex mt-3">
        <div>
          <h4 className="ms-1">Medical records</h4>
        </div>

        <button
          type="button"
          className="btn btn-primary ms-4"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
        >
          Add new record
        </button>
      </div>
      <div className="ms-3 mt-3 me-3">
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">Collected date</th>
              <th scope="col">Temperature(Celcius)</th>
              <th scope="col">Sugar level(mmol/L)</th>
              <th scope="col">Platelet count(ppm)</th>
              <th scope="col">Hemoglobin level(gdl)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>12-12-2022</td>
              <td>36</td>
              <td>120</td>
              <td>500000</td>
              <td>11</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Modal prescription*/}
      <div
        className="modal fade"
        id="exampleModal2"
        // tabIndex=-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modeal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New medical record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span className="input-group-text">Date</span>
              <input type="text" className="form-control" />
              <span className="input-group-text">Temperature(Celcius)</span>
              <input type="text" className="form-control" />
              <span className="input-group-text">Sugar level(mmol/L)</span>
              <input type="text" className="form-control" />
              <span className="input-group-text">Platelet count(ppm)</span>
              <input type="text" className="form-control" />
              <span className="input-group-text">Hemoglobin level(gdl)</span>
              <input type="text" className="form-control" />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
