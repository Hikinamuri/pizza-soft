import React from 'react';
import cl from './AddEmployeeForm.module.scss';

export const AddEmployeeForm = ({ newEmployee, setNewEmployee, onAdd, onClose }) => {
    const handleNewEmployeeChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewEmployee(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className={cl.form} onClick={onClose}>
            <div className={cl.form_change} onClick={(e) => e.stopPropagation()}>
                <input 
                    type="text" 
                    placeholder="Имя сотрудника"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleNewEmployeeChange}
                />
                <input 
                    type="text" 
                    placeholder="Телефон"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleNewEmployeeChange}
                />
                <input 
                    type="text" 
                    placeholder="Дата рождения"
                    name="birthday"
                    value={newEmployee.birthday}
                    onChange={handleNewEmployeeChange}
                />
                <select name="role" value={newEmployee.role} onChange={handleNewEmployeeChange}>
                    <option value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
                <input 
                    type="checkbox"
                    name="isArchive"
                    id="archive-checkbox"
                    checked={newEmployee.isArchive}
                    onChange={handleNewEmployeeChange}
                />
                <label htmlFor="archive-checkbox">В архиве</label>
                <button onClick={onAdd}>Добавить</button>
            </div>
        </div>
    );
};