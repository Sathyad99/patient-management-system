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
    // updatePatient: (state, action) => {
    //   const updatedPatient = action?.payload;
    //   state.patients = state.patients.map(patient => {
    //     if(patient.id === updatedPatient.id){
    //       return updatedPatient;
    //     }
    //     return patient;
    //   });
    // }
  },
});

//Generate actions
export const {getPatientsSuccess} = patientSlice.actions;

//Generate reducer
export const patientReducer = patientSlice.reducer;
