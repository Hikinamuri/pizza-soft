import { createSlice } from "@reduxjs/toolkit";
import initialBase from '../utils/employees.json' 

const initialState = {
    list: initialBase,
    filteredList: initialBase,
}

export const employeesSlice = createSlice({
    name: 'Employees',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.list = action.payload;
            state.filteredList = action.payload;
        },
        filterEmployees(state, action) {
            const filter = action.payload;
            state.filteredList = state.list.filter(employee =>
                console.log(filter, employee)
            );
        },
    },
})

export const { setEmployees, filterEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;