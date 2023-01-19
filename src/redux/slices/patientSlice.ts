import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPatients, IPatientsEdit } from "../../config/commonTypes";

const initialState: {patients: IPatients[]} = {
  patients: [],
};

//create slice
export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    //get patient details
    getPatientsSuccess: (state, action:PayloadAction<IPatients[]>) => {
      return {...state, patients:[...action.payload]}
    },
    updatePatient: (state, action:PayloadAction<IPatients>) => {
      const updatedPatient = action?.payload;
      state.patients = state.patients.map(patient => {
        if(patient.id === updatedPatient.id){
          return updatedPatient;
        }
        return patient;
      })
    }
  },
});

//Generate actions
export const {getPatientsSuccess, updatePatient} = patientSlice.actions;

//Generate reducer
export const patientReducer = patientSlice.reducer;
