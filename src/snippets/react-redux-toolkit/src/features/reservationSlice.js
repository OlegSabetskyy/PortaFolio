import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

const reservationSlice = createSlice({
    name: "reservations",
    initialState,
    reducers: {
        addReservation: (state, action) => {
            state.value.push(action.payload);

            // show the current state
            // console.log(current(state).value);
        },
        removeReservation: (state, action) => {
            state.value.splice(action.payload, 1);
        }
    }
});

export default reservationSlice.reducer;
export const { addReservation, removeReservation } = reservationSlice.actions;
