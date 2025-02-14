import { createSlice } from "@reduxjs/toolkit";

export const attiviesSlice = createSlice({
    name: 'attivies',
    initialState: {
        value: []
    },
    reducers: {
        addAttivity: (state, action) => {
            state.value.push(action.payload);
        },
        eliminateAttivity: (state, action) => {
            const array = state.value.filter((attivity) => attivity.id != action.payload);
            state.value = array;
        }
    }
})

export const { addAttivity, eliminateAttivity } = attiviesSlice.actions;
export const attiviesReducer = attiviesSlice.reducer;