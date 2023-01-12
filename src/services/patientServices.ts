import api from "../config/api";
import {
  IMedicalRecordsCreate,
  IPatients,
  IPatientsCreate,
  IPatientsEdit
} from "../config/commonTypes";

export const getPatients = (
  success: (d: any) => void,
  failed: (d: any) => void
) => {
  api.get("patients").then(
    (response) => {
      success(response);
    },
    (error) => {
      failed(error);
    }
  );
};

export const postPatients = (
  values: IPatientsCreate,
  success: (d: any) => void,
  failed: (d: any) => void
) => {
  api.post("patients", values).then(
    (response) => {
      success(response);
    },
    (error) => {
      failed(error);
    }
  );
};

export const getMedicalRecordsById = (
  patientId: number,
  success: (d: any) => void,
  failed: (d: any) => void
) => {
  api.get("MedicalRecords/GetMedicalRecordByPatientId?pid=" + patientId).then(
    (response) => {
      success(response);
    },
    (error) => {
      failed(error);
    }
  );
};

export const addMedicalRecords = (
  values: IMedicalRecordsCreate,
  success: (d: any) => void,
  failed: (d: any) => void
) => {
  api.post("MedicalRecords", values).then(
    (response) => {
      success(response);
    },
    (error) => {
      failed(error);
    }
  );
};

export const deletePatients = (
  patientId: number,
  success: (d: any) => void,
  failed: (d: any) => void
) => {
  api.delete("patients/" + patientId).then(
    (response) => {
      success(response);
    },
    (error) => {
      failed(error);
    }
  );
};

export const editPatients = (
  patientId: number,
  values: IPatientsEdit,
  success: (d: any) => void,
  failed: (d: any) => void
) => {
  console.log("Inside the edit patients!!!!!!!");
  
  api.put("patients/" + patientId, values).then(
    (response) => {
      success(response);
    },
    (error) => {
      failed(error);
    }
  )
}