import { createSlice } from "@reduxjs/toolkit";
import initialBase from '../utils/employees.json' 

const initialState = {
    list: initialBase,
}

export const employeesSlice = createSlice({
    name: 'Employees',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.list = action.payload;
        },
        updateEmployee: (state, action) => {
            const updatedEmployee = action.payload;
            const index = state.list.findIndex(employee => employee.id === updatedEmployee.id);
            if (index !== -1) {
                state.list[index] = { ...state.list[index], ...updatedEmployee };
            }
        },
    },
})

export const { setEmployees, updateEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;