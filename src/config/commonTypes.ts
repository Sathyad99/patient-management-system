import { RequiredNumberSchema } from "yup/lib/number";
import { RequiredStringSchema } from "yup/lib/string";
import { AnyObject } from "yup/lib/types";

export interface IPatients {
  name: string;
  weightKG: number;
  heightCM: number;
  address: string;
  contact: string;
  emergencyContact: string;
  dob: Date | string;
  id: number;
}

// export interface IPatientsEditValidation {
//   [key: string]:
//     | RequiredStringSchema<string | undefined, AnyObject>
//     | RequiredNumberSchema<number | undefined, AnyObject>;
//   name: RequiredStringSchema<string | undefined, AnyObject>;
//   weightKG: RequiredNumberSchema<number | undefined, AnyObject>;
//   heightCM: RequiredNumberSchema<number | undefined, AnyObject>;
//   address: RequiredStringSchema<string | undefined, AnyObject>;
//   contact: RequiredStringSchema<string | undefined, AnyObject>;
//   emergencyContact: RequiredStringSchema<string | undefined, AnyObject>;
// }

export interface IPatientsEditValidation {
  [key: string]: string | number;
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
  };
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

export interface IFormikHandlers {
  resetForm(): void;
}

export interface IFormikHelpers {
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
