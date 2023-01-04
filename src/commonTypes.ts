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
