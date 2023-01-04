import { createSlice} from "@reduxjs/toolkit";

//initial state
const initialState = {
  patients: [],
};

//create slice
export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    //get patient details
    getPatientsSuccess: (state, action) => {
      state.patients = action?.payload;
    },
    createPatient:(state, action) => {
      state.patients = action?.payload;
      // return [...state, action?.payload];
    }
  },
});

//Generate actions
export const {getPatientsSuccess, createPatient} = patientSlice.actions;

//Generate reducer
export const patientReducer = patientSlice.reducer;
