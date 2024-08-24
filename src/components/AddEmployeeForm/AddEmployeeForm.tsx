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
                <div className={cl.checkboxContainer}>
                    <input 
                        type="checkbox"
                        name="isArchive"
                        id="add_archive"
                        checked={newEmployee.isArchive}
                        onChange={handleNewEmployeeChange}
                    />
                    <label htmlFor="add_archive">В архиве</label>
                </div>
                <button onClick={onAdd}>Добавить</button>
            </div>
        </div>
    );
};