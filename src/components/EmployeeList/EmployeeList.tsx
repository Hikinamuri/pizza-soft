import React from 'react';
import cl from './EmployeeList.module.scss';

export const EmployeeList = ({ employees, onEmployeeClick }) => (
    <div className={cl.cards}>
        {employees.map(employee => (
            <div 
                key={employee.id} 
                className={cl.card} 
                onClick={() => onEmployeeClick(employee)}
            > 
                <strong>{employee.name}</strong>
                <p>{employee.role}</p>
                <p>{employee.phone}</p>
            </div>
        ))}
    </div>
);