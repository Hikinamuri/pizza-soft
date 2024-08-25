import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { employeeActions } from '../../store/employee.slice.ts';
import { employeesSlice } from '../../store/employees.slice.ts';
import { RootState } from '../../store/store.ts';
import { FiltersAndSort } from '../../components/FiltersAndSort/FiltersAndSort.tsx';
import { EmployeeList } from '../../components/EmployeeList/EmployeeList.tsx';
import { EmployeeEditForm } from '../../components/EmployeeEditForm/EmployeeEditForm.tsx';
import { AddEmployeeForm } from '../../components/AddEmployeeForm/AddEmployeeForm.tsx';

import cl from './homePage.module.scss';

export const Home = () => {
    const dispatch = useDispatch()
    const employees = useSelector((state: RootState) => state.employees.list);
    const selectedEmployee = useSelector((state: RootState) => state.employee);
    const [isChecked, setIsChecked] = useState(false);
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isOpenAddForm, setIsOpenAddForm] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        phone: '',
        birthday: '',
        role: 'cook',
        isArchive: false,
        isVisible: true,
        isFiltered: true
    });

    const handleFormChange = (employee) => {
        dispatch(employeeActions.setEmployee(employee));
        setIsOpenForm(true)
    }

    const handleFormClose = () => { setIsOpenForm(false) }

    const handleAddForm = () => { setIsOpenAddForm(!isOpenAddForm) }

    const handleAddEmployee = () => {
        if (!newEmployee.name || !newEmployee.phone || !newEmployee.birthday) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        const employeeWithId = { ...newEmployee, id: Date.now() };

        setNewEmployee({
            name: '',
            phone: '',
            birthday: '',
            role: 'cook',
            isArchive: false,
            isVisible: true,
            isFiltered: true
        });

        dispatch(employeesSlice.actions.createEmployee(employeeWithId));

        handleAddForm();
    };

    useEffect(() => {
        if (isOpenForm || isOpenAddForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpenForm, isOpenAddForm]);


    return (
        <div className={cl.home}>
            <FiltersAndSort
                employees={employees}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
            />
            <EmployeeList
                employees={employees}
                onEmployeeClick={handleFormChange}
            />
            <div onClick={handleAddForm} className={cl.add_button}>
                <p>Добавить сотрудника</p>
            </div>
            {isOpenForm && (
                <EmployeeEditForm
                    employee={selectedEmployee}
                    onClose={handleFormClose}
                />
            )}
            {isOpenAddForm && (
                <AddEmployeeForm
                    newEmployee={newEmployee}
                    setNewEmployee={setNewEmployee}
                    onAdd={handleAddEmployee}
                    onClose={handleAddForm}
                />
            )}
        </div>
    );
}
