import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        addCustomer: (state, action) => {
            state.value.push({
                id: crypto.randomUUID(),
                name: action.payload,
                food: []
            });
        },
        addFoodToCustomer: (state, action) => {
            state.value
                .find((customer) => customer.id == action.payload.customerId)
                .food.push(action.payload.food);
        }
    }
});

export default customerSlice.reducer;
export const { addCustomer, addFoodToCustomer } = customerSlice.actions;
