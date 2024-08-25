import { createSlice } from "@reduxjs/toolkit";

export interface EmployeeState {
    id: number,
    name: string,
    isArchive: boolean,
    isVisible: boolean,
    role: string,
    phone: string,
    birthday: string,
}

const initialState: EmployeeState = {
    id: 0,
    name: 'string',
    isArchive: true,
    isVisible: true,
    role: 'string',
    phone: 'string',
    birthday: 'string',
}

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setEmployee(state, action) {
            return { ...state, ...action.payload };
        },
        updateEmployeeField(state, action) {
            const { field, value } = action.payload;
            (state as any)[field] = value;
        },
        clearEmployee(state) {
            return initialState;
        },
    }
})

export default employeeSlice.reducer;
export const employeeActions = employeeSlice.actions;
