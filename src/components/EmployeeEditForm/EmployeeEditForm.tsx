import React from 'react';
import cl from './EmployeeEditForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts'; 
import { employeeActions } from '../../store/employee.slice.ts';
import { employeesSlice } from '../../store/employees.slice.ts';
import InputMask from 'react-input-mask';

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
                <h3>Изменить параметры сотрудника</h3>
                <input 
                    type="text" 
                    placeholder="Имя сотрудника"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                />
                <InputMask
                    mask="+7 (999) 999-99-99"
                    value={employee.phone}
                    onChange={handleInputChange}
                >
                    {() => <input
                        type="text"
                        placeholder="Телефон"
                        name="phone"
                    />}
                </InputMask>
                <InputMask
                    mask="9999-99-99"
                    value={employee.birthday}
                    onChange={handleInputChange}
                >
                    {() => <input
                        type="text"
                        placeholder="Дата рождения (дд-мм-гггг)"
                        name="birthday"
                    />}
                </InputMask>
                <select name="role" value={employee.role} onChange={handleInputChange}>
                    <option value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
                <div className={cl.checkboxContainer}>
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
        </div>
    );
};
