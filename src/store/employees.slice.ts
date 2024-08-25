import { createSlice } from "@reduxjs/toolkit";
import initialBase from '../utils/employees.json'

const initialState = {
    list: initialBase.map(employee => ({
      ...employee,
      isVisible: !employee.isArchive,
      isFiltered: true
    })),
  };

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
        createEmployee: (state, action) => {
            const addedEployee = action.payload;
            state.list.push(addedEployee);
        }
    },
})

export const { setEmployees, updateEmployee, createEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
