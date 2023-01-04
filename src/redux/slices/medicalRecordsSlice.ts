import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
};

export const medicalRecordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    getRecordsSuccess: (state, action) => {
      state.records = action?.payload;
    },
  },
});

export const {getRecordsSuccess} = medicalRecordsSlice.actions;

export const medicalRecordsReducer = medicalRecordsSlice.reducer;