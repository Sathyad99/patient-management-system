import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addMedicalRecords,
  getMedicalRecordsById,
} from "../services/patientServices";
import { useDispatch, useSelector } from "react-redux";
import { getRecordsSuccess, updateMedicalRecords } from "../redux/slices/medicalRecordsSlice";
import {
  IMedicalRecords,
  IMedicalRecordsCreate,
  IState,
} from "../config/commonTypes";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function PatientProfile() {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [sugar, setSugar] = useState("");
  const [platelet, setPlatelet] = useState("");
  const [hemoglobin, setHemogblobin] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { patientId } = useParams();
  const patientIdNumber: number = patientId ? +patientId : 0;

  useEffect(() => {
    patientIdNumber !== 0 &&
      getMedicalRecordsById(
        patientIdNumber,
        (successData: any) => dispatch(getRecordsSuccess(successData)),
        (errorData: any) => console.log(errorData)
      );
  }, []);

  const records: IMedicalRecords[] = useSelector(
    (state: IState) => state.records.records
  );

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Inside the submit in add medical records");

    const values: IMedicalRecordsCreate = {
      created: new Date(date),
      createdBy: "Admin",
      lastModified: new Date(date),
      lastModifiedBy: "Admin",
      sampleCollectedDate: new Date(date),
      sugarLevelMmol: +sugar,
      temperatureCelcius: +temperature,
      plateletCountPpm: +platelet,
      hbLevelGdl: +hemoglobin,
      patientId: patientIdNumber,
    };
    addMedicalRecords(
      values,
      (successData: any) => {
        toast.success(successData);
      },
      (errorData: any) => {
        toast.error("Unable to add the record");
      }
    );
    setDate("");
    setTemperature("");
    setSugar("");
    setPlatelet("");
    setHemogblobin("");
    // dispatch(updateMedicalRecords(values))

    handleClose();
  };

  const resetHandler: any = () => {
    setDate("");
    setTemperature("");
    setSugar("");
    setPlatelet("");
    setHemogblobin("");
  };
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
          onClick={handleShow}
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
            {records?.length &&
              records?.map((record: IMedicalRecords) => (
                <tr key={record.id}>
                  <td>
                    {record.sampleCollectedDate.toString().substring(0, 10)}
                  </td>
                  <td>{record.temperatureCelcius}</td>
                  <td>{record.sugarLevelMmol}</td>
                  <td>{record.plateletCountPpm}</td>
                  <td>{record.hbLevelGdl}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
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
            <Button variant="secondary" onClick={resetHandler}>
              Reset
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
