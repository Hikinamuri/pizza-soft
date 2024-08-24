import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts'; 
import cl from './homePage.module.scss';

export const Home = () => {
    const employees = useSelector((state: RootState) => state.employees.list);
    const [sortedEmployees, setSortedEmployees] = useState(employees);

    const sortEmployees = (event) => {
        const sortType = event.target.value;
        let sortedList = [...sortedEmployees];
        sortedList.map(obj => {
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
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">В архиве</label>
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
                    <div key={employee.id} className={cl.card}> 
                        <strong>{employee.name}</strong>
                        <p>{employee.role}</p>
                        <p>{employee.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}