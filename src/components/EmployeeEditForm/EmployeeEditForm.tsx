import React from 'react';
import cl from './EmployeeEditForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts'; 
import { employeeActions } from '../../store/employee.slice.ts';
import { employeesSlice } from '../../store/employees.slice.ts';

export const EmployeeEditForm = ({ employee, onClose }) => {
    const dispatch = useDispatch()
    const selectedEmployee = useSelector((state: RootState) => state.employee);
    
    const handleInputChange = (e) => {
        const {name, type, value, checked} = e.target;

        const inputValue = type === 'checkbox' ? checked : value;

        dispatch(employeeActions.updateEmployeeField({ field: name, value: inputValue }));

        const updatedEmployee = { ...selectedEmployee, [name]: inputValue };
        dispatch(employeesSlice.actions.updateEmployee(updatedEmployee));
    };

    return (
        <div className={cl.form} onClick={onClose}>
            <div className={cl.form_change} onClick={(e) => e.stopPropagation()}>
                <input 
                    type="text" 
                    placeholder="Имя сотрудника"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    placeholder="Телефон"
                    name="phone"
                    value={employee.phone}
                    onChange={handleInputChange}
                />
                <input 
                    type="text" 
                    placeholder="Дата рождения"
                    name="birthday"
                    value={employee.birthday}
                    onChange={handleInputChange}
                />
                <select name="role" value={employee.role} onChange={handleInputChange}>
                    <option value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
                <input 
                    type="checkbox"
                    name="isArchive"
                    id="archive-checkbox"
                    checked={employee.isArchive}
                    onChange={handleInputChange}
                />
                <label htmlFor="archive-checkbox">В архиве</label>
            </div>
        </div>
    );
};
