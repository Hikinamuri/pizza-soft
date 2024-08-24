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
                <p>
                    {employee.role === 'cook' && 'Повар'}
                    {employee.role === 'waiter' && 'Официант'}
                    {employee.role === 'driver' && 'Водитель'}
                </p>
                <p>{employee.phone}</p>
            </div>
        ))}
    </div>
);