import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { employeeActions } from '../../store/employee.slice.ts';
import { employeesSlice } from '../../store/employees.slice.ts';
import { RootState } from '../../store/store.ts'; 
import cl from './homePage.module.scss';

export const Home = () => {
    const dispatch = useDispatch()
    const employees = useSelector((state: RootState) => state.employees.list);
    const selectedEmployee = useSelector((state: RootState) => state.employee);
    const [sortedEmployees, setSortedEmployees] = useState(employees);
    const [isChecked, setIsChecked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleFormChange = (employee) => {
        dispatch(employeeActions.setEmployee(employee));
        setIsOpen(true)
    }

    const handleFormClose = () => {
        setIsOpen(false)
    }

    const handleInputChange = (e) => {
        const {name, type, value, checked} = e.target;

        const inputValue = type === 'checkbox' ? checked : value;
        
        dispatch(employeeActions.updateEmployeeField({ field: name, value: inputValue }));

        const updatedEmployee = { ...selectedEmployee, [name]: inputValue };
        dispatch(employeesSlice.actions.updateEmployee(updatedEmployee));
    };

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked)

        const archiveList = [...employees];
        isChecked ? 
            setSortedEmployees(archiveList.filter(employee => employee.isArchive === true)) :
            setSortedEmployees(employees)
    };

    const sortEmployees = (event) => {
        const sortType = event.target.value;
        let employeesList = [...sortedEmployees];
        const sortedList = employeesList.map(obj => {
            const {birthday, ...other} = obj
            const newBirthday = birthday.split('.').reverse().join('-')
            return {birthday: newBirthday, ...other};
        })

        switch (sortType) {
            case 'name-up':
                sortedList.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-down':
                sortedList.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'birthday-up':
                sortedList.sort((a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime());
                break
            case 'birthday-down':
                sortedList.sort((a, b) => new Date(b.birthday).getTime() - new Date(a.birthday).getTime());
                break;
            default: 
                break
        }

        setSortedEmployees(sortedList)
    }

    const filterList = (event) => {
        const filterType = event.target.value;
        if(!filterType) {
            return;
        }
        if (filterType === 'all') {
            setSortedEmployees(employees)
            return
        }
        const filtredList = employees.filter((employee) => employee.role === filterType)
        setSortedEmployees(filtredList)
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isChecked) {
            setSortedEmployees(employees.filter(employee => employee.isArchive === true))
        } else {
            setSortedEmployees(employees)
        }
    }, [employees, isChecked]);

    return (
        <div className={cl.home}>
            <div>
                <select name="" onChange={filterList}>
                    <option value="all">Любая должность</option>
                    <option value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
                <div>
                    <input 
                        type="checkbox" 
                        id="archive-checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="archive-checkbox">В архиве</label>
                </div>
            </div>
            <select name="" onChange={sortEmployees}>
                <option value="name-up">По имени (А&#8594;Я)</option>
                <option value="name-down">По имени (Я&#8592;А)</option>
                <option value="birthday-up">По дате рождения &#8593;</option>
                <option value="birthday-down">По дате рождения &#8595;</option>
            </select>
            <div className={cl.cards}>
                {sortedEmployees.map((employee) => (
                    <div key={employee.id} className={cl.card} onClick={() => handleFormChange(employee)}> 
                        <strong>{employee.name}</strong>
                        <p>{employee.role}</p>
                        <p>{employee.phone}</p>
                    </div>
                ))}
            </div>
            {isOpen ? 
                <div className={cl.form} onClick={handleFormClose}>
                    <div className={cl.form_change} onClick={(e) => e.stopPropagation()}>
                        <input 
                            type="text" 
                            placeholder="Имя сотрудника"
                            name="name"
                            value={selectedEmployee.name}
                            onChange={handleInputChange}
                        />
                        <input 
                            type="text" 
                            placeholder="Телефон"
                            name="phone"
                            value={selectedEmployee.phone}
                            onChange={handleInputChange}
                        />
                        <input 
                            type="text" 
                            placeholder="Дата рождения"
                            name="birthday"
                            value={selectedEmployee.birthday}
                            onChange={handleInputChange}
                        />
                        <select name="role" value={selectedEmployee.role} onChange={handleInputChange}>
                            <option value="cook">Повар</option>
                            <option value="waiter">Официант</option>
                            <option value="driver">Водитель</option>
                        </select>
                        <input 
                            type="checkbox"
                            name="isArchive"
                            id="archive-checkbox"
                            checked={selectedEmployee.isArchive}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="archive-checkbox">В архиве</label>
                    </div>
                </div> 
                : 
                null
            }
        </div>
    );
}