import React from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts'; 
import cl from './homePage.module.scss';

export const Home = () => {
    const employees = useSelector((state: RootState) => state.employees.list);

    return (
        <div className={cl.cards}>
            {employees.map((employee) => (
                <div key={employee.id} className={cl.card}> 
                    <strong>{employee.name}</strong> - {employee.role}
                </div>
            ))}
        </div>
    );
}