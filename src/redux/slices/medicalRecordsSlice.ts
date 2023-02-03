import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMedicalRecords } from "../../config/commonTypes";

const initialState:{records:IMedicalRecords[]} = {
  records: [],
};

export const medicalRecordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    getRecordsSuccess: (state, action) => {
      return {...state, records:[...action.payload]}
    },
    updateMedicalRecords: (state, action:PayloadAction<IMedicalRecords>) => {
      const updatedPatient = action?.payload;
      state.records = state.records.map(record => {
        if(record.id === updatedPatient.id){
          return updatedPatient;
        }
        return record;
      })
    }
  },
});

export const {getRecordsSuccess, updateMedicalRecords} = medicalRecordsSlice.actions;

export const medicalRecordsReducer = medicalRecordsSlice.reducer;