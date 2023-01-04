import api from "../api";
import { IPatients, IPatientsCreate } from "../commonTypes";

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

export const getMedicalRecords = (
  success: (d: any) => void,
  failed: (d: any) => void
) => {
  api.get("MedicalRecords").then(
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
