import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employee.slice.ts";
import employeesSlice from "./employees.slice.ts";

export const store = configureStore({
    reducer: {
        employees: employeesSlice,
        employee: employeeSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;