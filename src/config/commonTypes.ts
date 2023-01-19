export interface IPatients {
  length: any;
  name: string;
  weightKG: number;
  heightCM: number;
  address: string;
  contact: string;
  emergencyContact: string;
  dob: Date;
  id: number;
}

export interface IPatientsEdit {
  name: string;
  weightKG: number;
  heightCM: number;
  address: string;
  contact: string;
  emergencyContact: string;
}

export interface IState {
  patients: {
    patients: IPatients[];
  };
  records: {
    records: IMedicalRecords[];
  }
}

export interface IPatientsCreate {
  name: string;
  weightKG: number;
  heightCM: number;
  address: string;
  contact: string;
  emergencyContact: string;
  dob: Date;
}

// export interface CreatePatientAction {
//   type: string;
//   payload: IPatientsCreate;
// }

export interface IFormikHandlers{
  resetForm(): void;
}

export interface IFormikHelpers{
  setValues(): void;
}

export interface IMedicalRecords {
  sampleCollectedDate: Date;
  sugarLevelMmol: number;
  temperatureCelcius: number;
  plateletCountPpm: number;
  hbLevelGdl: number;
  patientId: number;
  patient: null;
  created: Date;
  createdBy: string;
  lastModified: Date;
  lastModifiedBy: string;
  id: number;
}

export interface IMedicalRecordsCreate {
  created: Date;
  createdBy: string;
  lastModified: Date;
  lastModifiedBy: string;
  sampleCollectedDate: Date;
  sugarLevelMmol: number;
  temperatureCelcius: number;
  plateletCountPpm: number;
  hbLevelGdl: number;
  patientId: number;
}

