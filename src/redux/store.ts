import { patientReducer } from "./slices/patientSlice";
import { configureStore } from "@reduxjs/toolkit";
import { medicalRecordsReducer } from "./slices/medicalRecordsSlice";

export const store = configureStore({
  reducer: {
    patients: patientReducer,
    records: medicalRecordsReducer
  },
});
